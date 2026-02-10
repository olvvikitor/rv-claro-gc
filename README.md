# Estrutura do Projeto

Este documento descreve a estrutura de pastas do template React + TypeScript e fornece recomendações de organização e convenções para facilitar manutenção e escalabilidade.

Visão geral (raiz):

```
index.html
package.json
vite.config.ts
public/
src/
  main.tsx
  assets/
  components/
  layouts/
  ui/
  hooks/
  icons/
  layout/
  pages/
  routes/
  service/
  styles/
```

Descrição das pastas (recomendações):

- `src/main.tsx`: Ponto de entrada da aplicação. Inicializa React e Router.
- `src/assets/`: Imagens, fontes e arquivos estáticos importáveis.
- `src/components/`: Componentes reutilizáveis específicos da aplicação (conjuntos de componentes relacionados a features). Evite componentes muito genéricos aqui — coloque primitives em `ui/`.
- `src/layouts/`: Layouts de página (ex.: `Navbar`, `Footer`, wrappers de página).
- `src/ui/`: Biblioteca de componentes atômicos / design system (botões, inputs, cartões) que podem ser usados por toda a app.
- `src/hooks/`: Hooks customizados (ex.: `useAuth.tsx`). Mantenha hooks puros e reutilizáveis.
- `src/icons/`: Componentes SVG/ícones.
- `src/layout/`: Componente de alto nível que envolve rotas (ex.: `Layout.tsx`) — pode conter `Header`, `Sidebar` e o slot `children`.
- `src/pages/`: Páginas ligadas a rotas (ex.: `Home.tsx`). Cada arquivo aqui normalmente mapeia para uma rota.
- `src/routes/`: Arquivo(s) de roteamento (ex.: `router.tsx`). Centralize configurações de rotas e lazy-loading aqui.
- `src/service/`: Código de comunicação com APIs (ex.: `Api.tsx`). Centralize chamadas HTTP, instância do axios/fetch wrappers e handling de tokens/erros.
- `src/styles/`: Estilos globais (ex.: `index.css`, configuração Tailwind). Preferir classes utilitárias e tokens de design.

Boas práticas e convenções

- Organização por feature (opcional): Para apps maiores, prefira agrupar por feature — ex.: `src/features/Auth/{components, pages, hooks, service}` — facilita escalar e isolar responsabilidade.
- Nomeação: Componentes React em `PascalCase.tsx`, hooks em `camelCase` começando por `use`, utilitários com nomes descritivos (`formatDate.ts`).
- Tipagem: Use `*.ts` para modules e `*.tsx` para componentes React. Centralize tipos compartilhados em `src/types/` (crie se necessário).
- Serviços/API: Centralize lógica de requisições em `src/service` e exponha funções claras (`getUser()`, `login()`), trate erros e tokens ali.
- Estado global: Se usar Context/Redux/MobX, crie `src/store/` ou `src/context/` com arquivos pequenos e bem documentados.
- Testes: Crie pasta `__tests__/` ao lado do arquivo testado ou `tests/` na raiz. Use `*.test.tsx`.
- Styling: Prefira classes utilitárias (Tailwind) ou CSS Modules em `*.module.css` para escopo local.
- Assets: Não importe imagens grandes diretamente; prefira otimizá-las e usar `public/` para arquivos estáticos que não mudam.

Sugestão de evolução da estrutura

- Pequeno projeto / protótipo:
  - Mantenha a estrutura atual, coloque componentes simples em `components/` e `ui/`.
- Projeto médio / produção:
  - Adote `feature folders` para funções centrais (ex.: `features/`, `services/`, `hooks/`).
  - Adicione `src/types/`, `src/utils/`, `src/store/`.
- Projeto grande / monorepo:
  - Considere separar bibliotecas (ui, utils) em pacotes próprios ou usar `packages/`.

Exemplo mínimo de feature folder (opcional):

```
src/features/Auth/
  components/
    LoginForm.tsx
  pages/
    LoginPage.tsx
  hooks/
    useLogin.ts
  service/
    authApi.ts
  types.ts
```

Conclusão

Esta estrutura equilibra clareza e escalabilidade. Comece simples e migre para organização por feature quando o código e a equipe cresçam. Se quiser, eu adapto este README para seguir um padrão específico (feature-first, domain-driven, monorepo) ou gero exemplos de arquivos (ex.: `authApi.ts`, `useAuth.tsx`).
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
