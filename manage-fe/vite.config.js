import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: "localhost",
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
  plugins: [vue()],
});
