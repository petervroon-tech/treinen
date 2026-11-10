#!/usr/bin/env python3
"""
tools/build_wasm.py
Compiles and packages the WebAssembly module for 'treinen' (Train simulation engine).
Outputs: public/treinen.wasm

This builder produces a valid WebAssembly 1.0 binary module with:
- Linear memory (1 page = 64KB)
- Data structures for stations, tracks, switches, signals, and trains
- Exported simulation functions:
  - init_simulation()
  - step_simulation(dt_seconds: f32)
  - get_sim_time() -> f32
  - get_train_count() -> i32
  - get_train_id(idx: i32) -> i32
  - get_train_type(idx: i32) -> i32
  - get_train_track(idx: i32) -> i32
  - get_train_progress(idx: i32) -> f32
  - get_train_speed(idx: i32) -> f32
  - get_train_state(idx: i32) -> i32
  - get_train_passengers(idx: i32) -> i32
  - get_train_delay(idx: i32) -> i32
  - get_train_current_station(idx: i32) -> i32
  - get_train_next_station(idx: i32) -> i32
  - add_train(train_type: i32, start_station: i32) -> i32
  - toggle_switch(switch_id: i32) -> i32
  - set_emergency_brake(train_id: i32, active: i32) -> i32
  - get_signal_state(idx: i32) -> i32
  - get_switch_state(idx: i32) -> i32
  - get_station_count() -> i32
"""

import os
import sys
import struct
import math

def uleb128(n: int) -> bytes:
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

def sleb128(n: int) -> bytes:
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

# Helper opcode emitters
def i32_const(val: int) -> bytes:
    return bytes([OP_I32_CONST]) + sleb128(val)

def f32_const(val: float) -> bytes:
    return bytes([OP_F32_CONST]) + f32_bytes(val)

def local_get(idx: int) -> bytes:
    return bytes([OP_LOCAL_GET]) + uleb128(idx)

def local_set(idx: int) -> bytes:
    return bytes([OP_LOCAL_SET]) + uleb128(idx)

def local_tee(idx: int) -> bytes:
    return bytes([OP_LOCAL_TEE]) + uleb128(idx)

def i32_load(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_I32_LOAD]) + uleb128(align) + uleb128(offset)

def f32_load(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_F32_LOAD]) + uleb128(align) + uleb128(offset)

def i32_store(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_I32_STORE]) + uleb128(align) + uleb128(offset)

def f32_store(offset: int = 0, align: int = 2) -> bytes:
    return bytes([OP_F32_STORE]) + uleb128(align) + uleb128(offset)

# Memory layout offsets
MEM_SIM_TIME = 0x0000        # f32
MEM_TRAIN_COUNT = 0x0004     # i32
MEM_STATION_COUNT = 0x0008   # i32
MEM_TRACK_COUNT = 0x000C     # i32
MEM_SIGNAL_COUNT = 0x0010    # i32
MEM_SWITCH_COUNT = 0x0014    # i32
MEM_NEXT_TRAIN_ID = 0x0018   # i32

MEM_STATIONS = 0x0100        # 8 stations * 32 bytes
MEM_SWITCHES = 0x0300        # 4 switches * 16 bytes
MEM_SIGNALS  = 0x0400        # 18 signals * 16 bytes
MEM_TRACKS   = 0x0600        # 18 tracks * 32 bytes
MEM_TRAINS   = 0x1000        # 32 trains * 64 bytes each

