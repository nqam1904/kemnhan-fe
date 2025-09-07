import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

const PORT = 8080;

export default defineConfig(({ mode }) => ({
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [
    react(),
    ...(mode === 'development'
      ? [
          checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
              dev: { logLevel: ['error'] },
            },
            overlay: {
              position: 'tl',
              initialIsOpen: false,
            },
          }),
        ]
      : []),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      {
        find: '@',
        replacement: path.join(process.cwd(), 'src'),
      },
    ],
  },
  server: {
    port: PORT,
    host: true,
    strictPort: true,
    allowedHosts: true,
    hmr: { overlay: false },
  },
  preview: {
    port: PORT,
    host: true,
    strictPort: true,
    allowedHosts: true,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'dayjs',
      'lodash',
    ],
  },
}));
