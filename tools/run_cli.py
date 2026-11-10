#!/usr/bin/env python3
"""
tools/run_cli.py
Demonstreert de cross-platform werking van treinen.wasm buiten de browser via WebAssembly runtime.
"""

import os
import subprocess

def run_wasm_cli():
    wasm_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "treinen.wasm"))
    print(f"🚂 Treinen WebAssembly CLI Runner")
    print(f"   WASM bestand: {wasm_path} ({os.path.getsize(wasm_path)} bytes)\n")

    js_code = f"""
    const fs = $.NSFileManager.defaultManager;
    const data = fs.contentsAtPath("{wasm_path}");
    const uint8 = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) uint8[i] = data.bytes[i];
    
    const mod = new WebAssembly.Module(uint8);
    const inst = new WebAssembly.Instance(mod);
    const exp = inst.exports;
    
    exp.init_simulation();
    console.log("=== Treinen Simulatie Geïnitialiseerd ===");
    console.log("Actieve treinen:", exp.get_train_count());
    
    const types = ["NS VIRM Intercity", "NS Sprinter SLT", "DB Cargo Traxx", "Eurostar / Thalys"];
    for (let i = 0; i < exp.get_train_count(); i++) {{
        const typeId = exp.get_train_type(i);
        console.log(`- Trein #${{exp.get_train_id(i)}}: ${{types[typeId]}} op spoor ${{exp.get_train_track(i)}}, snelheid: ${{Math.round(exp.get_train_speed(i))}} km/u, reizigers: ${{exp.get_train_passengers(i)}}`);
    }}
    
    console.log("\\n>>> Simulatiestap van 2.0 seconden uitvoeren in WebAssembly...");
    exp.step_simulation(2.0);
    console.log("Simulatietijd na stap:", exp.get_sim_time(), "seconden");
    console.log("Trein 101 nieuwe snelheid:", Math.round(exp.get_train_speed(0)), "km/u, voortgang:", exp.get_train_progress(0).toFixed(4));
    
    console.log("\\n>>> Test wissel omleggen...");
    const swResult = exp.toggle_switch(0);
    console.log("Wissel 0 stand gewijzigd naar:", swResult === 0 ? "Rechtdoor (0)" : "Afbuigend (1)");
    
    console.log("\\n>>> Nieuwe trein spawnen...");
    const newId = exp.add_train(0, 3);
    console.log("Nieuwe trein aangemaakt met ID:", newId, "| Totaal aantal treinen:", exp.get_train_count());
    """

    res = subprocess.run(["osascript", "-l", "JavaScript", "-e", js_code], capture_output=True, text=True)
    if res.stdout.strip():
        print(res.stdout)
    if res.stderr.strip():
        for line in res.stderr.splitlines():
            if not "Connection Invalid" in line:
                print(line)

if __name__ == "__main__":
    run_wasm_cli()