# Train struct fields (64 bytes each):
# 0: id (i32)
# 4: type (i32) [0=Intercity, 1=Sprinter, 2=Cargo, 3=Eurostar]
# 8: track_id (i32)
# 12: progress (f32, 0.0 .. 1.0)
# 16: speed (f32, km/h)
# 20: target_speed (f32, km/h)
# 24: state (i32) [0=Moving, 1=AtStation, 2=AtSignal, 3=Brake]
# 28: dwell_timer (f32, seconds)
# 32: passengers (i32)
# 36: delay_sec (i32)
# 40: current_station (i32)
# 44: next_station (i32)
# 48: emergency_brake (i32)

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
        self.exports.append((name, 0x00, func_idx)) # 0x00 = func export

    # Encode locals
    # locals_list is [(count, type)]
        encoded_locals = bytearray()
        encoded_locals += uleb128(len(locals_list))
        for count, ltype in locals_list:
            encoded_locals += uleb128(count) + bytes([ltype])

        full_body = bytes(encoded_locals) + body_bytes + bytes([OP_END])
        self.codes.append(uleb128(len(full_body)) + full_body)
        return func_idx

    def build(self) -> bytes:
        wasm = bytearray(b"\x00asm\x01\x00\x00\x00")

    # 1. Type section
        type_sec = bytearray()
        type_sec += uleb128(len(self.types))
        for params, results in self.types:
            type_sec.append(0x60) # func
            type_sec += uleb128(len(params))
            for p in params:
                type_sec.append(p)
            type_sec += uleb128(len(results))
            for r in results:
                type_sec.append(r)
        wasm += bytes([1]) + uleb128(len(type_sec)) + type_sec

    # 3. Function section
        func_sec = bytearray()
        func_sec += uleb128(len(self.functions))
        for t_idx in self.functions:
            func_sec += uleb128(t_idx)
        wasm += bytes([3]) + uleb128(len(func_sec)) + func_sec

    # 5. Memory section (1 page min = 64KB, 2 pages max = 128KB)
        mem_sec = bytearray()
        mem_sec += uleb128(1) # 1 memory
        mem_sec.append(0x01)  # has maximum
        mem_sec += uleb128(1) # initial: 1 page
        mem_sec += uleb128(2) # maximum: 2 pages
        wasm += bytes([5]) + uleb128(len(mem_sec)) + mem_sec

    # 7. Export section (exported functions + exported memory)
        exp_sec = bytearray()
    # total exports = functions + 1 memory
        exp_sec += uleb128(len(self.exports) + 1)
    # memory export
        mem_name = b"memory"
        exp_sec += uleb128(len(mem_name)) + mem_name + bytes([0x02, 0x00]) # 0x02 = memory, idx 0
        for name, kind, idx in self.exports:
            bname = name.encode("utf-8")
            exp_sec += uleb128(len(bname)) + bname + bytes([kind]) + uleb128(idx)
        wasm += bytes([7]) + uleb128(len(exp_sec)) + exp_sec

    # 10. Code section
        code_sec = bytearray()
        code_sec += uleb128(len(self.codes))
        for code in self.codes:
            code_sec += code
        wasm += bytes([10]) + uleb128(len(code_sec)) + code_sec

        return bytes(wasm)


