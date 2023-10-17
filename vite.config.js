import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/myzlogo/",
  plugins: [vue()],
  // TODO: remove this workaround when https://github.com/antlr/antlr4/pull/4411 gets released.
  resolve: {
    alias: {
      "antlr4": "node_modules/antlr4/dist/antlr4.web.mjs"
    }
  }
});
