# The Road Knows

An interactive narrative web application retelling L. Frank Baum's *The Wonderful Wizard of Oz* from the perspective of the Yellow Brick Road itself.

![Project Banner](https://img.shields.io/badge/React-18.3.1-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.1.4-purple)

## 📖 About

This interactive slideshow explores infrastructure as sentient witness—a narrative experiment asking: *what if the path itself had a story?* Through 13 beautifully designed slides, users walk alongside Dorothy's journey while hearing the untold story of the Road that carried her.

**Created for:** English 95Q: The Many Wizards of Oz
**Format:** Linear interactive slideshow (~10-15 minute experience)
**Theme:** Infrastructure, witness, memory, complicity, and hope

## ✨ Features

- 🟡 **Interactive Yellow Brick Road Progress Indicator** - Clickable bricks to jump to any slide!
- 👧 **Traveling Character** - Dorothy moves along the road as you progress
- 🖱️ **Click-to-Jump Navigation** - Click any of the 13 bricks to jump directly to that slide
- 💬 **Hover Tooltips** - See slide numbers when hovering over bricks
- 📱 **Fully Responsive Design** - Beautiful on mobile, tablet, and desktop with auto-scroll
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate
- 💾 **Progress Saving** - Returns you to where you left off
- 🎨 **Artistic Storybook Design** - Sepia tones, elegant typography, warm aesthetics
- ♿ **Accessible** - Screen reader support, semantic HTML, ARIA labels

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project directory
cd the-road-knows

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
the-road-knows/
├── public/
│   └── assets/
│       ├── slide-backgrounds/    # Background images for each slide
│       └── characters/            # Optional character images
├── src/
│   ├── components/
│   │   ├── Layout.jsx            # Main layout wrapper
│   │   ├── Slide.jsx             # Individual slide component
│   │   ├── ProgressBar.jsx       # Yellow brick road progress
│   │   └── Navigation.jsx        # Navigation buttons
│   ├── data/
│   │   └── slides.js             # All 13 slides of content
│   ├── App.jsx                   # Main application
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration
└── vercel.json                   # Vercel deployment config
```

## 🎨 Design Specifications

### Color Palette

- **Yellow Brick**: `#FFD700`
- **Sepia Background**: `#F4EFE4`
- **Parchment**: `#FFF8DC`
- **Emerald Green**: `#50C878`
- **Text Primary**: `#2C1810`

### Typography

- **Titles**: Cinzel (Google Fonts)
- **Narration**: Libre Baskerville (Google Fonts)

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts to deploy. Your site will be live at a `.vercel.app` URL.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## 📝 Content

The application contains 13 slides:

1. **Title / Introduction** - "I am a brick. One of millions..."
2. **The First Brick** - Creation and labor
3. **Early Travelers** - First footsteps and unknown endings
4. **The Weight of Boots** - Labor migration and economic exploitation
5. **The Soldiers** - Surveillance and control
6. **A Child's Footprints** - The burden of witness
7. **The Cyclone** - Dorothy's arrival
8. **The Fellowship Forms** - Scarecrow, Tin Man, and Lion
9. **Approaching the Emerald City** - Spectacle and illusion
10. **The Unmasking** - Truth and power
11. **The Departure** - Goodbyes and cycles
12. **Epilogue** - "I am the Road"
13. **Credits** - Artist's statement and bibliography

## 🎯 Usage

### Navigation

- **🖱️ Click Any Brick**: Jump directly to any of the 13 slides by clicking on the numbered bricks
- **👧 Follow Dorothy**: Watch the character icon travel along the road as you progress
- **💬 Hover for Info**: Hover over any brick to see which slide it represents
- **Next/Previous Buttons**: Click to navigate between slides sequentially
- **Keyboard**: Use `←` and `→` arrow keys for sequential navigation
- **Mobile Swipe**: On mobile, swipe the brick road horizontally to see all slides
- **Progress**: Your progress is automatically saved
- **Return**: Click "Return to Start" on the final slide

> **New!** The yellow brick road is now fully interactive. Click any brick to jump to that part of the story. No need to go through slides sequentially!

### Adding Images

1. Create or source images matching the descriptions in `/public/assets/slide-backgrounds/README.md`
2. Save them with the exact filenames specified (e.g., `slide1-single-brick.png`)
3. Place them in the `/public/assets/slide-backgrounds/` directory
4. The app will automatically use them instead of placeholders

**Note**: The app displays beautiful CSS gradient placeholders if images are not present, so images are optional for functionality.

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Google Fonts** - Cinzel and Libre Baskerville
- **LocalStorage API** - Progress persistence

## 📚 Academic Context

This project engages with:

- **Primary Sources**: Baum's *The Wonderful Wizard of Oz* (1900), Maguire's *Wicked* (1995), MGM's *The Wizard of Oz* (1939)
- **Secondary Sources**: Littlefield's populist reading, Larkin's infrastructure theory, McClintock's work on surveillance

The narrative explores infrastructure as witness, examining the Road's dual role as both tool of connection and instrument of control.

## ⚡ Performance

- Lightweight bundle size
- Optimized for fast loading
- Smooth transitions and animations
- Responsive on all devices

## 🐛 Troubleshooting

### Fonts not loading
Ensure you have an internet connection. Fonts are loaded from Google Fonts CDN.

### Progress not saving
Check browser localStorage is enabled. Some privacy modes disable this feature.

### Blank slides
This is normal if image files aren't present. CSS placeholders will display instead.

## 📄 License

This is an academic project for English 95Q. Content and implementation by [Your Name].

## 🙏 Acknowledgments

- L. Frank Baum for the original story
- Professor [Name] for English 95Q
- The infrastructure studies scholars cited in the artist's statement

---

**Built with ❤️ for English 95Q**

*"I am infrastructure. I am history made physical. I am the path beneath your feet and the story you don't see."* - The Yellow Brick Road
