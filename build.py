#!/usr/bin/env python3
"""
Treinen WebAssembly Build & Release Compiler
=============================================
Assembleert de WebAssembly instructies naar een valide binary 'treinen.wasm'
voor de Nederlandse spoorwegsimulatie en beheert versie-detectie.
"""

import os
import sys
import json
import struct
import argparse
import subprocess
from datetime import datetime, timezone

APP_NAME = "Treinen"
DEFAULT_VERSION = "1.0.0"

def leb_u(n: int) -> bytes:
    """Encodeert een unsigned integer naar LEB128."""
    out = bytearray()
    while True:
        b = n & 0x7f
        n >>= 7
        if n:
            out.append(b | 0x80)
        else:
            out.append(b)
            break
    return bytes(out)

def leb_s(n: int) -> bytes:
    """Encodeert een signed integer naar LEB128."""
    out = bytearray()
    while True:
        b = n & 0x7f
        n >>= 7
        sign = (b & 0x40) != 0
        if (n == 0 and not sign) or (n == -1 and sign):
            out.append(b)
            break
        out.append(b | 0x80)
    return bytes(out)

def f32_bytes(val: float) -> bytes:
    return struct.pack("<f", float(val))

# WebAssembly type constants
I32 = 0x7F
I64 = 0x7E
F32 = 0x7D
F64 = 0x7C
EMPTY_BLOCK = 0x40

# WebAssembly opcodes
OP_UNREACHABLE = 0x00
OP_NOP = 0x01
OP_BLOCK = 0x02
OP_LOOP = 0x03
OP_IF = 0x04
OP_ELSE = 0x05
OP_END = 0x0B
OP_BR = 0x0C
OP_BR_IF = 0x0D
OP_RETURN = 0x0F
OP_DROP = 0x1A
OP_SELECT = 0x1B
OP_LOCAL_GET = 0x20
OP_LOCAL_SET = 0x21
OP_LOCAL_TEE = 0x22
OP_I32_LOAD = 0x28
OP_F32_LOAD = 0x2A
OP_I32_STORE = 0x36
OP_F32_STORE = 0x38
OP_I32_CONST = 0x41
OP_F32_CONST = 0x43
OP_I32_EQZ = 0x45
OP_I32_EQ = 0x46
OP_I32_NE = 0x47
OP_I32_LT_S = 0x48
OP_I32_GT_S = 0x4A
OP_I32_GE_S = 0x4E
OP_F32_EQ = 0x5B
OP_F32_NE = 0x5C
OP_F32_LT = 0x5D
OP_F32_GT = 0x5E
OP_F32_LE = 0x5F
OP_F32_GE = 0x60
OP_I32_ADD = 0x6A
OP_I32_SUB = 0x6B
OP_I32_MUL = 0x6C
OP_I32_DIV_S = 0x6D
OP_I32_REM_S = 0x6F
OP_I32_AND = 0x71
OP_I32_OR = 0x72
OP_I32_XOR = 0x73
OP_I32_SHL = 0x74
OP_F32_ADD = 0x92
OP_F32_SUB = 0x93
OP_F32_MUL = 0x94
OP_F32_DIV = 0x95
OP_F32_CONVERT_I32_S = 0xB2
OP_I32_TRUNC_F32_S = 0xA8

def i32_const(val: int) -> bytes:
    return bytes([OP_I32_CONST]) + leb_s(val)

def f32_const(val: float) -> bytes:
    return bytes([OP_F32_CONST]) + f32_bytes(val)

def local_get(idx: int) -> bytes:
    return bytes([OP_LOCAL_GET]) + leb_u(idx)

def local_set(idx: int) -> bytes:
    return bytes([OP_LOCAL_SET]) + leb_u(idx)

def i32_load(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_I32_LOAD]) + leb_u(align) + leb_u(offset)

def f32_load(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_F32_LOAD]) + leb_u(align) + leb_u(offset)

def i32_store(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_I32_STORE]) + leb_u(align) + leb_u(offset)

def f32_store(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_F32_STORE]) + leb_u(align) + leb_u(offset)

