import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';
import { execSync } from 'child_process';

function getVersion() {
  const res = execSync('git rev-parse --short HEAD')
  const hash = res.toString().trim()
  return `${hash}`
}

// https://vite.dev/config/
export default defineConfig({
  base: '/passport',
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
  define: {
    VERSION: `"${getVersion()}"`
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
