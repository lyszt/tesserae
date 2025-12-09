import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  extensions: ["jsx", "js"],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "~": path.resolve("./src"),
      },
      extensions: [".jsx", ".js", ".json"],
    },
  },
  server: {
    preset: "node-server",
  },
});
