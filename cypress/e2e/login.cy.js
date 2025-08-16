describe('SandBox Pro - Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login.html')
  })

  it('should display login page with all elements', () => {
    // Check page title
    cy.title().should('contain', 'Login - SandBox Pro')
    
    // Check main elements
    cy.get('#loginForm').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#loginButton').should('be.visible')
    cy.get('#togglePassword').should('be.visible')
    
    // Check demo credentials helper
    cy.get('body').should('contain', 'Demo Credentials:')
  })

  it('should login with admin credentials successfully', () => {
    // Login with admin credentials
    cy.get('#email').type(Cypress.env('adminEmail'))
    cy.get('#password').type(Cypress.env('adminPassword'))
    cy.get('#loginForm').submit()
    
    // Check loading state
    cy.get('#spinner').should('be.visible')
    cy.get('#buttonText').should('contain', 'Signing In...')
    
    // Wait for redirect and check dashboard
    cy.url().should('include', '/dashboard.html')
    cy.get('#welcomeUserName').should('contain', 'Admin User')
    
    // Check admin-specific stats
    cy.get('#activeSandboxes').should('contain', '15')
    cy.get('#storageUsed').should('contain', '4.2 GB')
    cy.get('#teamMembers').should('contain', '12')
  })

  it('should login with user credentials successfully', () => {
    cy.get('#email').type(Cypress.env('userEmail'))
    cy.get('#password').type(Cypress.env('userPassword'))
    cy.get('#loginForm').submit()
    
    cy.url().should('include', '/dashboard.html')
    cy.get('#welcomeUserName').should('contain', 'John Doe')
    
    // Check user-specific stats
    cy.get('#activeSandboxes').should('contain', '8')
    cy.get('#storageUsed').should('contain', '2.1 GB')
    cy.get('#teamMembers').should('contain', '6')
  })

  it('should login with demo credentials successfully', () => {
    cy.get('#email').type(Cypress.env('demoEmail'))
    cy.get('#password').type(Cypress.env('demoPassword'))
    cy.get('#loginForm').submit()
    
    cy.url().should('include', '/dashboard.html')
    cy.get('#welcomeUserName').should('contain', 'Demo User')
    
    // Check demo-specific stats
    cy.get('#activeSandboxes').should('contain', '3')
    cy.get('#storageUsed').should('contain', '0.8 GB')
    cy.get('#teamMembers').should('contain', '2')
  })

  it('should show error for invalid credentials', () => {
    cy.get('#email').type('invalid@email.com')
    cy.get('#password').type('wrongpassword')
    cy.get('#loginForm').submit()
    
    // Check error message
    cy.get('#errorMessage').should('be.visible')
    cy.get('#errorText').should('contain', 'Invalid email or password')
    
    // Should stay on login page
    cy.url().should('include', '/login.html')
  })

  it('should validate email format', () => {
    cy.get('#email').type('invalid-email')
    cy.get('#email').blur()
    
    // Check for validation error styling
    cy.get('#email').should('have.class', 'border-red-500')
  })

  it('should toggle password visibility', () => {
    cy.get('#password').should('have.attr', 'type', 'password')
    cy.get('#eyeIcon').should('have.class', 'fa-eye')
    
    cy.get('#togglePassword').click()
    
    cy.get('#password').should('have.attr', 'type', 'text')
    cy.get('#eyeIcon').should('have.class', 'fa-eye-slash')
  })

  it('should handle remember me checkbox', () => {
    cy.get('#remember').should('not.be.checked')
    cy.get('#remember').check()
    cy.get('#remember').should('be.checked')
  })

  it('should use demo credentials helper', () => {
    // Double-click demo credentials helper
    cy.get('body').contains('Demo Credentials:').parent().dblclick()
    
    // Check if credentials are auto-filled
    cy.get('#email').should('have.value', 'admin@sandboxpro.com')
    cy.get('#password').should('have.value', 'admin123')
    cy.get('#remember').should('be.checked')
  })

  it('should handle keyboard shortcuts', () => {
    cy.get('#email').type(Cypress.env('adminEmail'))
    cy.get('#password').type(Cypress.env('adminPassword'))
    
    // Use Ctrl+Enter to submit
    cy.get('#loginForm').type('{ctrl}{enter}')
    
    cy.url().should('include', '/dashboard.html')
  })

  it('should clear form with Escape key', () => {
    cy.get('#email').type('test@email.com')
    cy.get('#password').type('testpassword')
    
    cy.get('body').type('{esc}')
    
    cy.get('#email').should('have.value', '')
    cy.get('#password').should('have.value', '')
  })
})
