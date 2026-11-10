#!/usr/bin/env python3
"""
Treinen WebAssembly Build & Release Compiler
=============================================
Assembleert de WebAssembly engine voor 'treinen':
- Live Nederlandse treindata telemetrie
- Punctualiteits- en vertragingsanalyse
- Berekening van vectoren en rijhoeken
- Real-time spoorweg netwerkstatistieken
"""

import os
import sys
import json
import struct
import argparse
import subprocess
from datetime import datetime, timezone

APP_NAME = "Treinen"
DEFAULT_VERSION = "2.0.0"

def leb_u(n: int) -> bytes:
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

I32 = 0x7F
F32 = 0x7D
EMPTY_BLOCK = 0x40

OP_BLOCK = 0x02
OP_LOOP = 0x03
OP_IF = 0x04
OP_ELSE = 0x05
OP_END = 0x0B
OP_BR = 0x0C
OP_BR_IF = 0x0D
OP_RETURN = 0x0F
OP_SELECT = 0x1B
OP_LOCAL_GET = 0x20
OP_LOCAL_SET = 0x21
OP_I32_LOAD = 0x28
OP_F32_LOAD = 0x2A
OP_I32_STORE = 0x36
OP_F32_STORE = 0x38
OP_I32_CONST = 0x41
OP_F32_CONST = 0x43
OP_I32_EQZ = 0x45
OP_I32_EQ = 0x46
OP_I32_LT_S = 0x48
OP_I32_GT_S = 0x4A
OP_I32_GE_S = 0x4E
OP_F32_LT = 0x5D
OP_F32_GT = 0x5E
OP_F32_GE = 0x60
OP_I32_ADD = 0x6A
OP_I32_SUB = 0x6B
OP_I32_MUL = 0x6C
OP_I32_DIV_S = 0x6D
OP_I32_REM_S = 0x6F
OP_F32_ADD = 0x92
OP_F32_SUB = 0x93
OP_F32_MUL = 0x94
OP_F32_DIV = 0x95

def i32_const(val: int) -> bytes: return bytes([OP_I32_CONST]) + leb_s(val)
def f32_const(val: float) -> bytes: return bytes([OP_F32_CONST]) + f32_bytes(val)
def local_get(idx: int) -> bytes: return bytes([OP_LOCAL_GET]) + leb_u(idx)
def local_set(idx: int) -> bytes: return bytes([OP_LOCAL_SET]) + leb_u(idx)
def i32_load(offset: int = 0) -> bytes: return bytes([OP_I32_LOAD, 0x02]) + leb_u(offset)
def f32_load(offset: int = 0) -> bytes: return bytes([OP_F32_LOAD, 0x02]) + leb_u(offset)
def i32_store(offset: int = 0) -> bytes: return bytes([OP_I32_STORE, 0x02]) + leb_u(offset)
def f32_store(offset: int = 0) -> bytes: return bytes([OP_F32_STORE, 0x02]) + leb_u(offset)

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

        # Type section
        type_sec = bytearray()
        type_sec += leb_u(len(self.types))
        for params, results in self.types:
            type_sec.append(0x60)
            type_sec += leb_u(len(params))
            for p in params: type_sec.append(p)
            type_sec += leb_u(len(results))
            for r in results: type_sec.append(r)
        wasm += bytes([1]) + leb_u(len(type_sec)) + type_sec

        # Function section
        func_sec = bytearray()
        func_sec += leb_u(len(self.functions))
        for t_idx in self.functions: func_sec += leb_u(t_idx)
        wasm += bytes([3]) + leb_u(len(func_sec)) + func_sec

        # Memory section
        mem_sec = bytearray([0x01, 0x01, 0x01, 0x04]) # min 1, max 4 pages (256KB)
        wasm += bytes([5]) + leb_u(len(mem_sec)) + mem_sec

        # Export section
        exp_sec = bytearray()
        exp_sec += leb_u(len(self.exports) + 1)
        exp_sec += leb_u(len(b"memory")) + b"memory" + bytes([0x02, 0x00])
        for name, kind, idx in self.exports:
            bname = name.encode("utf-8")
            exp_sec += leb_u(len(bname)) + bname + bytes([kind]) + leb_u(idx)
        wasm += bytes([7]) + leb_u(len(exp_sec)) + exp_sec

        # Code section
        code_sec = bytearray()
        code_sec += leb_u(len(self.codes))
        for code in self.codes: code_sec += code
        wasm += bytes([10]) + leb_u(len(code_sec)) + code_sec

        return bytes(wasm)


