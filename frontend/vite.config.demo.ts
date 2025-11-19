import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
    ],
    base: '/DeCom/', // GitHub Pages base URL
    build: {
        outDir: 'dist-demo', // Output to a different directory to avoid confusion
        emptyOutDir: true,
    }
})
