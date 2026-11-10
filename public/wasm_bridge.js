// Treinen WebAssembly Bridge & Spoorwegnetwerk Coördinaten

export class TreinenWasmBridge {
  constructor() {
    this.wasmInstance = null;
    this.memory = null;
    this.isLoaded = false;

    // Nederlandse stations
    this.stations = [
      { id: 0, name: "Amsterdam Centraal", code: "Asd", x: 280, y: 160, sporen: 15 },
      { id: 1, name: "Utrecht Centraal",   code: "Ut",  x: 350, y: 300, sporen: 21 },
      { id: 2, name: "Rotterdam Centraal", code: "Rtd", x: 210, y: 390, sporen: 16 },
      { id: 3, name: "Den Haag Centraal",  code: "Gvc", x: 170, y: 280, sporen: 12 },
      { id: 4, name: "Eindhoven Centraal", code: "Ehv", x: 390, y: 510, sporen: 8  },
      { id: 5, name: "Arnhem Centraal",    code: "Ah",  x: 520, y: 320, sporen: 10 },
      { id: 6, name: "Zwolle",             code: "Zl",  x: 480, y: 190, sporen: 16 },
      { id: 7, name: "Groningen",          code: "Gn",  x: 560, y: 90,  sporen: 9  }
    ];

    // Spoorverbindingen met realistische boogpunten (Bézier curves)
    this.tracks = [
      // 0 & 1: Amsterdam <-> Utrecht
      { id: 0, from: 0, to: 1, cp1: { x: 305, y: 220 }, cp2: { x: 330, y: 260 }, length: 42 },
      { id: 1, from: 1, to: 0, cp1: { x: 330, y: 260 }, cp2: { x: 305, y: 220 }, length: 42 },

      // 2 & 3: Amsterdam <-> Den Haag
      { id: 2, from: 0, to: 3, cp1: { x: 220, y: 190 }, cp2: { x: 190, y: 230 }, length: 60 },
      { id: 3, from: 3, to: 0, cp1: { x: 190, y: 230 }, cp2: { x: 220, y: 190 }, length: 60 },

      // 4 & 5: Den Haag <-> Rotterdam
      { id: 4, from: 3, to: 2, cp1: { x: 180, y: 320 }, cp2: { x: 195, y: 360 }, length: 24 },
      { id: 5, from: 2, to: 3, cp1: { x: 195, y: 360 }, cp2: { x: 180, y: 320 }, length: 24 },

      // 6 & 7: Rotterdam <-> Utrecht
      { id: 6, from: 2, to: 1, cp1: { x: 260, y: 365 }, cp2: { x: 310, y: 330 }, length: 55 },
      { id: 7, from: 1, to: 2, cp1: { x: 310, y: 330 }, cp2: { x: 260, y: 365 }, length: 55 },

      // 8 & 9: Utrecht <-> Arnhem
      { id: 8, from: 1, to: 5, cp1: { x: 420, y: 305 }, cp2: { x: 480, y: 315 }, length: 58 },
      { id: 9, from: 5, to: 1, cp1: { x: 480, y: 315 }, cp2: { x: 420, y: 305 }, length: 58 },

      // 10 & 11: Utrecht <-> Eindhoven
      { id: 10, from: 1, to: 4, cp1: { x: 360, y: 380 }, cp2: { x: 375, y: 450 }, length: 82 },
      { id: 11, from: 4, to: 1, cp1: { x: 375, y: 450 }, cp2: { x: 360, y: 380 }, length: 82 },

      // 12 & 13: Arnhem <-> Zwolle
      { id: 12, from: 5, to: 6, cp1: { x: 510, y: 260 }, cp2: { x: 495, y: 225 }, length: 68 },
      { id: 13, from: 6, to: 5, cp1: { x: 495, y: 225 }, cp2: { x: 510, y: 260 }, length: 68 },

      // 14 & 15: Amsterdam <-> Zwolle (Hanzelijn via Almere/Lelystad)
      { id: 14, from: 0, to: 6, cp1: { x: 350, y: 150 }, cp2: { x: 420, y: 165 }, length: 90 },
      { id: 15, from: 6, to: 0, cp1: { x: 420, y: 165 }, cp2: { x: 350, y: 150 }, length: 90 },

      // 16 & 17: Zwolle <-> Groningen
      { id: 16, from: 6, to: 7, cp1: { x: 510, y: 150 }, cp2: { x: 540, y: 120 }, length: 105 },
      { id: 17, from: 7, to: 6, cp1: { x: 540, y: 120 }, cp2: { x: 510, y: 150 }, length: 105 }
    ];

    // Wissels (Junction switches)
    this.switches = [
      { id: 0, name: "Wissel Amsterdam Zuid (Ams/Utr/Gvc)", x: 260, y: 185 },
      { id: 1, name: "Wissel Utrecht Noord (Ut/Ah/Ehv)",    x: 365, y: 340 },
      { id: 2, name: "Wissel Gouda Aansluiting (Rtd/Ut)",    x: 270, y: 360 },
      { id: 3, name: "Wissel Zwolle Hanzelijn (Zl/Ams/Gn)",  x: 460, y: 185 }
    ];

    // Treintypes met metadata
    this.trainTypes = [
      { id: 0, name: "NS VIRM Intercity",     serie: "VIRM-IV",  color: "#ffc917", accent: "#003082", maxSpeed: 140, maxCap: 400 },
      { id: 1, name: "NS Sprinter Lighttrain", serie: "SLT-VI",   color: "#f0f2f5", accent: "#003082", maxSpeed: 120, maxCap: 260 },
      { id: 2, name: "DB Cargo Traxx",         serie: "BR 186",   color: "#e2001a", accent: "#333333", maxSpeed: 95,  maxCap: 0   },
      { id: 3, name: "Eurostar / Thalys",      serie: "PBA 4300", color: "#990022", accent: "#c0c0c0", maxSpeed: 160, maxCap: 350 }
    ];
  }

