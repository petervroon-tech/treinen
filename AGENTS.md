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

## 2. Real-time Beweging & Animatie
- Treinen en bewegende objecten bewegen altijd vloeiend (60 FPS continue interpolatie/dead-reckoning).
- Geen schokken, haperingen of plotselinge sprongen bij binnenkomende telemetrie-updates.
- Toon altijd duidelijke richtingaanduidingen (zowel voorwaarts als tegemoetkomend/tegentreinen).
