# Antigravity Project Richtlijnen & UI Voorkeuren

Deze richtlijnen gelden voor alle huidige en toekomstige aanpassingen en applicaties in deze repository.

## 1. UI & Design Standaard: "Smooth, Donker & Nooit Lomp of Wit Vierkant"
- **Geen grote witte of vierkante blokken:** Gebruik nooit standaard witte vierkante tooltips, popups of lompe kaders die de kaart of satellietbeelden blokkeren.
- **Altijd "smooth" en afgerond:**
  - Badges, labels en tooltips hebben altijd afgeronde pil-vormen (`border-radius: 999px` of subtiel afgeronde hoeken `10px - 16px`).
  - Gebruik donkere glas-esthetiek (glassmorphism met `rgba(9, 14, 26, 0.88)` tot `0.94`, `backdrop-filter: blur()`, subtiele borders).
- **Smartphone-optimalisatie:**
  - Op mobiel (schermen $\le$ 680px) moeten labels en knoppen compact, strak en subtiel zijn (`0.64rem - 0.72rem`).
  - Kaartoverlays mogen het zicht op de satellietsporen, wissels en treinen nooit onnodig bedekken.
  - Vaste elementen moeten vloeiend meeschalen zonder overflow of afsnijding.

## 2. Real-time Beweging, Animatie & Telemetrie
- Treinen en bewegende objecten bewegen altijd vloeiend (60 FPS continue interpolatie/dead-reckoning).
- Geen schokken, haperingen of plotselinge sprongen bij binnenkomende telemetrie-updates.
- Toon altijd duidelijke richtingaanduidingen (zowel voorwaarts als tegemoetkomend/tegentreinen).
- **Nooit 0 km/u bij rijdende treinen:** Rijdende treinen op het open baanvak mogen NOOIT op 0 km/u of 'Stilstaand' blijven staan. Als een bronfeed (zoals bij Arriva, Blauwnet, Keolis of regionale vervoerders) geen expliciete `@ km/h` string doorgeeft, moet de snelheid altijd automatisch berekend worden via opeenvolgende GPS-deltaposities of realistische baansnelheid op het baanvak.
- Treinen die daadwerkelijk stilstaan op een station (< 400m van het perron) tonen 0 km/u ('Halterend').

## 3. Helpfile & Documentatie Standaard
- Bouw in elke applicatie altijd een direct toegankelijke Help-modal (`💡 Help`) zoals in `vroonphoto`.
- De featurelijst in de Help-modal moet dynamisch gesynchroniseerd zijn met `version.json` via het build-script (`build.py`), zodat de documentatie na elke build automatisch 100% actueel is met een `✓ Altijd Actueel` badge.

## 4. Deployment & GitHub Online Standaard: Alleen Online via GitHub
- **Niet meer lokaal, alleen online via GitHub:** Alle huidige en nieuw te bouwen apps worden niet meer lokaal gedraaid of getest, maar direct en exclusief online gepubliceerd via GitHub (GitHub Pages en GitHub Actions CI/CD).
- **Directe automatische uitrol:** Elke wijziging wordt direct vastgelegd in Git en gepusht naar de `main` branch op GitHub, waarna de online build-pipeline (`.github/workflows/deploy.yml`) de nieuwste versie direct live zet.
- **Live online URL's:** De gebruiker gebruikt en opent apps altijd direct via de online GitHub Pages URL (bv. `https://petervroon-tech.github.io/treinen/`), nooit via lokale `localhost` poorten.
- **Automatische live update:** Apps controleren via `version.json` periodiek of er online op GitHub een nieuwere build beschikbaar is en verversen direct automatisch zonder dat de gebruiker lokaal iets hoeft te doen.

## 5. Volledige Responsiviteit & Proporties (Laptops, iPads & Smartphones)
- **Laptops & Desktops ($\ge$ 1024px):**
  - Standaard optimale side-by-side (split) indeling: links het compacte controle- of stationspaneel (`clamp(380px, 30vw, 460px)`), rechts het interactieve werkgebied of de satellietkaart (`flex: 1`).
  - Geen onnodig verborgen kaarten of panelen op brede schermen. Volledig scherm voor kaart of lijst blijft beschikbaar met 1 klik op de wisselknop (`🛰️ Alleen Kaart` / `📋 Treinen`).
  - Zwevende HUD's en statusbalken zweven elegant gecentreerd boven de onderbalk met veilige marges, nooit half van het scherm afgekapt.
- **iPads & Tablets (681px - 1023px):**
  - Optimale verhoudingen in zowel **portrait** als **landscape**.
  - De header schakelt bij schermen $\le$ 1100px soepel om naar een 2-laags indeling (boven: merk + trajectkiezer; onder: bedieningsknoppen) zodat alle 10 actieknoppen comfortabel bereikbaar blijven zonder te worden samengedrukt of buiten het scherm te vallen.
  - Vloeiend horizontaal scrollen (`-webkit-overflow-scrolling: touch`) zonder storende scrollbars voor knoppenstroken.
- **Smartphones ($\le$ 680px):**
  - Schermvullende weergave (100% per actieve modus) met snelle 1-tap wisselknop.
  - Modals schakelen automatisch over naar touch-vriendelijke bottom sheets met veilige marges (`env(safe-area-inset-bottom)`).
  - Geen enkele horizontale overflow of afgekipte popups; knoppen en lettergroottes schalen strak mee (`0.65rem - 0.78rem`).