  async loadWasm(wasmUrl = './treinen.wasm') {
    try {
      const response = await fetch(wasmUrl);
      if (!response.ok) {
        throw new Error(`WASM fetch mislukt: ${response.status} ${response.statusText}`);
      }
      const bytes = await response.arrayBuffer();
      const wasmModule = await WebAssembly.instantiate(bytes, {});
      this.wasmInstance = wasmModule.instance;
      this.memory = this.wasmInstance.exports.memory;
      this.wasmInstance.exports.init_simulation();
      this.isLoaded = true;
      console.log('✅ Treinen WASM module geladen en geïnitialiseerd');
      return true;
    } catch (err) {
      console.error('Fout bij laden van Treinen WASM:', err);
      throw err;
    }
  }

  step(dtSeconds) {
    if (!this.isLoaded) return;
    this.wasmInstance.exports.step_simulation(dtSeconds);
  }

  getSimTime() {
    return this.isLoaded ? this.wasmInstance.exports.get_sim_time() : 0.0;
  }

  getTrainCount() {
    return this.isLoaded ? this.wasmInstance.exports.get_train_count() : 0;
  }

  getTrain(index) {
    if (!this.isLoaded) return null;
    const exp = this.wasmInstance.exports;
    const id = exp.get_train_id(index);
    const typeId = exp.get_train_type(index);
    const trackId = exp.get_train_track(index);
    const progress = exp.get_train_progress(index);
    const speed = exp.get_train_speed(index);
    const targetSpeed = exp.get_train_target_speed(index);
    const state = exp.get_train_state(index);
    const passengers = exp.get_train_passengers(index);
    const delay = exp.get_train_delay(index);
    const curStation = exp.get_train_current_station(index);
    const nextStation = exp.get_train_next_station(index);

    const typeMeta = this.trainTypes[typeId] || this.trainTypes[0];
    const pos = this.getPointOnTrack(trackId, progress);

    return {
      index,
      id,
      typeId,
      typeName: typeMeta.name,
      typeColor: typeMeta.color,
      typeAccent: typeMeta.accent,
      trackId,
      progress,
      speed,
      targetSpeed,
      state,
      stateName: ['Rijdend', 'Op station', 'Bij sein', 'Noodrem'][state] || 'Onbekend',
      passengers,
      delay,
      curStationName: this.stations[curStation]?.name || 'Onbekend',
      nextStationName: this.stations[nextStation]?.name || 'Onbekend',
      x: pos.x,
      y: pos.y,
      angle: pos.angle
    };
  }

  addTrain(trainType, startStation) {
    if (!this.isLoaded) return -1;
    return this.wasmInstance.exports.add_train(trainType, startStation);
  }

  toggleSwitch(switchId) {
    if (!this.isLoaded) return 0;
    return this.wasmInstance.exports.toggle_switch(switchId);
  }

  getSwitchState(switchId) {
    if (!this.isLoaded) return 0;
    return this.wasmInstance.exports.get_switch_state(switchId);
  }

  setEmergencyBrake(trainId, active) {
    if (!this.isLoaded) return 0;
    return this.wasmInstance.exports.set_emergency_brake(trainId, active ? 1 : 0);
  }

  getSignalState(signalId) {
    if (!this.isLoaded) return 2;
    return this.wasmInstance.exports.get_signal_state(signalId);
  }

  // Berekent de positie en rotatiehoek langs de spoorboog
  getPointOnTrack(trackId, progress) {
    const track = this.tracks[trackId] || this.tracks[0];
    const p0 = this.stations[track.from];
    const p3 = this.stations[track.to];
    const p1 = track.cp1;
    const p2 = track.cp2;

    const t = Math.max(0, Math.min(1, progress));
    const inv = 1 - t;

    // Cubic Bézier formule
    const x = Math.pow(inv, 3) * p0.x +
              3 * Math.pow(inv, 2) * t * p1.x +
              3 * inv * Math.pow(t, 2) * p2.x +
              Math.pow(t, 3) * p3.x;

    const y = Math.pow(inv, 3) * p0.y +
              3 * Math.pow(inv, 2) * t * p1.y +
              3 * inv * Math.pow(t, 2) * p2.y +
              Math.pow(t, 3) * p3.y;

    // Eerste afgeleide voor rijrichting / hoek
    const dx = -3 * Math.pow(inv, 2) * p0.x +
               3 * (Math.pow(inv, 2) - 2 * t * inv) * p1.x +
               3 * (2 * t * inv - Math.pow(t, 2)) * p2.x +
               3 * Math.pow(t, 2) * p3.x;

    const dy = -3 * Math.pow(inv, 2) * p0.y +
               3 * (Math.pow(inv, 2) - 2 * t * inv) * p1.y +
               3 * (2 * t * inv - Math.pow(t, 2)) * p2.y +
               3 * Math.pow(t, 2) * p3.y;

    const angle = Math.atan2(dy, dx);
    return { x, y, angle };
  }
}