# Memory layout offsets
MEM_SIM_TIME = 0x0000        # f32
MEM_TRAIN_COUNT = 0x0004     # i32
MEM_STATION_COUNT = 0x0008   # i32
MEM_TRACK_COUNT = 0x000C     # i32
MEM_SIGNAL_COUNT = 0x0010    # i32
MEM_SWITCH_COUNT = 0x0014    # i32
MEM_NEXT_TRAIN_ID = 0x0018   # i32

MEM_STATIONS = 0x0100
MEM_SWITCHES = 0x0300
MEM_SIGNALS  = 0x0400
MEM_TRACKS   = 0x0600
MEM_TRAINS   = 0x1000

class WasmBuilder:
    def __init__(self):
        self.types = []
        self.functions = []
        self.exports = []
        self.codes = []

    def get_or_add_type(self, params, results):
        for idx, (p, r) in enumerate(self.types):
            if p == params and r == results:
                return idx
        idx = len(self.types)
        self.types.append((params, results))
        return idx

    def add_function(self, name, params, results, locals_list, body_bytes):
        type_idx = self.get_or_add_type(params, results)
        func_idx = len(self.functions)
        self.functions.append(type_idx)
        self.exports.append((name, 0x00, func_idx))

        encoded_locals = bytearray()
        encoded_locals += leb_u(len(locals_list))
        for count, ltype in locals_list:
            encoded_locals += leb_u(count) + bytes([ltype])

        full_body = bytes(encoded_locals) + body_bytes + bytes([OP_END])
        self.codes.append(leb_u(len(full_body)) + full_body)
        return func_idx

    def build(self) -> bytes:
        wasm = bytearray(b"\x00asm\x01\x00\x00\x00")

        # 1. Type section
        type_sec = bytearray()
        type_sec += leb_u(len(self.types))
        for params, results in self.types:
            type_sec.append(0x60)
            type_sec += leb_u(len(params))
            for p in params:
                type_sec.append(p)
            type_sec += leb_u(len(results))
            for r in results:
                type_sec.append(r)
        wasm += bytes([1]) + leb_u(len(type_sec)) + type_sec

        # 3. Function section
        func_sec = bytearray()
        func_sec += leb_u(len(self.functions))
        for t_idx in self.functions:
            func_sec += leb_u(t_idx)
        wasm += bytes([3]) + leb_u(len(func_sec)) + func_sec

        # 5. Memory section
        mem_sec = bytearray()
        mem_sec += leb_u(1)
        mem_sec.append(0x01)
        mem_sec += leb_u(1)
        mem_sec += leb_u(2)
        wasm += bytes([5]) + leb_u(len(mem_sec)) + mem_sec

        # 7. Export section
        exp_sec = bytearray()
        exp_sec += leb_u(len(self.exports) + 1)
        mem_name = b"memory"
        exp_sec += leb_u(len(mem_name)) + mem_name + bytes([0x02, 0x00])
        for name, kind, idx in self.exports:
            bname = name.encode("utf-8")
            exp_sec += leb_u(len(bname)) + bname + bytes([kind]) + leb_u(idx)
        wasm += bytes([7]) + leb_u(len(exp_sec)) + exp_sec

        # 10. Code section
        code_sec = bytearray()
        code_sec += leb_u(len(self.codes))
        for code in self.codes:
            code_sec += code
        wasm += bytes([10]) + leb_u(len(code_sec)) + code_sec

        return bytes(wasm)


