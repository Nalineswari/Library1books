# Lumina Library - 3D Circular Orbit & Interactive Book Showcase

An interactive 3D digital library experience built with **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript** (ES6+), featuring 3D circular spatial arrangements, mouse-driven rotation, and 360-degree book inspection.

---

## 🌟 What's New: 3D Circular Orbit & 360° Spin Features

1. **Circular 3D Cylinder / Orbit Arrangement**:
   - Books are arranged in a 3D circle in virtual space using CSS 3D transforms (`rotateY` & `translateZ`).
   - True 3D geometry: each book features a hardcover front face, textured leather spine with vertical embossed title, back cover with synopsis & barcode, and paper-lined edge blocks.

2. **Mouse-Driven Rotation (Rotate One by One)**:
   - Moving your mouse left and right across the stage smoothly rotates the ring of books in 3D space.
   - Smooth physics with linear interpolation (`requestAnimationFrame` lerp) and inertial drag support for touchscreens and mice.

3. **360° Book Spin**:
   - Touching, hovering, or clicking any specific book brings it to center and triggers a full **360-degree 3D spin** animation.
   - Highlights the book's front cover, spine, back, and paper depth.

4. **Interactive 3D Book Inspector**:
   - Click **"3D Inspector"** on any book to enter free-orbit mode.
   - Drag anywhere to freely rotate the book in 3D space on both X and Y axes.
   - Click **"Open Cover"** to swing open the front cover (`rotateY(-130deg)`) and read the first chapter excerpt!

5. **Display View Switcher**:
   - **🪐 3D Circular Orbit**: The interactive 3D rotating circle.
   - **📚 Standard Grid Catalog**: Classic library shelf with genre filters, live search, and sorting.

---

## 🚀 How to Run

1. Open File Explorer to:
   `C:\Users\lenovo\.gemini\antigravity\scratch\library-hub`
2. Double-click **[`index.html`](file:///C:/Users/lenovo/.gemini/antigravity/scratch/library-hub/index.html)** in any browser (Chrome, Edge, Firefox, Brave).
3. Move your mouse over the 3D circle to watch the books rotate one by one, and click any book to watch it spin 360 degrees!

---

## 📁 File Structure

```
library-hub/
├── index.html     # 3D stage, orbit controls, spotlight card, grid, and inspector modal
├── styles.css     # 3D cylinder calculations, 360° keyframes, spine lighting & paper textures
├── app.js         # Math for radial positioning, lerp rotation loop, 360° spin, and 3D orbit
└── README.md      # Documentation and quickstart guide
```
