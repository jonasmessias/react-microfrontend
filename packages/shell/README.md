# Shell - Container Application

Host application for Module Federation architecture.

## Development & Production

Uses **Webpack** for both development and production with Module Federation:

```bash
npm run dev       # Webpack dev server with HMR (port 3000)
npm run build     # Webpack production build
npm run preview   # Preview production build
```

## Architecture

- **Dev**: Webpack with Module Federation + HMR
- **Prod**: Webpack with Module Federation optimized build
- **Remotes**: Dynamically loads mfe-products (3001) and mfe-cart (3002)

## Tech Stack

- React 18.3
- TypeScript 5.2
- Tailwind CSS 3.4
- Webpack 5 (Module Federation)
- Zustand (shared state)

## Module Federation

Configured to consume:

- `mfeProducts@http://localhost:3001/remoteEntry.js`
- `mfeCart@http://localhost:3002/remoteEntry.js`

Shared dependencies:

- React (singleton)
- React-DOM (singleton)
- Zustand (singleton)
