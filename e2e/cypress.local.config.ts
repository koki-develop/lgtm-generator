import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
