# MicroShop - Microfrontend Architecture Showcase

![CI](https://github.com/jonasmessias/microfrontend/actions/workflows/ci.yml/badge.svg)

## 🌐 Live Demo

### 🏠 Complete Application (Integrated)

� **[https://jonasmessias.github.io/react-microfrontend/](https://jonasmessias.github.io/react-microfrontend/)**

The main application showcasing the complete microfrontend architecture with Shell, Products, and Cart working together seamlessly.

### 🛍️ Standalone Microfrontends

Each microfrontend can also run independently:

- **Products MFE**: [https://jonasmessias.github.io/react-microfrontend/products/](https://jonasmessias.github.io/react-microfrontend/products/)
- **Cart MFE**: [https://jonasmessias.github.io/react-microfrontend/cart/](https://jonasmessias.github.io/react-microfrontend/cart/)

---

A practical demonstration of **microfrontend architecture** applied to an e-commerce scenario, implemented with **Webpack Module Federation** and **React 18**.

## About the Project

This is a **technical showcase** demonstrating the implementation of microfrontends in a real-world e-commerce context. The goal is to illustrate how different teams can develop and deploy features independently while maintaining a seamless user experience.

**Key concepts demonstrated:**

- Module Federation for runtime code sharing
- Independent development and deployment of each microfrontend
- Shared state between applications via Zustand
- Decoupled communication via EventBus (CustomEvents)

## Architecture

### Monorepo Structure
