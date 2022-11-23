import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./main.ts'],
  format: ['iife'],
  clean: true,
  watch: true,
})
