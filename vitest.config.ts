import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    include: ['src/**/*.spec.ts'],
    globals: true,
  },
});