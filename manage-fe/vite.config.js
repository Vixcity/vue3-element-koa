import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // mixin
  // css:{
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData:`@import '@/assets/style/base.scss';`
  //     }
  //   }
  // },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  plugins: [vue()],
});