def generate_treinen_wasm() -> bytes:
    builder = WasmBuilder()

    # -------------------------------------------------------------
    # 1. init_simulation() -> ()
    # -------------------------------------------------------------
    # Initializes simulation clock to 0, sets train_count=4, station_count=8,
    # tracks, switches, signals, and populates 4 initial Dutch trains.
    init_body = bytearray()

    # sim_time = 0.0
    init_body += i32_const(MEM_SIM_TIME) + f32_const(0.0) + f32_store()
    # train_count = 4
    init_body += i32_const(MEM_TRAIN_COUNT) + i32_const(4) + i32_store()
    # station_count = 8
    init_body += i32_const(MEM_STATION_COUNT) + i32_const(8) + i32_store()
    # track_count = 18
    init_body += i32_const(MEM_TRACK_COUNT) + i32_const(18) + i32_store()
    # signal_count = 18
    init_body += i32_const(MEM_SIGNAL_COUNT) + i32_const(18) + i32_store()
    # switch_count = 4
    init_body += i32_const(MEM_SWITCH_COUNT) + i32_const(4) + i32_store()
    # next_train_id = 105
    init_body += i32_const(MEM_NEXT_TRAIN_ID) + i32_const(105) + i32_store()

    # Populate 4 initial trains:
    # Train 0: VIRM Intercity (Type 0, Track 0: Ams -> Utr, progress 0.15, speed 130 km/h)
    t0 = MEM_TRAINS + 0 * 64
    init_body += i32_const(t0 + 0) + i32_const(101) + i32_store()        # id
    init_body += i32_const(t0 + 4) + i32_const(0) + i32_store()          # type VIRM
    init_body += i32_const(t0 + 8) + i32_const(0) + i32_store()          # track 0
    init_body += i32_const(t0 + 12) + f32_const(0.15) + f32_store()      # progress
    init_body += i32_const(t0 + 16) + f32_const(130.0) + f32_store()     # speed
    init_body += i32_const(t0 + 20) + f32_const(140.0) + f32_store()     # target_speed
    init_body += i32_const(t0 + 24) + i32_const(0) + i32_store()         # state Moving
    init_body += i32_const(t0 + 28) + f32_const(0.0) + f32_store()       # dwell_timer
    init_body += i32_const(t0 + 32) + i32_const(312) + i32_store()       # passengers
    init_body += i32_const(t0 + 36) + i32_const(0) + i32_store()         # delay
    init_body += i32_const(t0 + 40) + i32_const(0) + i32_store()         # current_station: Amsterdam
    init_body += i32_const(t0 + 44) + i32_const(1) + i32_store()         # next_station: Utrecht

    # Train 1: Sprinter SLT (Type 1, Track 2: Ams -> Den Haag, progress 0.45, speed 110 km/h)
    t1 = MEM_TRAINS + 1 * 64
    init_body += i32_const(t1 + 0) + i32_const(102) + i32_store()        # id
    init_body += i32_const(t1 + 4) + i32_const(1) + i32_store()          # type Sprinter
    init_body += i32_const(t1 + 8) + i32_const(2) + i32_store()          # track 2
    init_body += i32_const(t1 + 12) + f32_const(0.45) + f32_store()      # progress
    init_body += i32_const(t1 + 16) + f32_const(110.0) + f32_store()     # speed
    init_body += i32_const(t1 + 20) + f32_const(120.0) + f32_store()     # target_speed
    init_body += i32_const(t1 + 24) + i32_const(0) + i32_store()         # state Moving
    init_body += i32_const(t1 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t1 + 32) + i32_const(145) + i32_store()       # passengers
    init_body += i32_const(t1 + 36) + i32_const(60) + i32_store()        # 1 min delay
    init_body += i32_const(t1 + 40) + i32_const(0) + i32_store()
    init_body += i32_const(t1 + 44) + i32_const(3) + i32_store()         # Den Haag

    # Train 2: Eurostar (Type 3, Track 10: Utrecht -> Eindhoven, progress 0.60, speed 150 km/h)
    t2 = MEM_TRAINS + 2 * 64
    init_body += i32_const(t2 + 0) + i32_const(103) + i32_store()
    init_body += i32_const(t2 + 4) + i32_const(3) + i32_store()          # Eurostar
    init_body += i32_const(t2 + 8) + i32_const(10) + i32_store()
    init_body += i32_const(t2 + 12) + f32_const(0.60) + f32_store()
    init_body += i32_const(t2 + 16) + f32_const(150.0) + f32_store()
    init_body += i32_const(t2 + 20) + f32_const(160.0) + f32_store()
    init_body += i32_const(t2 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t2 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t2 + 32) + i32_const(280) + i32_store()
    init_body += i32_const(t2 + 36) + i32_const(0) + i32_store()
    init_body += i32_const(t2 + 40) + i32_const(1) + i32_store()
    init_body += i32_const(t2 + 44) + i32_const(4) + i32_store()         # Eindhoven

    # Train 3: Cargo Traxx (Type 2, Track 16: Zwolle -> Groningen, progress 0.30, speed 90 km/h)
    t3 = MEM_TRAINS + 3 * 64
    init_body += i32_const(t3 + 0) + i32_const(104) + i32_store()
    init_body += i32_const(t3 + 4) + i32_const(2) + i32_store()          # Cargo
    init_body += i32_const(t3 + 8) + i32_const(16) + i32_store()
    init_body += i32_const(t3 + 12) + f32_const(0.30) + f32_store()
    init_body += i32_const(t3 + 16) + f32_const(90.0) + f32_store()
    init_body += i32_const(t3 + 20) + f32_const(95.0) + f32_store()
    init_body += i32_const(t3 + 24) + i32_const(0) + i32_store()
    init_body += i32_const(t3 + 28) + f32_const(0.0) + f32_store()
    init_body += i32_const(t3 + 32) + i32_const(0) + i32_store()         # 0 passengers
    init_body += i32_const(t3 + 36) + i32_const(0) + i32_store()
    init_body += i32_const(t3 + 40) + i32_const(6) + i32_store()         # Zwolle
    init_body += i32_const(t3 + 44) + i32_const(7) + i32_store()         # Groningen

    # Initialize 18 signals (all Green = 2 by default)
    for s_idx in range(18):
        s_addr = MEM_SIGNALS + s_idx * 16
        init_body += i32_const(s_addr) + i32_const(2) + i32_store()

    # Initialize 4 switches (0 = Normal/Straight)
    for sw_idx in range(4):
        sw_addr = MEM_SWITCHES + sw_idx * 16
        init_body += i32_const(sw_addr) + i32_const(0) + i32_store()

    builder.add_function("init_simulation", [], [], [], bytes(init_body))

    # -------------------------------------------------------------
    # 2. step_simulation(dt: f32) -> ()
    # -------------------------------------------------------------
    # Updates sim_time += dt
    # For each train (0 .. train_count-1):
    #   if emergency_brake != 0:
    #       speed = max(0.0, speed - 80.0 * dt)
    #   else if state == 1 (At station):
    #       dwell_timer -= dt
    #       if dwell_timer <= 0:
    #           state = 0 (moving)
    #           speed = 10.0
    #           progress = 0.0
    #           (swap track / next_station)
    #   else (Moving):
    #       speed smoothly approaches target_speed
    #       progress += (speed * 0.277778 * dt) / 100000.0 (scaled)
    #       if progress >= 1.0:
    #           state = 1 (At station)
    #           dwell_timer = 5.0
    #           speed = 0.0
    #           passengers = (passengers + 30) % 380 + 20
    # -------------------------------------------------------------
    step_body = bytearray()
    # Locals for step_simulation:
    # 0: dt (param f32)
    # 1: i (i32 loop index)
    # 2: count (i32)
    # 3: train_ptr (i32)
    # 4: cur_speed (f32)
    # 5: prog (f32)
    # 6: dwell (f32)
    # 7: state (i32)
    # 8: st_a (i32)
    # 9: st_b (i32)

    # sim_time += dt
    step_body += i32_const(MEM_SIM_TIME)
    step_body += i32_const(MEM_SIM_TIME) + f32_load()
    step_body += local_get(0) + bytes([OP_F32_ADD])
    step_body += f32_store()

    # count = load(MEM_TRAIN_COUNT)
    step_body += i32_const(MEM_TRAIN_COUNT) + i32_load()
    step_body += local_set(2)

    # i = 0
    step_body += i32_const(0) + local_set(1)

    # Loop block: block { loop { br_if(1, i >= count) ... i++; br(0) } }
    step_body += bytes([OP_BLOCK, EMPTY_BLOCK])
    step_body += bytes([OP_LOOP, EMPTY_BLOCK])

    # Check termination: if (i >= count) break
    step_body += local_get(1) + local_get(2) + bytes([OP_I32_GE_S])
    step_body += bytes([OP_BR_IF]) + uleb128(1)

    # train_ptr = MEM_TRAINS + i * 64
    step_body += i32_const(MEM_TRAINS)
    step_body += local_get(1) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD])
    step_body += local_set(3)

    # state = load(train_ptr + 24)
    step_body += local_get(3) + i32_load(offset=24) + local_set(7)

    # If state == 3 (Emergency Brake)
    step_body += local_get(7) + i32_const(3) + bytes([OP_I32_EQ])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    # cur_speed = max(0.0, cur_speed - 90.0 * dt)
    step_body += local_get(3) + f32_load(offset=16)
    step_body += f32_const(90.0) + local_get(0) + bytes([OP_F32_MUL, OP_F32_SUB])
    step_body += local_set(4)
    step_body += local_get(4) + f32_const(0.0) + bytes([OP_F32_LT])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += f32_const(0.0) + local_set(4)
    step_body += bytes([OP_END])
    step_body += local_get(3) + local_get(4) + f32_store(offset=16)
    step_body += bytes([OP_ELSE])

    # If state == 1 (At Station)
    step_body += local_get(7) + i32_const(1) + bytes([OP_I32_EQ])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    # dwell = load(train_ptr + 28) - dt
    step_body += local_get(3) + f32_load(offset=28)
    step_body += local_get(0) + bytes([OP_F32_SUB])
    step_body += local_set(6)
    step_body += local_get(6) + f32_const(0.0) + bytes([OP_F32_LE])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    # Dwell expired: depart!
    # state = 0 (moving)
    step_body += local_get(3) + i32_const(0) + i32_store(offset=24)
    # progress = 0.0
    step_body += local_get(3) + f32_const(0.0) + f32_store(offset=12)
    # speed = 25.0
    step_body += local_get(3) + f32_const(25.0) + f32_store(offset=16)
    # track_id = (track_id ^ 1)
    step_body += local_get(3)
    step_body += local_get(3) + i32_load(offset=8) + i32_const(1) + bytes([OP_I32_XOR])
    step_body += i32_store(offset=8)
    # swap current & next stations
    step_body += local_get(3) + i32_load(offset=40) + local_set(8)
    step_body += local_get(3) + i32_load(offset=44) + local_set(9)
    step_body += local_get(3) + local_get(9) + i32_store(offset=40)
    step_body += local_get(3) + local_get(8) + i32_store(offset=44)
    step_body += bytes([OP_ELSE])
    # dwell > 0: store updated dwell
    step_body += local_get(3) + local_get(6) + f32_store(offset=28)
    step_body += bytes([OP_END])

    step_body += bytes([OP_ELSE])
    # State == 0 (Moving)
    # cur_speed = min(target, speed + 18.0 * dt)
    step_body += local_get(3) + f32_load(offset=16)
    step_body += f32_const(18.0) + local_get(0) + bytes([OP_F32_MUL, OP_F32_ADD])
    step_body += local_set(4)
    step_body += local_get(4) + local_get(3) + f32_load(offset=20) + bytes([OP_F32_GT])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    step_body += local_get(3) + f32_load(offset=20) + local_set(4)
    step_body += bytes([OP_END])
    step_body += local_get(3) + local_get(4) + f32_store(offset=16)

    # progress += (speed / 140.0) * 0.045 * dt
    step_body += local_get(3) + f32_load(offset=12)
    step_body += local_get(4) + f32_const(140.0) + bytes([OP_F32_DIV])
    step_body += f32_const(0.045) + bytes([OP_F32_MUL])
    step_body += local_get(0) + bytes([OP_F32_MUL, OP_F32_ADD])
    step_body += local_set(5)

    # If progress >= 1.0 -> Arrived at station!
    step_body += local_get(5) + f32_const(1.0) + bytes([OP_F32_GE])
    step_body += bytes([OP_IF, EMPTY_BLOCK])
    # state = 1 (At station)
    step_body += local_get(3) + i32_const(1) + i32_store(offset=24)
    # speed = 0.0
    step_body += local_get(3) + f32_const(0.0) + f32_store(offset=16)
    # progress = 1.0
    step_body += local_get(3) + f32_const(1.0) + f32_store(offset=12)
    # dwell_timer = 6.0 seconds
    step_body += local_get(3) + f32_const(6.0) + f32_store(offset=28)
    # Exchange passengers
    step_body += local_get(3)
    step_body += local_get(3) + i32_load(offset=32) + i32_const(47) + bytes([OP_I32_ADD])
    step_body += i32_const(350) + bytes([OP_I32_REM_S]) + i32_const(50) + bytes([OP_I32_ADD])
    step_body += i32_store(offset=32)
    step_body += bytes([OP_ELSE])
    step_body += local_get(3) + local_get(5) + f32_store(offset=12)
    step_body += bytes([OP_END])

    step_body += bytes([OP_END]) # end moving if
    step_body += bytes([OP_END]) # end brake if

    # i++
    step_body += local_get(1) + i32_const(1) + bytes([OP_I32_ADD]) + local_set(1)
    step_body += bytes([OP_BR, 0x00, OP_END, OP_END]) # continue and close loop & block

    builder.add_function("step_simulation", [F32], [], [
        (1, I32), # 1: i
        (1, I32), # 2: count
        (1, I32), # 3: train_ptr
        (1, F32), # 4: cur_speed
        (1, F32), # 5: prog
        (1, F32), # 6: dwell
        (1, I32), # 7: state
        (1, I32), # 8: st_a
        (1, I32), # 9: st_b
    ], bytes(step_body))

    # -------------------------------------------------------------
    # 3. get_sim_time() -> f32
    # -------------------------------------------------------------
    b = i32_const(MEM_SIM_TIME) + f32_load()
    builder.add_function("get_sim_time", [], [F32], [], b)

    # -------------------------------------------------------------
    # 4. get_train_count() -> i32
    # -------------------------------------------------------------
    b = i32_const(MEM_TRAIN_COUNT) + i32_load()
    builder.add_function("get_train_count", [], [I32], [], b)

    # -------------------------------------------------------------
    # 5. Field Getters for train by index: get_train_xxx(idx: i32)
    # -------------------------------------------------------------
    def train_field_getter(field_offset: int, is_float: bool):
        body = bytearray()
        body += i32_const(MEM_TRAINS)
        body += local_get(0) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD])
        if is_float:
            body += f32_load(offset=field_offset)
            return ([I32], [F32], body)
        else:
            body += i32_load(offset=field_offset)
            return ([I32], [I32], body)

    p, r, b = train_field_getter(0, False)
    builder.add_function("get_train_id", p, r, [], b)

    p, r, b = train_field_getter(4, False)
    builder.add_function("get_train_type", p, r, [], b)

    p, r, b = train_field_getter(8, False)
    builder.add_function("get_train_track", p, r, [], b)

    p, r, b = train_field_getter(12, True)
    builder.add_function("get_train_progress", p, r, [], b)

    p, r, b = train_field_getter(16, True)
    builder.add_function("get_train_speed", p, r, [], b)

    p, r, b = train_field_getter(20, True)
    builder.add_function("get_train_target_speed", p, r, [], b)

    p, r, b = train_field_getter(24, False)
    builder.add_function("get_train_state", p, r, [], b)

    p, r, b = train_field_getter(32, False)
    builder.add_function("get_train_passengers", p, r, [], b)

    p, r, b = train_field_getter(36, False)
    builder.add_function("get_train_delay", p, r, [], b)

    p, r, b = train_field_getter(40, False)
    builder.add_function("get_train_current_station", p, r, [], b)

    p, r, b = train_field_getter(44, False)
    builder.add_function("get_train_next_station", p, r, [], b)

    # -------------------------------------------------------------
    # 6. add_train(train_type: i32, start_station: i32) -> i32 (new train id)
    # -------------------------------------------------------------
    add_body = bytearray()
    # Locals: 2: cur_count, 3: new_id, 4: ptr
    add_body += i32_const(MEM_TRAIN_COUNT) + i32_load() + local_set(2)
    # If cur_count >= 16, return -1
    add_body += local_get(2) + i32_const(16) + bytes([OP_I32_GE_S])
    add_body += bytes([OP_IF, EMPTY_BLOCK])
    add_body += i32_const(-1) + bytes([OP_RETURN])
    add_body += bytes([OP_END])

    # new_id = load(MEM_NEXT_TRAIN_ID)
    add_body += i32_const(MEM_NEXT_TRAIN_ID) + i32_load() + local_set(3)
    # next_train_id++
    add_body += i32_const(MEM_NEXT_TRAIN_ID) + local_get(3) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store()

    # ptr = MEM_TRAINS + cur_count * 64
    add_body += i32_const(MEM_TRAINS) + local_get(2) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(4)

    # Store train attributes:
    add_body += local_get(4) + local_get(3) + i32_store(offset=0)          # id
    add_body += local_get(4) + local_get(0) + i32_store(offset=4)          # type
    add_body += local_get(4) + local_get(1) + i32_store(offset=8)          # track (mapped from station)
    add_body += local_get(4) + f32_const(0.0) + f32_store(offset=12)       # progress 0
    add_body += local_get(4) + f32_const(20.0) + f32_store(offset=16)      # speed
    add_body += local_get(4) + f32_const(135.0) + f32_store(offset=20)     # target_speed
    add_body += local_get(4) + i32_const(0) + i32_store(offset=24)         # state Moving
    add_body += local_get(4) + f32_const(0.0) + f32_store(offset=28)       # dwell
    add_body += local_get(4) + i32_const(180) + i32_store(offset=32)       # passengers
    add_body += local_get(4) + i32_const(0) + i32_store(offset=36)         # delay
    add_body += local_get(4) + local_get(1) + i32_store(offset=40)         # cur station
    add_body += local_get(4) + local_get(1) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store(offset=44) # next station

    # train_count++
    add_body += i32_const(MEM_TRAIN_COUNT) + local_get(2) + i32_const(1) + bytes([OP_I32_ADD]) + i32_store()
    # return new_id
    add_body += local_get(3)

    builder.add_function("add_train", [I32, I32], [I32], [
        (1, I32), # 2: cur_count
        (1, I32), # 3: new_id
        (1, I32), # 4: ptr
    ], bytes(add_body))

    # -------------------------------------------------------------
    # 7. toggle_switch(switch_id: i32) -> i32 (new state)
    # -------------------------------------------------------------
    sw_body = bytearray()
    # addr = MEM_SWITCHES + (switch_id % 4) * 16
    sw_body += i32_const(MEM_SWITCHES)
    sw_body += local_get(0) + i32_const(4) + bytes([OP_I32_REM_S]) + i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD])
    sw_body += local_set(1) # addr stored in local 1
    # new_state = load(addr) ^ 1
    sw_body += local_get(1) + i32_load() + i32_const(1) + bytes([OP_I32_XOR])
    sw_body += local_set(2)
    # store new_state back into addr
    sw_body += local_get(1) + local_get(2) + i32_store()
    sw_body += local_get(2) # return new_state

    builder.add_function("toggle_switch", [I32], [I32], [
        (1, I32), # 1: addr
        (1, I32), # 2: new_state
    ], bytes(sw_body))

    # -------------------------------------------------------------
    # 8. set_emergency_brake(train_id: i32, active: i32) -> i32
    # -------------------------------------------------------------
    brk_body = bytearray()
    # Locals: 2: i, 3: count, 4: ptr
    brk_body += i32_const(MEM_TRAIN_COUNT) + i32_load() + local_set(3)
    brk_body += i32_const(0) + local_set(2)
    brk_body += bytes([OP_BLOCK, EMPTY_BLOCK])
    brk_body += bytes([OP_LOOP, EMPTY_BLOCK])
    brk_body += local_get(2) + local_get(3) + bytes([OP_I32_GE_S, OP_BR_IF, 1])

    brk_body += i32_const(MEM_TRAINS) + local_get(2) + i32_const(64) + bytes([OP_I32_MUL, OP_I32_ADD]) + local_set(4)
    # if load(ptr) == train_id
    brk_body += local_get(4) + i32_load(offset=0) + local_get(0) + bytes([OP_I32_EQ])
    brk_body += bytes([OP_IF, EMPTY_BLOCK])
    # target state: if active!=0 then 3 else 0 using select
    brk_body += local_get(4)          # addr
    brk_body += i32_const(3)          # val1 (true)
    brk_body += i32_const(0)          # val2 (false)
    brk_body += local_get(1)          # cond
    brk_body += bytes([OP_SELECT])    # pops cond, val2, val1 -> pushes result
    brk_body += i32_store(offset=24)  # stores into state
    brk_body += i32_const(1) + bytes([OP_RETURN])
    brk_body += bytes([OP_END])

    brk_body += local_get(2) + i32_const(1) + bytes([OP_I32_ADD]) + local_set(2)
    brk_body += bytes([OP_BR, 0x00, OP_END, OP_END])
    brk_body += i32_const(0) # not found

    builder.add_function("set_emergency_brake", [I32, I32], [I32], [
        (1, I32), # 2: i
        (1, I32), # 3: count
        (1, I32), # 4: ptr
    ], bytes(brk_body))

    # -------------------------------------------------------------
    # 9. get_signal_state(idx: i32) -> i32
    # -------------------------------------------------------------
    sig_body = bytearray()
    sig_body += i32_const(MEM_SIGNALS) + local_get(0) + i32_const(18) + bytes([OP_I32_REM_S])
    sig_body += i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD]) + i32_load()
    builder.add_function("get_signal_state", [I32], [I32], [], bytes(sig_body))

    # -------------------------------------------------------------
    # 10. get_switch_state(idx: i32) -> i32
    # -------------------------------------------------------------
    sw_st_body = bytearray()
    sw_st_body += i32_const(MEM_SWITCHES) + local_get(0) + i32_const(4) + bytes([OP_I32_REM_S])
    sw_st_body += i32_const(16) + bytes([OP_I32_MUL, OP_I32_ADD]) + i32_load()
    builder.add_function("get_switch_state", [I32], [I32], [], bytes(sw_st_body))

    # -------------------------------------------------------------
    # 11. get_station_count() -> i32
    # -------------------------------------------------------------
    st_count_body = i32_const(MEM_STATION_COUNT) + i32_load()
    builder.add_function("get_station_count", [], [I32], [], st_count_body)

    return builder.build()


def main():
    os.makedirs("public", exist_ok=True)
    wasm_bytes = generate_treinen_wasm()
    out_path = os.path.join("public", "treinen.wasm")
    with open(out_path, "wb") as f:
        f.write(wasm_bytes)

    print(f"✅ WebAssembly binary succesvol gebouwd: {out_path}")
    print(f"   Bestandsgrootte: {len(wasm_bytes)} bytes")
    print(f"   Exported functions: init_simulation, step_simulation, get_train_count, add_train, ...")

if __name__ == "__main__":
    main()
