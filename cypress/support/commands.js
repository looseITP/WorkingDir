// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login with specific credentials
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login.html')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('#loginForm').submit()
  cy.url().should('include', '/dashboard.html')
})

// Custom command to login as admin
Cypress.Commands.add('loginAsAdmin', () => {
  cy.login(Cypress.env('adminEmail'), Cypress.env('adminPassword'))
})

// Custom command to login as user
Cypress.Commands.add('loginAsUser', () => {
  cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'))
})

// Custom command to login as demo
Cypress.Commands.add('loginAsDemo', () => {
  cy.login(Cypress.env('demoEmail'), Cypress.env('demoPassword'))
})

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.get('#userMenuBtn').click()
  cy.get('#logoutBtn').click()
  cy.url().should('include', '/login.html')
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('body').should('not.contain', 'Loading...')
})
