import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hannah-project/',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
    ]
  },
  css: {
    // postcss: {
    //   plugins: [postcssPresetEnv]
    // },
    // preprocessorOptions: {
    //   scss: {
    //     javascriptEnabled: true,
    //     additionalData: `@import "./src/styles/common/style.scss";`
    //   }
    // }
  },
  plugins: [vue()],
})
