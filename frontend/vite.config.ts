import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DeCom',
      formats: ['es', 'umd'],
      fileName: (format) => `decom.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'wagmi', 'viem', '@tanstack/react-query', '@rainbow-me/rainbowkit'],
      output: {
        globals: {}
      }
    }
  }
})
