const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://looseitp.github.io/looseitpcursor.io',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'html',
      bundler: 'vite'
    }
  },
  env: {
    // Test credentials
    adminEmail: 'admin@sandboxpro.com',
    adminPassword: 'admin123',
    userEmail: 'user@sandboxpro.com',
    userPassword: 'user123',
    demoEmail: 'demo@sandboxpro.com',
    demoPassword: 'demo123',
    testEmail: 'test@sandboxpro.com',
    testPassword: 'test123'
  }
})