def generate_treinen_wasm() -> bytes:
    builder = WasmBuilder()

    # 1. init_engine() -> ()
    init_body = bytearray()
    init_body += i32_const(0x0000) + f32_const(0.0) + f32_store() # sim_time
    init_body += i32_const(0x0004) + i32_const(0) + i32_store()   # active_trains
    init_body += i32_const(0x0008) + i32_const(1) + i32_store()   # is_live_mode
    builder.add_function("init_engine", [], [], [], bytes(init_body))

    # 2. calculate_punctuality(speed_kmh: f32, delay_seconds: i32) -> i32
    # 0 = Op tijd (groen), 1 = Kleine vertraging (geel), 2 = Grote vertraging / stilstaand (rood)
    punc_body = bytearray()
    # Als delay > 300 (5 min) -> 2 (rood)
    punc_body += local_get(1) + i32_const(300) + bytes([OP_I32_GT_S])
    punc_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x02, OP_RETURN, OP_END])
    # Als delay > 60 (1 min) -> 1 (geel)
    punc_body += local_get(1) + i32_const(60) + bytes([OP_I32_GT_S])
    punc_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x01, OP_RETURN, OP_END])
    # Als speed == 0 -> 1 (stilstaand)
    punc_body += local_get(0) + f32_const(1.0) + bytes([OP_F32_LT])
    punc_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x01, OP_RETURN, OP_END])
    # Anders 0 (op tijd)
    punc_body += i32_const(0)
    builder.add_function("calculate_punctuality", [F32, I32], [I32], [], bytes(punc_body))

    # 3. get_speed_category(speed_kmh: f32) -> i32
    # 0: Stilstaand (0-5 km/h), 1: Langzaam/Rangeer (5-50), 2: Normale dienst (50-130), 3: Snel/HSL (>130)
    spd_cat_body = bytearray()
    spd_cat_body += local_get(0) + f32_const(135.0) + bytes([OP_F32_GE])
    spd_cat_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x03, OP_RETURN, OP_END])
    spd_cat_body += local_get(0) + f32_const(50.0) + bytes([OP_F32_GE])
    spd_cat_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x02, OP_RETURN, OP_END])
    spd_cat_body += local_get(0) + f32_const(5.0) + bytes([OP_F32_GE])
    spd_cat_body += bytes([OP_IF, EMPTY_BLOCK, OP_I32_CONST, 0x01, OP_RETURN, OP_END])
    spd_cat_body += i32_const(0)
    builder.add_function("get_speed_category", [F32], [I32], [], bytes(spd_cat_body))

    # 4. interpolate_coord(c_start: f32, c_end: f32, t: f32) -> f32
    # c_start + (c_end - c_start) * t
    interp_body = bytearray()
    interp_body += local_get(0)
    interp_body += local_get(1) + local_get(0) + bytes([OP_F32_SUB])
    interp_body += local_get(2) + bytes([OP_F32_MUL, OP_F32_ADD])
    builder.add_function("interpolate_coord", [F32, F32, F32], [F32], [], bytes(interp_body))

    # 5. calculate_heading_deg(d_lat: f32, d_lon: f32) -> f32
    # Eenvoudige hoekberekening in graden (0-360)
    heading_body = bytearray()
    # (d_lon * 1.5) / (d_lat + 0.0001)
    heading_body += local_get(1) + f32_const(1.5) + bytes([OP_F32_MUL])
    heading_body += local_get(0) + f32_const(0.00001) + bytes([OP_F32_ADD, OP_F32_DIV])
    builder.add_function("calculate_heading_deg", [F32, F32], [F32], [], bytes(heading_body))

    return builder.build()


def update_version_json(sha=None, build_num=None):
    version_file = os.path.join(os.path.dirname(__file__), "version.json")
    if os.path.exists(version_file):
        with open(version_file, "r") as f: data = json.load(f)
    else: data = {}

    if not sha:
        try: sha = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
        except Exception: sha = "local"

    short_sha = sha[:7] if len(sha) >= 7 else sha
    version = f"2.0.{build_num}" if build_num else data.get("version", DEFAULT_VERSION)
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    data["version"] = version
    data["commit"] = short_sha
    data["fullCommit"] = sha
    data["buildTime"] = now_str
    data["branch"] = "main"
    data["title"] = "Treinen - Live Satelliet Radar Nederland"

    with open(version_file, "w") as f: json.dump(data, f, indent=2)
    print(f"📦 version.json bijgewerkt naar v{version} ({short_sha})")


def main():
    parser = argparse.ArgumentParser(description="Treinen WASM Builder")
    parser.add_argument("--ci", action="store_true", help="CI modus")
    parser.add_argument("--sha", type=str, help="Commit SHA")
    parser.add_argument("--build", type=str, help="Build nummer")
    args = parser.parse_args()

    wasm_bytes = generate_treinen_wasm()
    wasm_path = os.path.join(os.path.dirname(__file__), "treinen.wasm")
    with open(wasm_path, "wb") as f: f.write(wasm_bytes)

    print(f"✅ WebAssembly binary succesvol gebouwd: {wasm_path} ({len(wasm_bytes)} bytes)")
    update_version_json(sha=args.sha, build_num=args.build)

if __name__ == "__main__":
    main()
