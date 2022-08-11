import { resolve } from 'path'
import { defineConfig, resolveConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/export.ts'),
      name: 'VueWidget',
      fileName: (format) =>
        `vue-widget.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          react: 'Reaqctasdsaasdsa',
        },
      },
    },
  },
})
