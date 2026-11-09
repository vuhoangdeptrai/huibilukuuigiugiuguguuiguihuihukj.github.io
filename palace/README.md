# Buckingham Palace 3D & Royal Tourist Guide

An interactive 3D WebGL architectural recreation of **Buckingham Palace**, the **Queen Victoria Memorial**, and the **Forecourt & Changing of the Guard**, engineered with the **3D Web Experience Architecture**.

---

## 🏛️ What's New & Upgraded

### 1. 3D Web Experience Performance & Architecture
* **InstancedMesh Batching**: Repeated architectural elements (forecourt spear railings, rooftop urns, Victorian street lamps, columns) are batched using `THREE.InstancedMesh`. This dramatically reduces draw calls and ensures smooth 60 FPS performance on both desktop and mobile devices.
* **Mobile DPR Optimization & Capping**: Automatically detects mobile devices and limits the Device Pixel Ratio to 1.0 (with shadow map budget adjustments) to prevent GPU thermal throttling and preserve battery life.
* **3D Performance Quality Modes**: Choose between **High** (full soft shadows and anti-aliasing), **Balanced** (standard lighting), and **Eco** (battery-saving mode).
* **WebGL Fallback Protection**: Graceful detection of WebGL hardware acceleration; if unavailable, visitors receive an elegant fallback card and full access to all tourist guides and photos.
* **OrbitControls Scroll Protection**: Prevents 3D camera controls from capturing mouse wheel scrolling when reading the tourist guide sections.

### 2. Visual & Architectural Splendour
* **Dynamic Water Ripple Shader**: The 39-acre palace lake and Queen Victoria Memorial fountain basins feature animated vertex ripple physics and specular highlights.
* **Fountain Water Spray Particle Physics**: Real-time particle fountain system spraying upward and splashing into the marble basins around the Victoria Memorial.
* **Gala Night Celebratory Embers**: Toggling into **Gala Night** activates golden embers rising into the starlit sky above the illuminated Portland stone facade.
* **3D Royal Compass Rose**: A real-time brass and gold compass rose in the HUD tracks your camera angle and displays cardinal orientation (*"Facing East down The Mall"*, *"Facing Palace East Front"*, etc.).
* **Cinematic Guided Royal Tour**: An autoplay flythrough mode that guides you through 6 curated stops (The Mall & Victoria Memorial, Changing of the Guard, The Balcony, Sovereign Flagpole, State Rooms, and Gardens) with contextual narrative cards.

### 3. Audio Synthesizer (Native Web Audio API)
* **Big Ben Westminster Quarters**: Synthesized historic chimes.
* **Ceremonial Fanfare**: Royal brass fanfare arpeggios.
* **Regimental Snare Drums**: Marching cadence at 110 BPM.
* **London Park Ambiance**: Gentle summer breeze and birdsong.

---

## 🚀 How to Open
Double-click [**`index.html`**](file:///C:/Users/Windows/Documents/palace/index.html) to launch the experience in any modern web browser.
