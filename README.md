# MicroShop — Demonstração de Arquitetura de Microfrontends

![CI](https://github.com/jonasmessias/react-microfrontend/actions/workflows/ci.yml/badge.svg)

## Demonstração ao vivo

### Aplicação completa (integrada)

- **[https://jonasmessias.github.io/react-microfrontend/](https://jonasmessias.github.io/react-microfrontend/)**

A aplicação principal demonstra a arquitetura completa de microfrontends, com Shell, Produtos e Carrinho funcionando em conjunto.

### Microfrontends independentes

Cada microfrontend também pode ser executado separadamente:

- **Microfrontend de Produtos:** [https://jonasmessias.github.io/react-microfrontend/products/](https://jonasmessias.github.io/react-microfrontend/products/)
- **Microfrontend de Carrinho:** [https://jonasmessias.github.io/react-microfrontend/cart/](https://jonasmessias.github.io/react-microfrontend/cart/)

---

Uma demonstração prática da **arquitetura de microfrontends** aplicada a um cenário de comércio eletrônico, implementada com **Webpack Module Federation** e **React 18**.

## Sobre o projeto

Este é um **projeto de demonstração técnica** que apresenta a implementação de microfrontends em um contexto realista de comércio eletrônico. O objetivo é mostrar como diferentes equipes podem desenvolver e publicar funcionalidades de forma independente, mantendo uma experiência integrada para o usuário.

**Principais conceitos demonstrados:**

- Module Federation para compartilhamento de código em tempo de execução
- Desenvolvimento e publicação independentes de cada microfrontend
- Estado compartilhado entre aplicações com Zustand
- Comunicação desacoplada por meio de EventBus (CustomEvents)

## Arquitetura

### Estrutura do monorepo
