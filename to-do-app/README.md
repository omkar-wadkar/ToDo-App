# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (GitHub)

This repository includes a GitHub Actions workflow that builds the Vite frontend and deploys it to GitHub Pages whenever you push to the `main` branch.

Quick steps to publish:

1. Create a new GitHub repository (for example: `your-username/to-do-app`) and set the remote in your local repo.

2. Commit and push the code to `main` (create the branch if needed):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git
git push -u origin main
```

3. The workflow at `.github/workflows/deploy-frontend.yml` will run automatically and publish the built `to-do-app/dist` directory to GitHub Pages.

Notes:
- The Vite config uses a relative `base` so the site will work when served under a project path (GitHub Pages).
- Backend: the `backend/` folder contains an Express API. Hosting the backend requires a separate hosting provider (Railway, Render, Heroku, etc.). You can push the `backend` code to the same repository and deploy it to your preferred service.
