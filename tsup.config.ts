import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  dts: true,
  format: ['esm', 'cjs'],
  clean: true,
  watch: true,
})