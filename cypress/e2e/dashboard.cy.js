describe('SandBox Pro - Dashboard Functionality', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login.html')
    cy.get('#email').type(Cypress.env('adminEmail'))
    cy.get('#password').type(Cypress.env('adminPassword'))
    cy.get('#loginForm').submit()
    cy.url().should('include', '/dashboard.html')
  })

  it('should display dashboard with all elements', () => {
    // Check page title
    cy.title().should('contain', 'Dashboard - SandBox Pro')
    
    // Check main dashboard elements
    cy.get('#welcomeUserName').should('contain', 'Admin User')
    cy.get('#activeSandboxes').should('be.visible')
    cy.get('#storageUsed').should('be.visible')
    cy.get('#teamMembers').should('be.visible')
    cy.get('#uptime').should('be.visible')
    
    // Check navigation elements
    cy.get('#notificationsBtn').should('be.visible')
    cy.get('#userMenuBtn').should('be.visible')
    cy.get('#createSandboxBtn').should('be.visible')
  })

  it('should display correct admin statistics', () => {
    cy.get('#activeSandboxes').should('contain', '15')
    cy.get('#storageUsed').should('contain', '4.2 GB')
    cy.get('#teamMembers').should('contain', '12')
    cy.get('#uptime').should('contain', '99.9%')
  })

  it('should toggle user menu dropdown', () => {
    cy.get('#userDropdown').should('not.be.visible')
    cy.get('#userMenuBtn').click()
    cy.get('#userDropdown').should('be.visible')
    
    // Click outside to close
    cy.get('body').click(0, 0)
    cy.get('#userDropdown').should('not.be.visible')
  })

  it('should logout successfully', () => {
    cy.get('#userMenuBtn').click()
    cy.get('#logoutBtn').click()
    
    // Should redirect to login page
    cy.url().should('include', '/login.html')
  })

  it('should show notifications popup', () => {
    cy.get('#notificationsBtn').click()
    
    // Check notification popup appears
    cy.get('body').should('contain', 'Notifications')
    cy.get('body').should('contain', 'New feature: Advanced analytics dashboard')
    cy.get('body').should('contain', 'Your sandbox "Python-Data" will be stopped')
    cy.get('body').should('contain', 'Team member Sarah Chen has been successfully added')
    
    // Notification badge should be hidden
    cy.get('#notificationBadge').should('not.be.visible')
  })

  it('should open create sandbox modal', () => {
    cy.get('#createSandboxBtn').click()
    cy.get('#createSandboxModal').should('be.visible')
    
    // Check modal elements
    cy.get('#sandboxName').should('be.visible')
    cy.get('#sandboxTemplate').should('be.visible')
    cy.get('#cancelCreate').should('be.visible')
  })

  it('should create a new sandbox', () => {
    cy.get('#createSandboxBtn').click()
    cy.get('#sandboxName').type('Test Sandbox')
    cy.get('#sandboxTemplate').select('React')
    cy.get('#createSandboxForm').submit()
    
    // Check loading state
    cy.get('#createSandboxForm button[type="submit"]').should('contain', 'Creating...')
    
    // Modal should close and new sandbox should appear
    cy.get('#createSandboxModal').should('not.be.visible')
    cy.get('#sandboxesTableBody').should('contain', 'Test Sandbox')
  })

  it('should search sandboxes', () => {
    cy.get('#searchSandboxes').type('React')
    
    // Should filter to show only React sandbox
    cy.get('#sandboxesTableBody tr').should('contain', 'React-App')
    cy.get('#sandboxesTableBody tr').should('not.contain', 'Node-API')
  })

  it('should refresh activity', () => {
    cy.get('#refreshActivity').click()
    
    // Check loading state
    cy.get('#refreshActivity').should('contain', 'Refreshing...')
    
    // Should show success message
    cy.get('body').should('contain', 'Activity refreshed!')
  })

  it('should handle quick action buttons', () => {
    // Test invite team button
    cy.get('#inviteTeamBtn').click()
    cy.get('body').should('contain', 'Invite team functionality coming soon!')
    
    // Test analytics button
    cy.get('#viewAnalyticsBtn').click()
    cy.get('body').should('contain', 'Analytics dashboard coming soon!')
    
    // Test settings button
    cy.get('#settingsBtn').click()
    cy.get('body').should('contain', 'Settings panel coming soon!')
  })

  it('should display system status correctly', () => {
    cy.get('body').should('contain', 'API Services')
    cy.get('body').should('contain', 'Database')
    cy.get('body').should('contain', 'CDN')
    cy.get('body').should('contain', 'Monitoring')
    
    // Check status indicators
    cy.get('body').should('contain', 'Online')
    cy.get('body').should('contain', 'Warning')
  })

  it('should handle keyboard shortcuts', () => {
    // Test Ctrl+Shift+L for logout
    cy.get('body').type('{ctrl}{shift}l')
    cy.url().should('include', '/login.html')
    
    // Login again for next test
    cy.get('#email').type(Cypress.env('adminEmail'))
    cy.get('#password').type(Cypress.env('adminPassword'))
    cy.get('#loginForm').submit()
    cy.url().should('include', '/dashboard.html')
    
    // Test Ctrl+Shift+C for create sandbox
    cy.get('body').type('{ctrl}{shift}c')
    cy.get('#createSandboxModal').should('be.visible')
    
    // Test Ctrl+Shift+N for notifications
    cy.get('body').type('{ctrl}{shift}n')
    cy.get('body').should('contain', 'Notifications')
  })

  it('should trigger Konami code easter egg', () => {
    // Enter Konami code: ↑↑↓↓←→←→BA
    cy.get('body').type('{uparrow}{uparrow}{downarrow}{downarrow}{leftarrow}{rightarrow}{leftarrow}{rightarrow}ba')
    
    // Check easter egg modal
    cy.get('body').should('contain', '🎉 Easter Egg Found! 🎉')
    cy.get('body').should('contain', 'You discovered the secret Konami code!')
  })

  it('should display sandboxes table correctly', () => {
    cy.get('#sandboxesTableBody tr').should('have.length', 3)
    
    // Check existing sandboxes
    cy.get('#sandboxesTableBody').should('contain', 'React-App')
    cy.get('#sandboxesTableBody').should('contain', 'Node-API')
    cy.get('#sandboxesTableBody').should('contain', 'Python-Data')
    
    // Check status badges
    cy.get('body').should('contain', 'Running')
    cy.get('body').should('contain', 'Stopped')
  })

  it('should handle responsive design', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    cy.get('#welcomeUserName').should('be.visible')
    cy.get('#createSandboxBtn').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.get('#welcomeUserName').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1280, 720)
    cy.get('#welcomeUserName').should('be.visible')
  })
})
