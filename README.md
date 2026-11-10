# 🚆 &lt;treinen&gt; - Cross-Platform WebAssembly Spoorwegnetwerk

Een interactieve, real-time spoorwegsimulatie van het Nederlandse spoornetwerk, aangedreven door **WebAssembly (WASM)**.

De simulatie-engine draait in WebAssembly met lineair gedeeld geheugen voor 60 FPS prestaties in elke moderne browser (desktop & mobiel op macOS, Windows, Linux, iOS en Android), inclusief automatische versieherkenning, een GitHub Pages deploy workflow en automatische Git push hooks.

---

## 🌟 Belangrijkste Functionaliteiten

1. **Cross-Platform WebAssembly Engine (`treinen.wasm`)**:
   - Geheugenbeheer en simulatie-logica (treindynamica, versnelling, remcurves, stationsstops, seinbeveiliging en wisselstanden) draaien in WASM.
   - Bevat representaties van Nederlandse treintypes:
     - 🟡 **NS VIRM Intercity** (Dubbeldekker, geel/blauw, 140 km/u)
     - ⚪ **NS Sprinter SLT** (Wit/blauw, snelle acceleratie, 120 km/u)
     - 🔴 **DB Cargo Traxx** (Goederentrein, zwaar materieel, 95 km/u)
     - 🍷 **Eurostar / Thalys** (Hogesnelheidstrein, 160 km/u)
   - Nederlands spoornetwerk met de hoofdstations: Amsterdam Centraal, Utrecht Centraal, Rotterdam Centraal, Den Haag Centraal, Eindhoven Centraal, Arnhem Centraal, Zwolle en Groningen.

2. **Automatische Versieherkenning in de Browser**:
   - Zodra er een nieuwe commit of build wordt gedeployed (lokaal of op GitHub Pages), detecteert de applicatie dit automatisch:
     - Direct bij het laden via `version.json` met `cache: no-store`.
     - Periodiek elke 30 seconden op de achtergrond.
     - Direct wanneer de gebruiker terugkeert naar het browsertabblad (`visibilitychange`).
     - Via de geïntegreerde **Service Worker** (`sw.js`).
   - Er verschijnt direct een banner in beeld:
     > 🔔 **Nieuwe versie beschikbaar!** Versie `v1.0.X` (commit `abc1234`) is zojuist gepubliceerd.  
     > Met een knop **[🚀 Direct Bijwerken & Herladen]** die automatisch de cache wist en herlaadt.

3. **Automatische GitHub Pages Deployment (`.github/workflows/deploy.yml`)**:
   - Volledig geconfigureerde GitHub Actions workflow.
   - Wordt automatisch geactiveerd bij elke push naar `main` of `master`.
   - Bouwt de WebAssembly binary, injecteert automatisch het Git commit-hash en buildtijd in `version.json`, en publiceert direct naar GitHub Pages via de officiële GitHub Pages actions.

4. **Automatische Git Push na Commit (`.githooks/post-commit`)**:
   - Geconfigureerde Git `post-commit` hook.
   - Zodra je `git commit` uitvoert, detecteert de hook de actieve branch en voert automatisch `git push` uit naar je geconfigureerde remote (`origin`).
   - Indien er nog geen remote is gekoppeld, geeft de hook duidelijke instructies hoe je je GitHub repository kunt koppelen.

---

## 🚀 Snel Starten (Lokaal Uitvoeren)

### 1. Start de Lokale Webserver
Je kunt de webapplicatie direct openen met Python's ingebouwde webserver:

```bash
# Start de server in de public map
python3 -m http.server 8000 --directory public
```

Open vervolgens je browser op:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🖥️ WASM Uitvoeren via de Terminal (CLI)

Omdat de WebAssembly module cross-platform en stand-alone is, kun je deze ook buiten de browser testen en inspecteren via de meegeleverde CLI runner:

```bash
python3 tools/run_cli.py
```

Voorbeeld output:
```text
🚂 Treinen WebAssembly CLI Runner
   WASM bestand: public/treinen.wasm (2076 bytes)

=== Treinen Simulatie Geïnitialiseerd ===
Actieve treinen: 4
- Trein #101: NS VIRM Intercity op spoor 0, snelheid: 130 km/u, reizigers: 312
- Trein #102: NS Sprinter SLT op spoor 2, snelheid: 110 km/u, reizigers: 145
- Trein #103: Eurostar / Thalys op spoor 10, snelheid: 150 km/u, reizigers: 280
- Trein #104: DB Cargo Traxx op spoor 16, snelheid: 90 km/u, reizigers: 0

>>> Simulatiestap van 2.0 seconden uitvoeren in WebAssembly...
Simulatietijd na stap: 2 seconden
Trein 101 nieuwe snelheid: 140 km/u, voortgang: 0.2400
```

---

## 📦 WebAssembly Herbouwen

### Via de Standalone Builder (zonder externe dependencies)
```bash
python3 tools/build_wasm.py
```

### Via Rust (optioneel, indien Rust/wasm-pack geïnstalleerd is)
De broncode van de simulatie is ook beschikbaar in `src/lib.rs` en `Cargo.toml`:
```bash
wasm-pack build --target web --release
```

---

## 🔄 Automatische Git Push Configureren

Het project bevat reeds het bestand `.githooks/post-commit`. Om automatisch naar je GitHub repository te pushen na elke commit:

1. Koppel je GitHub repository (als je dit nog niet had gedaan):
   ```bash
   git remote add origin https://github.com/<jouw-gebruikersnaam>/treinen.git
   ```

2. Vanaf dat moment zal elke `git commit` automatisch direct pushen:
   ```bash
   git add .
   git commit -m "Update seinen en dienstregeling"
   # Output:
   # 🚂 [treinen] Automatisch pushen naar origin/main...
   # ✅ [treinen] Automatische push succesvol voltooid!
   ```

*(Tip: wil je een commit maken zonder automatisch te pushen, voer dan `TREINEN_NO_AUTOPUSH=1 git commit -m "..."` uit).*

---

## 🌐 GitHub Pages Deployment Activeren

1. Push deze repository naar GitHub.
2. Ga op GitHub naar: **Settings** ➔ **Pages**.
3. Selecteer bij **Build and deployment** onder **Source**: **GitHub Actions**.
4. De workflow in `.github/workflows/deploy.yml` zal nu automatisch starten bij elke commit en je applicatie live zetten op `https://<jouw-gebruikersnaam>.github.io/treinen/`.

---

## 🎮 Besturing in de Applicatie

- **Wissel omleggen**: Klik direct op een wissel (groene/oranje cirkel op de kaart) om de wisselstand te wisselen tussen rechtdoor en afbuigend.
- **Trein inspecteren**: Klik op een wisselende trein om live snelheid, reizigersaantallen en bestemming te zien.
- **Noodrem**: Druk in het inspectiepaneel op "Noodrem" om de trein direct tot stilstand te dwingen.
- **Trein toevoegen**: Gebruik de toolbarknoppen (`+ VIRM`, `+ Sprinter`, `+ Eurostar`, `+ Goederen`) om extra treinen in te passen in de dienstregeling.
- **Snelheid**: Pas de simulatiesnelheid aan naar 1x, 2x of 5x.
- **Dag / Nacht**: Schakel naar nachtmodus voor verlichte rijtuigen en koplampen.
- **Geluid**: Geniet van de authentieke NS stationsgong en dubbeltonige tyfoongeluiden via de Web Audio API.
