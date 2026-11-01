import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'threshold.css', 'contact.css', 'script.js', 'thank-you.html']) {
  await copyFile(file, `dist/${file}`);
}
