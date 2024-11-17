import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

// https://vite.dev/config/
export default defineConfig({
  base: '/login',
  plugins: [
    react(),
    obfuscatorPlugin({
      apply: 'build',
      include: ['src/lib/**/*.js', 'src/lib/**/*.ts'],
      options: {
        debugProtection: true,
        stringArray: true,
        stringArrayEncoding: ['rc4', 'base64'],
        stringArrayThreshold: 1,
        rotateStringArray: true,
        stringArrayWrappersCount: 2,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
