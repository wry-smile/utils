import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  outDir: 'dist',
  dts: true,
  format: ['esm', 'cjs'],
  clean: true,
})