def generate_treinen_wasm() -> bytes:
    builder = WasmBuilder()

    # 1. init_simulation() -> ()
    init_body = bytearray()
    init_body += i32_const(MEM_SIM_TIME) + f32_const(0.0) + f32_store()
    init_body += i32_const(MEM_TRAIN_COUNT) + i32_const(4) + i32_store()
    init_body += i32_const(MEM_STATION_COUNT) + i32_const(8) + i32_store()
    init_body += i32_const(MEM_TRACK_COUNT) + i32_const(18) + i32_store()
    init_body += i32_const(MEM_SIGNAL_COUNT) + i32_const(18) + i32_store()
    init_body += i32_const(MEM_SWITCH_COUNT) + i32_const(4) + i32_store()
    init_body += i32_const(MEM_NEXT_TRAIN_ID) + i32_const(105) + i32_store()

    # Trein 0: VIRM Intercity
    t0 = MEM_TRAINS + 0 * 64
    init_body += i32_const(t0 + 0) + i32_const(101) + i32_store()
    init_body += i32_const(t0 + 4) + i32_const(0) + i32_store()
    init_body += i32_const(t0 + 8) + i32_const(0) + i32_store()
    init_body += i32_const(t0 + 12) + f32_const(0.15) + f32_store()
    init_body += i32_const(t0 + 16) + f32_const(130.0) + f32_store()
    init_body += i32_const(t0 + 20) + f32_const(140.0) + f32_store()
    init_body += i32_const(t0 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t0 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t0 + 32) + i32_const(312) + i32_store()
    init_body += i32_const(t0 + 36) + i32_const(0) + i32_store()
    init_body += i32_const(t0 + 40) + i32_const(0) + i32_store()
    init_body += i32_const(t0 + 44) + i32_const(1) + i32_store()

    # Trein 1: Sprinter SLT
    t1 = MEM_TRAINS + 1 * 64
    init_body += i32_const(t1 + 0) + i32_const(102) + i32_store()
    init_body += i32_const(t1 + 4) + i32_const(1) + i32_store()
    init_body += i32_const(t1 + 8) + i32_const(2) + i32_store()
    init_body += i32_const(t1 + 12) + f32_const(0.45) + f32_store()
    init_body += i32_const(t1 + 16) + f32_const(110.0) + f32_store()
    init_body += i32_const(t1 + 20) + f32_const(120.0) + f32_store()
    init_body += i32_const(t1 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t1 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t1 + 32) + i32_const(145) + i32_store()
    init_body += i32_const(t1 + 36) + i32_const(60) + i32_store()
    init_body += i32_const(t1 + 40) + i32_const(0) + i32_store()
    init_body += i32_const(t1 + 44) + i32_const(3) + i32_store()

    # Trein 2: Eurostar
    t2 = MEM_TRAINS + 2 * 64
    init_body += i32_const(t2 + 0) + i32_const(103) + i32_store()
    init_body += i32_const(t2 + 4) + i32_const(3) + i32_store()
    init_body += i32_const(t2 + 8) + i32_const(10) + i32_store()
    init_body += i32_const(t2 + 12) + f32_const(0.60) + f32_store()
    init_body += i32_const(t2 + 16) + f32_const(150.0) + f32_store()
    init_body += i32_const(t2 + 20) + f32_const(160.0) + f32_store()
    init_body += i32_const(t2 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t2 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t2 + 32) + i32_const(280) + i32_store()
    init_body += i32_const(t2 + 36) + i32_const(0) + i32_store()
    init_body += i32_const(t2 + 40) + i32_const(1) + i32_store()
    init_body += i32_const(t2 + 44) + i32_const(4) + i32_store()

    # Trein 3: Cargo Traxx
    t3 = MEM_TRAINS + 3 * 64
    init_body += i32_const(t3 + 0) + i32_const(104) + i32_store()
    init_body += i32_const(t3 + 4) + i32_const(2) + i32_store()
    init_body += i32_const(t3 + 8) + i32_const(16) + i32_store()
    init_body += i32_const(t3 + 12) + f32_const(0.30) + f32_store()
    init_body += i32_const(t3 + 16) + f32_const(90.0) + f32_store()
    init_body += i32_const(t3 + 20) + f32_const(95.0) + f32_store()
    init_body += i32_const(t3 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t3 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t3 + 32) + i32_const(0) + i32_store()
    init_body += i32_const(t3 + 36) + i32_const(0) + i32_store()
    init_body += i32_const(t3 + 40) + i32_const(6) + i32_store()
    init_body += i32_const(t3 + 44) + i32_const(7) + i32_store()

    for s_idx in range(18):
        s_addr = MEM_SIGNALS + s_idx * 16
        init_body += i32_const(s_addr) + i32_const(2) + i32_store()

    for sw_idx in range(4):
        sw_addr = MEM_SWITCHES + sw_idx * 16
        init_body += i32_const(sw_addr) + i32_const(0) + i32_store()

    builder.add_function("init_simulation", [], [], [], bytes(init_body))

    # 2. step_simulation(dt: f32) -> ()
    step_body = bytearray()
    step_body += i32_const(MEM_SIM_TIME)
    step_body += i32_const(MEM_SIM_TIME) + f32_load()
    step_body += local_get(0) + bytes([OP_F32_ADD])
    step_body += f32_store()

    step_body += i32_const(MEM_TRAIN_COUNT) + i32_load() + local_set(2)
    step_body += i32_const(0) + local_set(1)

    step_body += bytes([OP_BLOCK, EMPTY_BLOCK])
    step_body += bytes([OP_LOOP, EMPTY_BLOCK])
    step_body += local_get(1) + local_get(2) + bytes([OP_I32_GE_S, OP_BR_IF, 1])

    step_body += i32_const(MEM_TRAINS) + local_get(1) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(3)
    step_body += local_get(3) + i32_load(offset=24) + local_set(7)

    # Noodrem
    step_body += local_get(7) + i32_const(3) + bytes([OP_I32_EQ])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + f32_load(offset=16) + f32_const(90.0) + local_get(0) + bytes([OP_F32_MUL, OP_F32_SUB]) + local_set(4)
    step_body += local_get(4) + f32_const(0.0) + bytes([OP_F32_LT])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += f32_const(0.0) + local_set(4)
    step_body += bytes([OP_END])
    step_body += local_get(3) + local_get(4) + f32_store(offset=16)
    step_body += bytes([OP_ELSE])

    # Op station
    step_body += local_get(7) + i32_const(1) + bytes([OP_I32_EQ])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + f32_load(offset=28) + local_get(0) + bytes([OP_F32_SUB]) + local_set(6)
    step_body += local_get(6) + f32_const(0.0) + bytes([OP_F32_LE])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + i32_const(0) + i32_store(offset=24)
    step_body += local_get(3) + f32_const(0.0) + f32_store(offset=12)
    step_body += local_get(3) + f32_const(25.0) + f32_store(offset=16)
    step_body += local_get(3) + local_get(3) + i32_load(offset=8) + i32_const(1) + bytes([OP_I32_XOR]) + i32_store(offset=8)
    step_body += local_get(3) + i32_load(offset=40) + local_set(8)
    step_body += local_get(3) + i32_load(offset=44) + local_set(9)
    step_body += local_get(3) + local_get(9) + i32_store(offset=40)
    step_body += local_get(3) + local_get(8) + i32_store(offset=44)
    step_body += bytes([OP_ELSE])
    step_body += local_get(3) + local_get(6) + f32_store(offset=28)
    step_body += bytes([OP_END])

    step_body += bytes([OP_ELSE])
    # Rijdend
    step_body += local_get(3) + f32_load(offset=16) + f32_const(18.0) + local_get(0) + bytes([OP_F32_MUL, OP_F32_ADD]) + local_set(4)
    step_body += local_get(4) + local_get(3) + f32_load(offset=20) + bytes([OP_F32_GT])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + f32_load(offset=20) + local_set(4)
    step_body += bytes([OP_END])
    step_body += local_get(3) + local_get(4) + f32_store(offset=16)

    step_body += local_get(3) + f32_load(offset=12) + local_get(4) + f32_const(140.0) + bytes([OP_F32_DIV]) + f32_const(0.045) + bytes([OP_F32_MUL]) + local_get(0) + bytes([OP_F32_MUL, OP_F32_ADD]) + local_set(5)

    step_body += local_get(5) + f32_const(1.0) + bytes([OP_F32_GE])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + i32_const(1) + i32_store(offset=24)
    step_body += local_get(3) + f32_const(0.0) + f32_store(offset=16)
    step_body += local_get(3) + f32_const(1.0) + f32_store(offset=12)
    step_body += local_get(3) + f32_const(6.0) + f32_store(offset=28)
    step_body += local_get(3) + local_get(3) + i32_load(offset=32) + i32_const(47) + bytes([OP_I32_ADD]) + i32_const(350) + bytes([OP_I32_REM_S]) + i32_const(50) + bytes([OP_I32_ADD]) + i32_store(offset=32)
    step_body += bytes([OP_ELSE])
    step_body += local_get(3) + local_get(5) + f32_store(offset=12)
    step_body += bytes([OP_END])

    step_body += bytes([OP_END])
    step_body += bytes([OP_END])

    step_body += local_get(1) + i32_const(1) + bytes([OP_I32_ADD]) + local_set(1)
    step_body += bytes([OP_BR, 0x00, OP_END, OP_END])

    builder.add_function("step_simulation", [F32], [], [
        (1, I32), (1, I32), (1, I32), (1, F32), (1, F32), (1, F32), (1, I32), (1, I32), (1, I32)
    ], bytes(step_body))

    # 3. get_sim_time() -> f32
    builder.add_function("get_sim_time", [], [F32], [], i32_const(MEM_SIM_TIME) + f32_load())

    # 4. get_train_count() -> i32
    builder.add_function("get_train_count", [], [I32], [], i32_const(MEM_TRAIN_COUNT) + i32_load())

    def field_getter(offset, is_float):
        body = bytearray()
        body += i32_const(MEM_TRAINS) + local_get(0) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD])
        if is_float:
            body += f32_load(offset=offset)
            return ([I32], [F32], body)
        else:
            body += i32_load(offset=offset)
            return ([I32], [I32], body)

    p, r, b = field_getter(0, False);  builder.add_function("get_train_id", p, r, [], b)
    p, r, b = field_getter(4, False);  builder.add_function("get_train_type", p, r, [], b)
    p, r, b = field_getter(8, False);  builder.add_function("get_train_track", p, r, [], b)
    p, r, b = field_getter(12, True);  builder.add_function("get_train_progress", p, r, [], b)
    p, r, b = field_getter(16, True);  builder.add_function("get_train_speed", p, r, [], b)
    p, r, b = field_getter(20, True);  builder.add_function("get_train_target_speed", p, r, [], b)
    p, r, b = field_getter(24, False); builder.add_function("get_train_state", p, r, [], b)
    p, r, b = field_getter(32, False); builder.add_function("get_train_passengers", p, r, [], b)
    p, r, b = field_getter(36, False); builder.add_function("get_train_delay", p, r, [], b)
    p, r, b = field_getter(40, False); builder.add_function("get_train_current_station", p, r, [], b)
    p, r, b = field_getter(44, False); builder.add_function("get_train_next_station", p, r, [], b)

    # add_train
    add_body = bytearray()
    add_body += i32_const(MEM_TRAIN_COUNT) + i32_load() + local_set(2)
    add_body += local_get(2) + i32_const(16) + bytes([OP_I32_GE_S])
    add_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST]) + leb_s(-1) + bytes([OP_RETURN, OP_END])
    add_body += i32_const(MEM_NEXT_TRAIN_ID) + i32_load() + local_set(3)
    add_body += i32_const(MEM_NEXT_TRAIN_ID) + local_get(3) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store()
    add_body += i32_const(MEM_TRAINS) + local_get(2) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(4)

    add_body += local_get(4) + local_get(3) + i32_store(offset=0)
    add_body += local_get(4) + local_get(0) + i32_store(offset=4)
    add_body += local_get(4) + local_get(1) + i32_store(offset=8)
    add_body += local_get(4) + f32_const(0.0) + f32_store(offset=12)
    add_body += local_get(4) + f32_const(20.0) + f32_store(offset=16)
    add_body += local_get(4) + f32_const(135.0) + f32_store(offset=20)
    add_body += local_get(4) + i32_const(0) + i32_store(offset=24)
    add_body += local_get(4) + f32_const(0.0) + f32_store(offset=28)
    add_body += local_get(4) + i32_const(180) + i32_store(offset=32)
    add_body += local_get(4) + i32_const(0) + i32_store(offset=36)
    add_body += local_get(4) + local_get(1) + i32_store(offset=40)
    add_body += local_get(4) + local_get(1) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store(offset=44)
    add_body += i32_const(MEM_TRAIN_COUNT) + local_get(2) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store()
    add_body += local_get(3)
    builder.add_function("add_train", [I32, I32], [I32], [(1, I32), (1, I32), (1, I32)], bytes(add_body))

    # toggle_switch
    sw_body = bytearray()
    sw_body += i32_const(MEM_SWITCHES) + local_get(0) + i32_const(4) + bytes([OP_I32_REM_S]) + i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(1)
    sw_body += local_get(1) + i32_load() + i32_const(1) + bytes([OP_I32_XOR]) + local_set(2)
    sw_body += local_get(1) + local_get(2) + i32_store()
    sw_body += local_get(2)
    builder.add_function("toggle_switch", [I32], [I32], [(1, I32), (1, I32)], bytes(sw_body))

    # set_emergency_brake
    brk_body = bytearray()
    brk_body += i32_const(MEM_TRAIN_COUNT) + i32_load() + local_set(3)
    brk_body += i32_const(0) + local_set(2)
    brk_body += bytes([OP_BLOCK, EMPTY_BLOCK, OP_LOOP, EMPTY_BLOCK])
    brk_body += local_get(2) + local_get(3) + bytes([OP_I32_GE_S, OP_BR_IF, 1])
    brk_body += i32_const(MEM_TRAINS) + local_get(2) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(4)
    brk_body += local_get(4) + i32_load(offset=0) + local_get(0) + bytes([OP_I32_EQ])
    brk_body += bytes([OP_IF, EMPTY_BLOCK])
    brk_body += local_get(4) + i32_const(3) + i32_const(0) + local_get(1) + bytes([OP_SELECT]) + i32_store(offset=24)
    brk_body += i32_const(1) + bytes([OP_RETURN, OP_END])
    brk_body += local_get(2) + i32_const(1) + bytes([OP_I32_ADD]) + local_set(2)
    brk_body += bytes([OP_BR, 0x00, OP_END, OP_END])
    brk_body += i32_const(0)
    builder.add_function("set_emergency_brake", [I32, I32], [I32], [(1, I32), (1, I32), (1, I32)], bytes(brk_body))

    # get_signal_state
    sig_body = i32_const(MEM_SIGNALS) + local_get(0) + i32_const(18) + bytes([OP_I32_REM_S]) + i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD]) + i32_load()
    builder.add_function("get_signal_state", [I32], [I32], [], bytes(sig_body))

    # get_switch_state
    sw_st_body = i32_const(MEM_SWITCHES) + local_get(0) + i32_const(4) + bytes([OP_I32_REM_S]) + i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD]) + i32_load()
    builder.add_function("get_switch_state", [I32], [I32], [], bytes(sw_st_body))

    # get_station_count
    builder.add_function("get_station_count", [], [I32], [], i32_const(MEM_STATION_COUNT) + i32_load())

    return builder.build()


