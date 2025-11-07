# Frontend – Guia de Execução no Windows (PowerShell)

Este frontend é um app Next.js (v15) com Tailwind e integrações de IA via Genkit (Google AI). Abaixo está um guia objetivo para instalar, rodar em desenvolvimento e executar em produção no Windows usando PowerShell.

> Dica: o servidor de desenvolvimento roda por padrão na porta 9002.

## Pré-requisitos

- Node.js 18.18+ (recomendado: 20 LTS)
- npm (instalado com o Node)

Verifique sua versão do Node:

```powershell
node -v
```

## Instalação

No diretório `frontend`:

```powershell
# Instalar dependências
npm install
```

## Executar em Desenvolvimento

Inicie o servidor de desenvolvimento (Next.js com Turbopack), ouvindo na porta 9002:

```powershell
npm run dev
```

Depois, acesse:

- http://localhost:9002

Para interromper, use `Ctrl + C` no terminal.

### Scripts úteis

Os scripts definidos em `package.json` incluem:

- `npm run dev` – inicia o Next em modo dev com Turbopack na porta 9002.
- `npm run lint` – roda o ESLint.
- `npm run typecheck` – checa tipos com TypeScript sem emitir arquivos.

## (Opcional) Dev Server do Genkit – Fluxos de IA

Se você pretende testar os fluxos de IA em `src/ai`, inicie o servidor do Genkit em um segundo terminal PowerShell:

```powershell
# Ambiente de desenvolvimento do Genkit
npm run genkit:dev

# ou com watch (reinicia ao salvar mudanças)
npm run genkit:watch
```

Para usar modelos do Google AI, pode ser necessário definir a variável `GOOGLE_GENERATIVE_AI_API_KEY` no ambiente antes de iniciar o Genkit/Next:

```powershell
$env:GOOGLE_GENERATIVE_AI_API_KEY = "sua_chave_aqui"
```

Se preferir, você pode criar um arquivo `.env.local` na raiz de `frontend` para que o Next carregue as variáveis automaticamente (não commitá-lo):

```
# .env.local (exemplo)
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
```

> Implementação de IA: veja `src/ai/genkit.ts` para como o plugin Google AI é inicializado.

## Build e Execução em Produção (Windows)

Há duas formas simples de gerar o build e servir em produção no Windows:

### Opção A (recomendada): chamar Next diretamente

```powershell
# Gerar build de produção
npx next build

# Servir o build (Next em modo produção)
npm start
```

### Opção B: ajustar o script de build para Windows

O script atual de build no `package.json` usa `NODE_ENV=production next build`, que é sintaxe Unix e não funciona nativamente no Windows. Duas alternativas:

1) Simplesmente alterar o script para `"build": "next build"`.

2) Usar `cross-env` para tornar o comando multiplataforma:

```powershell
# Instalar cross-env como dependência de desenvolvimento
npm install -D cross-env

# Depois, no package.json:
# "build": "cross-env NODE_ENV=production next build"
```

Com o build gerado, rode:

```powershell
npm start
```

Por padrão, `npm start` inicia o Next na porta 3000. Se quiser outra porta, use `-p` (ex.: `next start -p 8080`) ajustando o script ou rodando diretamente o comando.

## Estrutura relevante

- `src/app` – rotas e páginas do Next.js (App Router).
- `src/components` – componentes compartilhados (UI, layout, etc.).
- `src/ai` – configuração do Genkit e fluxos de IA.
- `tailwind.config.ts` / `postcss.config.mjs` – configuração de estilos.
- `next.config.ts` – ajustes do Next (build, imagens remotas, etc.).

## Solução de Problemas

- Porta ocupada (9002): altere a porta no script `dev` do `package.json` (parâmetro `-p 9002`) ou encerre o processo que ocupa a porta.
- Erro de versão do Node: certifique-se de usar Node 18.18+ (ideal 20 LTS).
- Variáveis de ambiente ausentes (IA): defina `GOOGLE_GENERATIVE_AI_API_KEY` via PowerShell ou `.env.local`.
- Erros de lint ou tipos: rode `npm run lint` e `npm run typecheck`. O `next.config.ts` está configurado para ignorar erros na build, mas é recomendado corrigir avisos e erros.

## Observações sobre Deploy

O repositório inclui `apphosting.yaml`, usado para configurar o Firebase App Hosting. O processo de deploy não está coberto aqui, mas você pode consultar a documentação oficial do Firebase App Hosting para publicar o build de produção.

---

Se precisar, posso automatizar a opção B (adicionando `cross-env`) e atualizar os scripts no `package.json` para ficarem 100% multiplataforma.
