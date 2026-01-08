<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Portfolio (Vite + React)

Este repositório contém o código do site/portfólio.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy no GitHub Pages (recomendado)

Este projeto já inclui um workflow de GitHub Actions em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) que faz build e publica automaticamente.

1. Faça push para a branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment**
   - **Source**: selecione **GitHub Actions**.
3. Aguarde o workflow “Deploy to GitHub Pages” finalizar.

Obs.: o `base` do Vite é inferido automaticamente:
- Se o repositório for `usuario.github.io`, usa `/`.
- Se for um repositório comum (Project Pages), usa `/<nome-do-repo>/`.
