# Shell - Container Application

Host application for Module Federation architecture.

## Development

Uses **Vite** for fast development with HMR:

```bash
npm run dev          # Vite dev server (port 3000)
npm run dev:webpack  # Webpack dev server (fallback)
```

## Production Build

Uses **Webpack** for Module Federation production build:

```bash
npm run build        # Webpack production build with Module Federation
npm run preview      # Preview production build
```

## Architecture

- **Dev**: Vite (fast HMR, instant server start)
- **Prod**: Webpack (Module Federation support)
- **Remotes**: Loads mfe-products and mfe-cart dynamically

## Tech Stack

- React 18.3
- TypeScript 5.2
- Tailwind CSS 3.4
- Vite 7 (dev) + Webpack 5 (prod)
- Module Federation
