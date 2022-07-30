import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 30000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'https://lgtm-generator-git-develop-koki-develop.vercel.app',
  },
})
