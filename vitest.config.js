import config from "./vite.config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [...config.plugins],
  test: {
    // This means we don't have to import `describe`,
    // `it`, and `expect` into every test file
    globals: true,
  },
});
