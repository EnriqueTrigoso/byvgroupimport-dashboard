import { fileURLToPath, URL } from "node:url";
import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    target: "esnext",
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
    minify: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./PieChart": "./src/components/PieChart/index.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "tailwind-config": fileURLToPath(
        new URL("./tailwind.config.js", import.meta.url)
      ),
    },
  },
});
