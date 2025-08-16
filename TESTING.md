# 🧪 Testing Documentation - SandBox Pro

This document provides comprehensive information about the automated testing setup for the SandBox Pro platform, including both Cypress and Selenium test suites.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Credentials](#test-credentials)
- [Cypress Testing](#cypress-testing)
- [Selenium Testing](#selenium-testing)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The SandBox Pro platform includes a comprehensive automated testing suite with two main testing frameworks:

- **Cypress.io**: Modern JavaScript-based E2E testing
- **Selenium WebDriver**: Python-based browser automation

### Test Coverage

- ✅ **Login/Authentication**: Form validation, credentials, error handling
- ✅ **Dashboard Functionality**: User interface, interactions, role-based content
- ✅ **UI/UX Elements**: Responsive design, animations, accessibility
- ✅ **Easter Eggs**: Konami code, keyboard shortcuts
- ✅ **Cross-browser Testing**: Chrome, Firefox, Edge support

## 🔑 Test Credentials

All tests use these predefined credentials:

| Role | Email | Password | Dashboard Stats |
|------|-------|----------|-----------------|
| **Admin** | `admin@sandboxpro.com` | `admin123` | 15 sandboxes, 4.2GB, 12 team |
| **User** | `user@sandboxpro.com` | `user123` | 8 sandboxes, 2.1GB, 6 team |
| **Demo** | `demo@sandboxpro.com` | `demo123` | 3 sandboxes, 0.8GB, 2 team |
| **Test** | `test@sandboxpro.com` | `test123` | 5 sandboxes, 1.5GB, 4 team |

## 🚀 Cypress Testing

### Setup

```bash
# Install dependencies
npm install

# Open Cypress Test Runner
npm run test:cypress:open

# Run tests in headless mode
npm run test:cypress
```

### Test Structure

```
cypress/
├── e2e/
│   ├── login.cy.js      # Login functionality tests
│   └── dashboard.cy.js  # Dashboard functionality tests
└── cypress.config.js    # Cypress configuration
```

### Key Features

- **Environment Variables**: Test credentials stored in `cypress.config.js`
- **Custom Commands**: Reusable test functions
- **Visual Testing**: Screenshot comparison
- **Parallel Execution**: CI/CD optimized
- **Cross-browser**: Chrome, Firefox, Edge support

### Example Test

```javascript
describe('Login Functionality', () => {
  it('should login with admin credentials', () => {
    cy.visit('/login.html')
    cy.get('#email').type(Cypress.env('adminEmail'))
    cy.get('#password').type(Cypress.env('adminPassword'))
    cy.get('#loginForm').submit()
    cy.url().should('include', '/dashboard.html')
  })
})
```

## 🐍 Selenium Testing

### Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run all Selenium tests
python -m pytest selenium_tests/

# Run specific test file
python -m pytest selenium_tests/test_login.py
```

### Test Structure

```
selenium_tests/
├── test_login.py      # Login functionality tests
├── test_dashboard.py  # Dashboard functionality tests
└── conftest.py        # Test configuration (optional)
```

### Key Features

- **Headless Mode**: Runs without browser UI
- **Multiple Browsers**: Chrome, Firefox, Safari support
- **Page Object Model**: Organized test structure
- **Explicit Waits**: Reliable element interactions
- **Screenshot Capture**: Failure documentation

### Example Test

```python
def test_admin_login_successful(self):
    self.driver.get(f"{self.base_url}/login.html")
    
    email_field = self.driver.find_element(By.ID, "email")
    password_field = self.driver.find_element(By.ID, "password")
    
    email_field.send_keys(self.credentials['admin']['email'])
    password_field.send_keys(self.credentials['admin']['password'])
    
    self.driver.find_element(By.ID, "loginForm").submit()
    
    self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
    self.assertIn("dashboard.html", self.driver.current_url)
```

## 🏃‍♂️ Running Tests

### Quick Start

```bash
# 1. Start the application
npm run start

# 2. Run Cypress tests
npm run test:cypress

# 3. Run Selenium tests
npm run test:selenium

# 4. Run all tests
npm run test:all
```

### Individual Test Commands

#### Cypress Commands
```bash
# Open Cypress Test Runner
npm run test:cypress:open

# Run specific test file
npm run test:cypress:login
npm run test:cypress:dashboard

# Run in different browsers
npm run test:cypress:chrome
npm run test:cypress:firefox

# Run with visual feedback
npm run test:cypress:headed
```

#### Selenium Commands
```bash
# Run specific test file
npm run test:selenium:login
npm run test:selenium:dashboard

# Run with verbose output
npm run test:selenium:verbose

# Run with coverage report
npm run test:selenium:coverage
```

### Development Mode

```bash
# Start server and open Cypress
npm run dev
```

## 🎯 Test Scenarios

### Login/Authentication Tests

#### ✅ Valid Login Scenarios
- [x] Admin user login with correct credentials
- [x] User role login with correct credentials
- [x] Demo user login with correct credentials
- [x] Test user login with correct credentials

#### ✅ Invalid Login Scenarios
- [x] Login with wrong email
- [x] Login with wrong password
- [x] Login with empty fields
- [x] Login with invalid email format

#### ✅ UI/UX Tests
- [x] Password visibility toggle
- [x] Remember me checkbox
- [x] Demo credentials helper
- [x] Loading states and animations
- [x] Error message display

#### ✅ Keyboard Shortcuts
- [x] Ctrl+Enter to submit form
- [x] Escape key to clear form
- [x] Tab navigation

### Dashboard Tests

#### ✅ Page Load Tests
- [x] Dashboard loads with correct elements
- [x] Role-based statistics display
- [x] User information display
- [x] Navigation elements present

#### ✅ Interactive Elements
- [x] User menu dropdown
- [x] Notifications popup
- [x] Create sandbox modal
- [x] Search functionality
- [x] Activity refresh

#### ✅ CRUD Operations
- [x] Create new sandbox
- [x] Search existing sandboxes
- [x] Filter sandbox list
- [x] Sandbox status display

#### ✅ System Features
- [x] System status monitoring
- [x] Real-time updates
- [x] Responsive design
- [x] Keyboard shortcuts

#### ✅ Easter Eggs
- [x] Konami code (↑↑↓↓←→←→BA)
- [x] Hidden features
- [x] Interactive elements

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Automated Testing
on: [push, pull_request]

jobs:
  cypress-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:cypress

  selenium-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v3
        with:
          python-version: '3.9'
      - run: pip install -r requirements.txt
      - run: npm run start &
      - run: python -m pytest selenium_tests/
```

### Docker Integration

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]
```

## 🛠️ Troubleshooting

### Common Issues

#### Cypress Issues

**Problem**: Tests fail with "cy.visit() failed"
```bash
# Solution: Ensure server is running
npm run start
```

**Problem**: Element not found
```bash
# Solution: Check element selectors
cy.get('#elementId').should('be.visible')
```

#### Selenium Issues

**Problem**: WebDriver not found
```bash
# Solution: Install webdriver-manager
pip install webdriver-manager
```

**Problem**: Headless mode issues
```bash
# Solution: Add Chrome options
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
```

### Debug Mode

#### Cypress Debug
```bash
# Run with debug logging
DEBUG=cypress:* npm run test:cypress
```

#### Selenium Debug
```bash
# Run with verbose output
python -m pytest selenium_tests/ -v -s
```

### Performance Optimization

#### Cypress
- Use `cy.intercept()` for API mocking
- Implement custom commands for common actions
- Use `cy.fixture()` for test data

#### Selenium
- Use explicit waits instead of implicit waits
- Implement page object model
- Use headless mode for CI/CD

## 📊 Test Reports

### Cypress Reports
- Built-in HTML reports
- Screenshot capture on failure
- Video recording (optional)
- JSON output for CI integration

### Selenium Reports
- pytest-html for HTML reports
- pytest-cov for coverage reports
- Screenshot capture on failure
- XML output for CI integration

## 🔧 Configuration

### Cypress Configuration
```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  }
})
```

### Selenium Configuration
```python
# Test configuration
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--window-size=1280,720")
```

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Selenium Documentation](https://selenium-python.readthedocs.io/)
- [Pytest Documentation](https://docs.pytest.org/)
- [WebDriver Manager](https://github.com/SergeyPirogov/webdriver_manager)

---

**Happy Testing! 🎉**

*This testing suite is designed to ensure the SandBox Pro platform works reliably across all scenarios and user interactions.*
