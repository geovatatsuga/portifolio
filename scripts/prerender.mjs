import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const serverEntry = path.join(distDir, 'server', 'entry-server.js');

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntry).href),
  readFile(indexPath, 'utf8'),
]);

const appHtml = render();
const rendered = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

await writeFile(indexPath, rendered);
await rm(path.join(distDir, 'server'), { recursive: true, force: true });
