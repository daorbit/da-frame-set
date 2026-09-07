import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The documentation site. Built to its own directory so it never overwrites
 * the library bundle in `dist`.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-site',
    emptyOutDir: true,
  },
});
