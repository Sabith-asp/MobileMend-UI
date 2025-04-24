import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "lottie-web": path.resolve(
        __dirname,
        "node_modules/lottie-web/build/player/lottie_light.js"
      ),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // increase if needed
    rollupOptions: {
      output: {
        manualChunks: {
          signalr: ["@microsoft/signalr"],
          lottie: ["lottie-web"], // or replace with safer import if possible
        },
      },
    },
  },
});
