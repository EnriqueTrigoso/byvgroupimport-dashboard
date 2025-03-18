import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        minifyInternalExports: false
      }
    }
  },
  server: {
    cors: true, // Habilita CORS para desarrollo
    port: 5173, // Puerto estándar de Vite
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*" // Importante para Module Federation
    }
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
      // shared: ["react", "react-dom"],
      shared: {
        react: {
          requiredVersion: "^18.0.0",
          shareScope: "default",
        },
        "react-dom": {
          requiredVersion: "^18.0.0",
          shareScope: "default",
        },
      },
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
