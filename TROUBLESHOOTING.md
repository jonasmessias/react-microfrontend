# Troubleshooting: Module Federation with Vite

## Problema: 404 nos remoteEntry.js

```
GET http://localhost:3001/remoteEntry.js net::ERR_ABORTED 404 (Not Found)
GET http://localhost:3002/remoteEntry.js net::ERR_ABORTED 404 (Not Found)
```

### Causa

1. **Turbo cache desatualizado** - Scripts foram alterados mas Turbo ainda executa versão antiga
2. **MFEs rodando Webpack** ao invés de Vite no dev

### Solução

#### 1. Limpar Turbo daemon
```bash
npx turbo daemon clean
```

#### 2. Parar todos os processos (Ctrl+C)

#### 3. Rodar novamente
```bash
npm run dev
```

### Verificação

Você deve ver:
```
@microshop/shell:dev: > vite
@microshop/mfe-products:dev: > vite
@microshop/mfe-cart:dev: > vite
```

❌ Se aparecer `webpack serve`, o cache ainda está ativo.

### Alternativa: Rodar sem Turbo

Se o problema persistir, rode individualmente:

```bash
# Terminal 1
cd packages/mfe-products && npm run dev

# Terminal 2  
cd packages/mfe-cart && npm run dev

# Terminal 3
cd packages/shell && npm run dev
```

## Notas Importantes

- **Dev**: Todos usam Vite (fast HMR)
- **Prod**: Todos usam Webpack (Module Federation)
- `remoteEntry.js` é gerado apenas no build de produção
- No dev, Vite usa seu próprio sistema de federation
