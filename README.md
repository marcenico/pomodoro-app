# The Pomodoro Technique

A clean, responsive, and feature-rich Pomodoro Timer web application built with React. Designed to help you stay focused and productive using the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

**[Live Demo](https://the-pomodoro-technique.netlify.app/)**

## Features

### Timer

- **Three cycle types** — Pomodoro (work), Short Break, and Long Break
- **Automatic cycle progression** — After 4 pomodoros, a long break is triggered automatically
- **Precise timing** — Uses timestamp-based calculation (`Date.now()`) for accuracy, even across tab switches or browser throttling
- **Controls** — Start, Pause, Stop, Refresh, and Reset actions

### Preset & Custom Sessions

| Session          | Pomodoro | Short Break | Long Break |
| ---------------- | -------- | ----------- | ---------- |
| Light Focus      | 15 min   | 5 min       | 10 min     |
| Classic Pomodoro | 25 min   | 5 min       | 15 min     |
| Deep Work        | 40 min   | 10 min      | 20 min     |
| Full Sprint      | 60 min   | 12 min      | 25 min     |
| **Custom**       | 1–60 min | 1–30 min    | 1–60 min   |

### Auto-Start

- Independent toggles for Pomodoros and Breaks
- Seamless transitions between cycles when enabled

### Notifications & Sound

- **Browser notifications** on session completion with contextual messages and emojis
- **Audio feedback** via Web Audio API — unique chord progressions for each cycle type
- Mobile-friendly audio initialization (iOS gesture handling)

### Visual Feedback

- **Dynamic favicon** — circular progress ring that updates in real-time; changes color per cycle and shows a pause indicator
- **Dynamic document title** — displays remaining time, cycle emoji, and session status

### Theming

- **Three color palettes** that change automatically based on the current cycle:
  - Blue (Pomodoro) · Green (Short Break) · Dark Green (Long Break)
- Smooth CSS transitions between themes

### Persistence

- Timer state, selected session, custom configuration, and auto-start settings are saved to `localStorage`
- Graceful recovery from corrupted data

---

## Tech Stack

| Technology                                                                              | Purpose                 |
| --------------------------------------------------------------------------------------- | ----------------------- |
| [React 18](https://react.dev/)                                                          | UI library              |
| [Vite 5](https://vitejs.dev/)                                                           | Build tool & dev server |
| [CSS Modules](https://github.com/css-modules/css-modules)                               | Scoped component styles |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)         | Sound generation        |
| [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) | Browser notifications   |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/marcenico/pomodoro-app.git

# Navigate to the project directory
cd pomodoro-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

## Architecture Highlights

- **Custom Hooks Pattern** — All logic is encapsulated in reusable hooks, keeping components focused on presentation
- **Timestamp-based Timer** — Uses `Date.now()` instead of decrementing counters for accuracy across tab switches and browser sleep
- **Performance Optimized** — `React.memo`, `useMemo`, `useCallback`, and 100ms throttled updates
- **Zero External Dependencies** — Only React and React DOM as runtime dependencies; no state management libraries
- **Progressive Enhancement** — Graceful degradation for notifications, audio, and CSS features
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation (Escape to close menu), and proper focus management
- **Responsive** — Fluid typography and layout adapting from mobile (385px+) to desktop (1440px+)
- **Path Aliases** — Clean imports via `@components`, `@hooks`, `@data`, `@contexts`

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built by [marcenico](https://marcenico.com)**
