import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl: "https://lgtm-generator-git-develop-koki-develop.vercel.app",
  },
});
