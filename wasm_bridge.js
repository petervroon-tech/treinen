// Treinen WebAssembly Bridge voor Live Telemetrie & Punctualiteit

export class TreinenWasmBridge {
  constructor() {
    this.wasmInstance = null;
    this.isLoaded = false;
  }

  async loadWasm(wasmUrl = './treinen.wasm') {
    try {
      const response = await fetch(wasmUrl);
      if (!response.ok) {
        throw new Error(`WASM download mislukt: ${response.status}`);
      }
      const bytes = await response.arrayBuffer();
      const wasmModule = await WebAssembly.instantiate(bytes, {});
      this.wasmInstance = wasmModule.instance;
      this.wasmInstance.exports.init_engine();
      this.isLoaded = true;
      console.log('✅ Treinen WASM telemetrie engine actief');
      return true;
    } catch (err) {
      console.warn('WASM fallback geactiveerd:', err);
      this.isLoaded = false;
      return false;
    }
  }

  // 0 = Op tijd (groen), 1 = Kleine vertraging / afremmend (geel), 2 = Grote vertraging / stilstaand (rood)
  calculatePunctuality(speedKmh, delaySeconds = 0) {
    if (this.isLoaded && this.wasmInstance.exports.calculate_punctuality) {
      return this.wasmInstance.exports.calculate_punctuality(speedKmh, delaySeconds);
    }
    if (delaySeconds > 300) return 2;
    if (delaySeconds > 60 || speedKmh < 1.0) return 1;
    return 0;
  }

  // 0: Op tijd, 1: Vertraagd, 2: Pech / Gestrand / Defect
  classifyStatus(speedKmh, delayMin = 0, isPechFlag = 0) {
    if (this.isLoaded && this.wasmInstance.exports.classify_status) {
      return this.wasmInstance.exports.classify_status(speedKmh, delayMin, isPechFlag);
    }
    if (isPechFlag !== 0 || delayMin >= 10) return 2;
    if (delayMin >= 3 || (speedKmh < 1.0 && delayMin >= 1)) return 1;
    return 0;
  }

  // 0: Stilstaand (0-5 km/u), 1: Langzaam (5-50), 2: Normaal (50-135), 3: Snel / HSL (>135)
  getSpeedCategory(speedKmh) {
    if (this.isLoaded) {
      return this.wasmInstance.exports.get_speed_category(speedKmh);
    }
    if (speedKmh >= 135) return 3;
    if (speedKmh >= 50) return 2;
    if (speedKmh >= 5) return 1;
    return 0;
  }

  interpolate(start, end, t) {
    if (this.isLoaded) {
      return this.wasmInstance.exports.interpolate_coord(start, end, t);
    }
    return start + (end - start) * t;
  }
}
