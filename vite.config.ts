import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
    const inferredBase = repoName
      ? (repoName.endsWith('.github.io') ? '/' : `/${repoName}/`)
      : '/';
    const base = env.VITE_BASE || inferredBase;

    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
