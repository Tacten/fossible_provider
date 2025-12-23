# React Scaffold

A modern, production-ready React scaffolding project built for speed and scalability, featuring a polished "Linear-like" application layout and robust state management.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)

## 📦 Features

- **App Layout:** A responsive "Linear-like" structure with a fixed sidebar and scrollable main content area.
- **State Management:** 
  - Global state using **Zustand**.
  - Persistent storage using **IndexedDB** (via `idb-keyval`) for handling complex data structures > 5MB.
  - Integrated with Redux DevTools for easy debugging.
- **Component Library:** Pre-configured with essential shadcn/ui components:
  - Button, Command, Dialog, Dropdown Menu, Popover, Separator, Sheet, Sonner, Tabs.
- **Interactive UI:** 
  - Smooth animations using `tw-animate-css`.
  - Functional "New Issue" modal using `Dialog` primitives.
- **Design System:** Fine-tuned CSS variables for a premium look (Light mode default).
- **Utilities:** `clsx` and `tailwind-merge` for efficient class name management.
- **Alias:** `@` configured to resolve to `./src`.

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

### Build

Build the application for production:

```bash
npm run build
```

### Linting

Run ESLint:

```bash
npm run lint
```

## 📂 Project Structure

- `src/components/layout`: Application shell components (Sidebar, AppLayout).
- `src/components/ui`: Reusable shadcn/ui primitive components.
- `src/store`: Global state stores (Zustand).
- `src/lib`: Utility functions.
- `src/App.tsx`: Main application entry and routing.
- `src/index.css`: Global design tokens and Tailwind directives.
