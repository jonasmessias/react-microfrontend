# 🛍️ MicroShop - Microfrontend E-commerce

![CI](https://github.com/jonasmessias/microfrontend/actions/workflows/ci.yml/badge.svg)

Exemplo de **arquitetura de microfrontends** aplicada a um e-commerce, usando **Webpack Module Federation** para demonstrar estratégias de deployment independente e escalabilidade.

## 🎯 Propósito

Demonstrar padrões avançados de arquitetura frontend para aplicações de larga escala, onde múltiplos times podem trabalhar independentemente em diferentes features mantendo uma experiência de usuário coesa.

**Conceitos implementados:**

- ✅ **Module Federation** para compartilhamento de código em runtime
- ✅ **Integração dinâmica** de múltiplas aplicações React
- ✅ **Estado compartilhado** entre microfrontends com Zustand
- ✅ **Comunicação desacoplada** via EventBus
- ✅ **Deployment independente** de cada microfrontend

## 🏗️ Architecture

**Monorepo Structure** with **fully independent microfrontends** powered by **Turborepo**:

```
packages/
├── shell/              # Host application (port 3000)
│   ├── components/    # UI components (SearchBar, Logo, Footer, etc)
│   ├── hooks/         # Custom hooks (useSearch, useCartCount)
│   ├── constants/     # Event names, categories, MFE remotes
│   └── App.tsx        # Main app (refactored to 80 lines)
│
├── mfe-products/       # Products catalog MFE (port 3001)
│   ├── components/    # ProductCard, ProductGrid
│   ├── types/         # Product types
│   ├── utils/         # EventBus, formatters
│   ├── constants/     # Event names, rating config
│   └── store/         # Zustand store
│
├── mfe-cart/           # Shopping cart MFE (port 3002)
│   ├── components/    # CartItem, CartSummary
│   ├── types/         # Cart types
│   ├── utils/         # EventBus, formatters
│   ├── constants/     # Event names, cart config
│   └── store/         # Zustand store
│
└── design-system/      # Shared design tokens
    └── tokens.js      # Colors, spacing, animations
```

### Princípios de Arquitetura

🎯 **Autonomia Total**: Cada MFE é um projeto independente com suas próprias utils, types e constants  
🎯 **Ownership Claro**: Cada time é responsável por seu MFE completo  
🎯 **Zero Acoplamento**: Comunicação apenas via Module Federation e EventBus  
🎯 **Deploy Independente**: Cada MFE pode ser deployado sem afetar outros

### Module Federation com Webpack + Vite

Este projeto usa uma **abordagem híbrida** para melhor experiência de desenvolvimento:

- **Development (Vite)**: Dev server ultra-rápido com HMR instantâneo usando `@originjs/vite-plugin-federation`
- **Production (Webpack)**: Build otimizado com Module Federation nativo do Webpack 5

**Webpack Module Federation** é usado para compartilhar componentes entre microfrontends em runtime:

- **Shell (Host)**: Orquestra a aplicação, gerencia roteamento e carrega MFEs remotos dinamicamente
- **Products MFE**: Expõe catálogo de produtos e funcionalidade de busca
- **Cart MFE**: Expõe gerenciamento do carrinho e estado compartilhado (Zustand)
- **Deployment Independente**: Cada MFE pode ser implantado separadamente sem afetar os outros

**Por que Webpack?** Webpack 5 tem suporte nativo e estável para Module Federation desde 2020, sendo amplamente usado em produção por empresas como Spotify, Microsoft e Bytedance.

**Por que Vite no dev?** Vite oferece HMR (Hot Module Replacement) instantâneo usando ESM nativo do browser, resultando em tempos de inicialização ~10x mais rápidos comparado ao Webpack dev server.

## 🚀 Stack Tecnológica

### Tecnologias Principais

- **React 18.3** - Framework UI com recursos de renderização concorrente
- **TypeScript 5.2** - Type safety e melhor experiência de desenvolvimento
- **Vite 7.2** - Dev server ultra-rápido com HMR instantâneo
- **Webpack 5.103** - Production bundler com Module Federation nativo
- **npm Workspaces** - Gerenciamento de pacotes no monorepo
- **Turborepo** - Sistema de build de alta performance para monorepos

### Gerenciamento de Estado

- **Zustand 4.5** - State management leve compartilhado via Module Federation
- **CustomEvent API** - Comunicação nativa do browser entre MFEs

### Estilo

- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Estratégia Shell-First** - Compilação centralizada do Tailwind
- **Design System** - Tokens compartilhados com versionamento SemVer

### Testes

- **Jest 30** - Framework de testes unitários
- **React Testing Library 16** - Testes de componentes
- **70% de cobertura** - Qualidade de código garantida

## ✨ Aprendizados de Arquitetura

### Conceitos Explorados Neste Projeto

✅ **Module Federation** - Compartilhamento de código em runtime e lazy loading  
✅ **Error Boundaries** - Isolamento de falhas por MFE  
✅ **Deployment Independente** - Cada MFE faz build e deploy separadamente  
✅ **Dependências Compartilhadas** - React/Zustand como singleton entre MFEs  
✅ **Comunicação Event-Driven** - Interações desacopladas entre MFEs

### Experiência de Desenvolvimento

✅ **TypeScript Modo Strict** - Type safety em todos os pacotes  
✅ **Configuração Centralizada** - `tsconfig.base.json` para consistência  
✅ **Hot Module Replacement** - Iteração rápida no desenvolvimento  
✅ **ESLint + Prettier** - Qualidade e formatação de código  
✅ **Testes Automatizados** - Jest com cobertura abrangente

### Quando Usar Microfrontends?

Microfrontends não são adequados para todos os cenários:

#### ✅ Casos de uso ideais:

- Múltiplos times autônomos trabalhando em features isoladas
- Necessidade de deploy independente de partes da aplicação
- Diferentes stacks ou versões do framework por domínio
- Aplicações de larga escala que precisam ser divididas

#### ❌ Evite quando:

- Time pequeno ou único time
- Aplicação de pequeno/médio porte (prefira monolito modular)
- Performance é crítica (há overhead de Module Federation)
- Não há necessidade real de deploy independente

> 💡 Microfrontends resolvem problemas de **organização e deployment**, não problemas técnicos. Use quando os benefícios organizacionais justificarem a complexidade adicional.

## 🛠️ Como Executar

### Pré-requisitos

- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd microfrontend

# Instale todas as dependências
npm install
```

### Desenvolvimento

```bash
# Execute todos os microfrontends simultaneamente (via Turborepo)
npm run dev          # Usa Webpack dev server

# Ou com Vite (desenvolvimento mais rápido - recomendado)
npm run dev:shell      # http://localhost:3000 (Vite)
npm run dev:products   # http://localhost:3001 (Vite)
npm run dev:cart       # http://localhost:3002 (Vite)

# Ou execute individualmente com Webpack
npm run dev --workspace=shell
npm run dev --workspace=mfe-products
npm run dev --workspace=mfe-cart
```

Abra http://localhost:3000 no navegador para ver a aplicação Shell carregando os microfrontends remotos.

> 💡 **Tip:** Use `dev:vite` scripts para desenvolvimento mais rápido. O Vite oferece HMR instantâneo e cold start ~10x mais rápido.

### Testes

```bash
# Execute todos os testes
npm test

# Execute testes de um pacote específico
npm test --workspace=shell
npm test --workspace=mfe-products
npm test --workspace=mfe-cart

# Modo watch
npm run test:watch --workspace=shell

# Relatório de cobertura
npm run test:coverage --workspace=shell
```

### Build de Produção

```bash
# Build de todos os pacotes (com cache do Turborepo)
# Usa Webpack para production build com Module Federation
npm run build

# Build individual
npm run build:shell
npm run build:products
npm run build:cart

# Limpar artefatos de build
npm run clean
```

> ⚠️ **Importante:** Production builds usam Webpack, não Vite. Webpack Module Federation é mais estável e amplamente testado em produção.

## 📦 Estrutura dos Pacotes

### Shell (Aplicação Host)

- **Porta**: 3000
- **Responsabilidade**: Orquestração da aplicação, carrega MFEs remotos
- **Expõe**: Nada (apenas host)
- **Consome**: `mfe-products/Products`, `mfe-cart/Cart`, `mfe-cart/cartStore`
- **Estrutura Interna**:
  - `components/` - SearchBar, Logo, HeaderActions, Navigation, Footer
  - `hooks/` - useSearch (busca), useCartCount (sincronização)
  - `constants/` - EVENT_NAMES, CATEGORIES, MFE_REMOTES

### mfe-products (Catálogo de Produtos)

- **Porta**: 3001
- **Responsabilidade**: Listagem de produtos, busca, filtros
- **Expõe**: Componente `./Products`
- **Estrutura Interna**:
  - `components/` - ProductCard (React.memo), ProductGrid
  - `types/` - Product interface
  - `utils/` - EventBus, formatCurrency, splitPrice
  - `constants/` - EVENT_NAMES, CATEGORIES, RATING_CONFIG
  - `store/` - productsStore (Zustand)

### mfe-cart (Carrinho de Compras)

- **Porta**: 3002
- **Responsabilidade**: Gerenciamento do carrinho, checkout
- **Expõe**: Componente `./Cart`, store `./cartStore` (Zustand)
- **Estado Compartilhado**: Store acessível do Shell para contador
- **Estrutura Interna**:
  - `components/` - CartItem (React.memo), CartSummary (React.memo)
  - `types/` - CartItem interface
  - `utils/` - EventBus, formatCurrency, splitPrice, formatNumber
  - `constants/` - EVENT_NAMES, CART_CONFIG
  - `store/` - cartStore (Zustand)

### design-system

- **Propósito**: Design tokens centralizados e configuração do Tailwind
- **Versionamento**: SemVer para evolução segura
- **Tokens**: Cores, espaçamento, animações
- **Uso**: Cada MFE importa como preset do Tailwind

## 🎨 Design System

O projeto utiliza um design system centralizado com configuração baseada em presets do Tailwind:

```javascript
// Cada MFE importa o preset base
presets: [require('../design-system/tailwind.config')];
```

**Design Tokens**:

- `microshop-dark`, `microshop-blue`, `microshop-orange` - Cores da marca
- `primary-*`, `secondary-*` - Cores de ação
- `xs` até `2xl` - Escala de espaçamento
- `spin-slow` - Animações customizadas

## 🔄 Padrões de Comunicação

### 1. Module Federation (Compartilhamento em Runtime)

```typescript
// Shell importa componente Products
const Products = lazy(() => import('mfeProducts/Products'));
```

### 2. Estado Compartilhado (Zustand)

```typescript
// Store do carrinho compartilhada entre Shell e Cart MFE
const cartStore = await import('mfeCart/cartStore');
```

### 3. EventBus (CustomEvents)

```typescript
// Products emite evento cart:add-item
EventBus.emit('cart:add-item', { product, quantity });

// Cart escuta e atualiza o estado
EventBus.on('cart:add-item', (data) => addItem(data));
```

## ⚡ Turborepo

Este monorepo usa **Turborepo** para orquestração inteligente de builds:

- **Cache inteligente**: Builds são cacheados e nunca re-executados desnecessariamente
- **Orquestração de tarefas**: Executa tarefas entre pacotes na ordem ideal
- **Execução paralela**: Executa tarefas independentes simultaneamente
- **Consciência de dependências**: Entende relacionamentos entre pacotes automaticamente

**Benefícios principais:**

- ⚡ **Builds 10x mais rápidos** com cache inteligente
- 🎯 **Executa apenas o que mudou** (detecção de pacotes afetados)
- 📦 **Pipeline de tarefas otimizado** (build → test → lint)
- 🔄 **Builds incrementais** para monorepos massivos

Configuração: [`turbo.json`](turbo.json)

## 📊 Estratégia de Testes

- **Testes Unitários**: Lógica de stores, funções utilitárias
- **Testes de Componentes**: Componentes UI com interações do usuário
- **Testes de Integração**: Comunicação via EventBus
- **Cobertura**: 70% de threshold para branches, funções e linhas

## 🚢 Deployment

Cada microfrontend pode ser implantado independentemente:

1. **Products MFE** atualizado → Deploy apenas de `mfe-products`
2. **Cart MFE** atualizado → Deploy apenas de `mfe-cart`
3. **Shell** atualizado → Deploy do `shell` (puxa os remotes mais recentes)

Variáveis de ambiente controlam URLs remotas:

- Development: `localhost:300x`
- Production: Configurável via `.env.production`

## 📚 Recursos Úteis

- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

## 🤝 Boas Práticas Implementadas

### Arquitetura
1. **Autonomia Completa**: Cada MFE é totalmente independente com suas próprias utils
2. **Responsabilidade Única (SRP)**: Componentes pequenos e focados
3. **Baixo Acoplamento**: Comunicação apenas via EventBus e Module Federation
4. **Deployment Independente**: Zero dependência entre MFEs

### Clean Code
5. **DRY (Don't Repeat Yourself)**: Utilitários reutilizáveis em cada MFE
6. **Nomenclatura Clara**: Nomes descritivos e semânticos
7. **Componentes Pequenos**: App.tsx com 80 linhas (antes 300+)
8. **Constantes Extraídas**: EVENT_NAMES, CATEGORIES, configs

### Performance
9. **React.memo**: ProductCard, CartItem, CartSummary otimizados
10. **Lazy Loading**: MFEs carregados sob demanda
11. **Code Splitting**: Webpack Module Federation

### Qualidade
12. **Type Safety**: TypeScript strict mode em todos os pacotes
13. **ESLint + Prettier**: Linting e formatação consistentes
14. **Error Boundaries**: Isolamento de falhas por MFE
15. **Cobertura de Testes**: 70%+ em testes unitários e integração

## 📝 Licença

MIT

---

Exemplo de arquitetura de microfrontends com Webpack Module Federation. 🚀
