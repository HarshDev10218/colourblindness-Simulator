# 🎨 Color Vision Deficiency Simulator

A modern, interactive web application that simulates how images appear to people with different types of **Color Vision Deficiency (Color Blindness)**. Upload an image, compare normal and simulated views in real time, and download the processed preview.

Built with **HTML5**, **CSS3**, and **Vanilla JavaScript** using SVG color matrix filters for fast, browser-based image processing. :contentReference[oaicite:0]{index=0}

---

## ✨ Features

- 🖼️ Upload images using Drag & Drop or File Browser
- 🎨 Simulates multiple color vision deficiencies:
  - Normal Vision
  - Protanopia (Red Blind)
  - Deuteranopia (Green Blind)
  - Tritanopia (Blue Blind)
  - Achromatopsia (Total Color Blindness)
- ⚖️ Interactive Split Slider comparison
- 🪟 Side-by-Side comparison mode
- 🔍 Adjustable Zoom (100%–300%)
- 📥 Download simulated image
- 📱 Responsive interface
- 📊 Displays image resolution and file size
- ⚠️ File validation (supports PNG, JPG, WebP up to 5MB)
- 🔔 Toast notifications for errors and status updates
- ⌨️ Keyboard shortcuts (1–5) for quick simulation switching

---

## 📸 Screenshots

Create a folder named **screenshots** inside your project.

```
Color-Vision-Deficiency-Simulator/
│
├── screenshots/
│   ├── home.png
│   ├── upload.png
│   ├── split-view.png
│   ├── side-view.png
│   └── protanopia.png
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

Then display them like this:

### Home Screen

```markdown
![Home](screenshots/home.png)
```

### Upload Image

```markdown
![Upload](screenshots/upload.png)
```

### Split Comparison

```markdown
![Split](screenshots/split-view.png)
```

### Side-by-Side Mode

```markdown
![Side by Side](screenshots/side-view.png)
```

### Protanopia Simulation

```markdown
![Protanopia](screenshots/protanopia.png)
```

---

## 🚀 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- SVG Color Matrix Filters
- FileReader API
- Canvas API

---

## 📂 Project Structure

```
Color-Vision-Deficiency-Simulator/
│
├── index.html
├── styles.css
├── app.js
├── README.md
└── screenshots/
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/Color-Vision-Deficiency-Simulator.git
```

Navigate to the project folder:

```bash
cd Color-Vision-Deficiency-Simulator
```

Open **index.html** in your browser

or

Run using **VS Code Live Server**.

---

## 🖥️ How to Use

1. Upload an image by dragging and dropping or selecting one from your computer.
2. Choose a color vision mode.
3. Compare the original and simulated image.
4. Switch between:
   - Split Slider
   - Side-by-Side View
5. Zoom in or out.
6. Download the simulated preview.
7. Reset the workspace whenever needed.

---

## 🎨 Available Simulation Modes

| Mode | Description |
|------|-------------|
| Normal Vision | Original image |
| Protanopia | Red color blindness |
| Deuteranopia | Green color blindness |
| Tritanopia | Blue color blindness |
| Achromatopsia | Complete monochrome vision |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 1 | Normal Vision |
| 2 | Protanopia |
| 3 | Deuteranopia |
| 4 | Tritanopia |
| 5 | Achromatopsia |

---

## 📦 Core Features

- Drag & Drop image upload
- Image metadata display
- Interactive comparison slider
- Side-by-side comparison mode
- Zoom controls
- Download processed image
- Responsive layout
- Toast notification system
- Keyboard accessibility

---

## 🌟 Future Improvements

- Support for multiple image formats
- Side-by-side image download
- Before/After GIF export
- Brightness & contrast controls
- Custom simulation intensity
- Mobile gesture support
- Image history
- Batch image processing
- Dark/Light theme switch

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Harshith Dupam**

---

## ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub!
