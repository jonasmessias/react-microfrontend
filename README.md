# MicroShop - Microfrontend Architecture Showcase

![CI](https://github.com/jonasmessias/microfrontend/actions/workflows/ci.yml/badge.svg)

Demonstração prática de **arquitetura de microfrontends** aplicada a um e-commerce, implementada com **Webpack Module Federation** e **React 18**.

## Sobre o Projeto

Este é um **showcase técnico** que demonstra a implementação de microfrontends em um cenário real de e-commerce. O objetivo é ilustrar como diferentes times podem desenvolver e deployar features independentemente mantendo uma experiência de usuário integrada.

**Conceitos demonstrados:**
- Module Federation para compartilhamento de código em runtime
- Deployment e desenvolvimento independente de cada microfrontend
- Estado compartilhado entre aplicações via Zustand
- Comunicação desacoplada via EventBus (CustomEvents)

## Arquitetura

### Estrutura do Monorepo

```
packages/
├── shell/              # Host application (porta 3000)
│   └── Orquestra os MFEs, gerencia navegação
│
├── mfe-products/       # Remote MFE (porta 3001)
│   └── Catálogo de produtos com busca e filtros
│
├── mfe-cart/           # Remote MFE (porta 3002)
│   └── Carrinho de compras e checkout
│
└── design-system/      # Shared design tokens
    └── Tokens de cores, espaçamento e animações
```

### Module Federation

Cada microfrontend é uma **aplicação React independente** que pode ser desenvolvida, testada e deployada separadamente:

- **Shell (Host)**: Consome os MFEs remotos e gerencia a aplicação
- **Products MFE**: Expõe componente `Products` via Module Federation
- **Cart MFE**: Expõe componente `Cart` e `cartStore` (Zustand) via Module Federation

**Fluxo de comunicação:**
```
Products → EventBus → Cart (adicionar item)
Cart → Zustand Store → Shell (contador de itens)
```

## Stack Tecnológica

- **React 18.3** + **TypeScript 5.2**
- **Webpack 5** (Module Federation) para production builds
- **Vite 7** para desenvolvimento (HMR instantâneo)
- **Zustand 4.5** para state management
- **Tailwind CSS 3.4** para estilização
- **Turborepo** para build orchestration
- **Jest** + **React Testing Library** para testes

## Como Executar

### Instalação

```bash
git clone https://github.com/jonasmessias/microfrontend.git
cd microfrontend
npm install
```

### Desenvolvimento

```bash
# Opção 1: Webpack (production-like)
npm run dev

# Opção 2: Vite (recomendado - HMR mais rápido)
npm run dev:shell      # http://localhost:3000
npm run dev:products   # http://localhost:3001
npm run dev:cart       # http://localhost:3002
```

### Build de Produção

```bash
npm run build          # Build de todos os MFEs (usa Webpack)
```

### Testes

```bash
npm test                                  # Todos os testes
npm test --workspace=shell                # Testes de um MFE específico
npm run test:coverage --workspace=shell   # Cobertura de testes
```

## Destaques Técnicos

### Arquitetura
- **Deployment Independente**: Cada MFE pode ser deployado sem afetar os outros
- **Autonomia Completa**: Cada MFE tem suas próprias utils, types, constants e testes
- **Zero Acoplamento**: Comunicação via Module Federation e EventBus apenas

### Clean Code
- **Componentes Pequenos**: App.tsx com ~80 linhas (refatorado de 300+)
- **Single Responsibility**: Componentes focados e reutilizáveis
- **Type Safety**: TypeScript strict mode em todo o código

### Performance
- **React.memo**: Componentes otimizados (ProductCard, CartItem, CartSummary)
- **Lazy Loading**: MFEs carregados sob demanda
- **Code Splitting**: Via Module Federation

### Qualidade
- **Testes**: 70%+ de cobertura
- **ESLint + Prettier**: Code quality e formatação consistente
- **Error Boundaries**: Isolamento de falhas por MFE

## Recursos

- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)

## Licença

MIT