def update_version_json(sha=None, build_num=None):
    version_file = os.path.join(os.path.dirname(__file__), "version.json")
    
    if os.path.exists(version_file):
        with open(version_file, "r") as f:
            data = json.load(f)
    else:
        data = {}

    if not sha:
        try:
            sha = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
        except Exception:
            sha = "local"

    short_sha = sha[:7] if len(sha) >= 7 else sha
    version = f"1.0.{build_num}" if build_num else data.get("version", DEFAULT_VERSION)
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    data["version"] = version
    data["commit"] = short_sha
    data["fullCommit"] = sha
    data["buildTime"] = now_str
    data["branch"] = "main"
    data["title"] = "Treinen WASM Simulatie"

    with open(version_file, "w") as f:
        json.dump(data, f, indent=2)

    print(f"📦 version.json bijgewerkt naar v{version} ({short_sha})")
    return data


def main():
    parser = argparse.ArgumentParser(description="Treinen WASM Builder")
    parser.add_argument("--ci", action="store_true", help="CI modus")
    parser.add_argument("--sha", type=str, help="Commit SHA")
    parser.add_argument("--build", type=str, help="Build nummer")
    args = parser.parse_args()

    wasm_bytes = generate_treinen_wasm()
    wasm_path = os.path.join(os.path.dirname(__file__), "treinen.wasm")
    with open(wasm_path, "wb") as f:
        f.write(wasm_bytes)

    print(f"✅ WebAssembly binary succesvol gebouwd: {wasm_path} ({len(wasm_bytes)} bytes)")
    update_version_json(sha=args.sha, build_num=args.build)

if __name__ == "__main__":
    main()
