# 🚀 SandBox Pro - Premium Development Sandboxes

A modern, interactive fake sales platform designed for automated testing and development practice. Built with HTML5, CSS3, JavaScript, and Tailwind CSS.

## 🌟 Features

### 🎯 **Sales Platform**
- **Modern Landing Page** with hero section, features, and pricing
- **Interactive Pricing Cards** with hover effects and animations
- **Responsive Design** that works on all devices
- **Professional UI/UX** with glass morphism effects

### 🔐 **Authentication System**
- **Login Page** with form validation and error handling
- **Fake User Credentials** for testing purposes
- **Session Management** with localStorage/sessionStorage
- **Password Toggle** and input validation
- **Demo Credentials Helper** for easy testing

### 📊 **User Dashboard**
- **Role-based Statistics** (admin, user, demo, test users)
- **Interactive Elements** (notifications, modals, search)
- **Real-time Updates** and animations
- **Sandbox Management** with CRUD operations
- **System Status** monitoring

### 🎮 **Easter Eggs & Testing Features**
- **Keyboard Shortcuts** for quick actions
- **Multiple User Roles** with different permissions
- **Form Validations** and error states
- **Loading States** and animations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Animations**: CSS3 + JavaScript
- **Storage**: localStorage/sessionStorage

## 📁 Project Structure

```
looseitpcursor.io/
├── index.html          # Main landing page
├── login.html          # Authentication page
├── dashboard.html      # User dashboard
├── script.js           # Main page JavaScript
├── login.js            # Login functionality
├── dashboard.js        # Dashboard functionality
├── styles.css          # Custom CSS styles
├── README.md           # Project documentation
└── images/             # Image assets
    ├── DSC00256.JPG
    ├── DSC00257.JPG
    ├── DSC00260.JPG
    └── DSC00261.JPG
```

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/looseITP/looseitpcursor.io.git
cd looseitpcursor.io
```

### 2. **Open in Browser**
Simply open `index.html` in your web browser, or serve it using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### 3. **Access the Application**
- **Main Site**: `http://localhost:8000`
- **Login Page**: `http://localhost:8000/login.html`
- **Dashboard**: `http://localhost:8000/dashboard.html` (requires login)

## 🔑 Test Credentials

The application includes several test user accounts for automated testing:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@sandboxpro.com` | `admin123` | Admin | Full access with 15 sandboxes |
| `user@sandboxpro.com` | `user123` | User | Standard access with 8 sandboxes |
| `demo@sandboxpro.com` | `demo123` | Demo | Limited access with 3 sandboxes |
| `test@sandboxpro.com` | `test123` | Test | Testing access with 5 sandboxes |

### 🎯 **Demo Credentials Helper**
- Located in the bottom-right corner of the login page
- Double-click to auto-fill admin credentials
- Perfect for quick testing and demonstrations

## 🧪 Automated Testing

This platform is designed specifically for automated testing practice. Here are the key testing scenarios:

### **Cypress.io Tests**
```javascript
// Example test scenarios
describe('SandBox Pro Login', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login.html')
    cy.get('#email').type('admin@sandboxpro.com')
    cy.get('#password').type('admin123')
    cy.get('#loginForm').submit()
    cy.url().should('include', '/dashboard.html')
  })
})
```

### **Python + Selenium Tests**
```python
# Example test scenarios
from selenium import webdriver
from selenium.webdriver.common.by import By

def test_login_functionality():
    driver = webdriver.Chrome()
    driver.get("http://localhost:8000/login.html")
    
    # Login with test credentials
    driver.find_element(By.ID, "email").send_keys("admin@sandboxpro.com")
    driver.find_element(By.ID, "password").send_keys("admin123")
    driver.find_element(By.ID, "loginForm").submit()
    
    # Verify dashboard access
    assert "dashboard.html" in driver.current_url
    driver.quit()
```

### **Key Testing Elements**
- **Form Validations**: Email format, required fields, error messages
- **Authentication Flow**: Login/logout, session management
- **UI Interactions**: Buttons, modals, dropdowns, search
- **Responsive Design**: Mobile/desktop compatibility
- **Accessibility**: Keyboard navigation, screen readers
- **Performance**: Loading states, animations

## 🎮 Interactive Features

### **Keyboard Shortcuts**
- `Ctrl + Shift + L`: Logout from dashboard
- `Ctrl + Shift + C`: Open create sandbox modal
- `Ctrl + Shift + N`: Show notifications
- `Ctrl + Enter`: Submit login form
- `Escape`: Clear login form

### **Easter Eggs**
- **Konami Code**: ↑↑↓↓←→←→BA (triggers hidden modal)
- **Demo Credentials**: Double-click helper box
- **Hidden Elements**: Various interactive features throughout

### **Role-based Features**
- **Admin**: 15 sandboxes, 4.2GB storage, 12 team members
- **User**: 8 sandboxes, 2.1GB storage, 6 team members
- **Demo**: 3 sandboxes, 0.8GB storage, 2 team members
- **Test**: 5 sandboxes, 1.5GB storage, 4 team members

## 🌐 Live Demo

**GitHub Pages**: https://looseITP.github.io/looseitpcursor.io/

## 🎯 Testing Scenarios

### **Login/Authentication Tests**
- [ ] Valid login with correct credentials
- [ ] Invalid login with wrong credentials
- [ ] Empty form validation
- [ ] Email format validation
- [ ] Password visibility toggle
- [ ] Remember me functionality
- [ ] Session persistence
- [ ] Logout functionality

### **Dashboard Tests**
- [ ] Role-based statistics display
- [ ] User menu dropdown
- [ ] Notifications system
- [ ] Search functionality
- [ ] Create sandbox modal
- [ ] Activity refresh
- [ ] Real-time updates
- [ ] Responsive design

### **UI/UX Tests**
- [ ] Hover effects and animations
- [ ] Modal interactions
- [ ] Form validations
- [ ] Loading states
- [ ] Error handling
- [ ] Keyboard navigation
- [ ] Mobile responsiveness

## 🚀 Future Enhancements

### **Planned Features**
- [ ] **Advanced Analytics Dashboard**
- [ ] **Team Management System**
- [ ] **API Integration Testing**
- [ ] **Performance Monitoring**
- [ ] **Advanced Search & Filtering**
- [ ] **Real-time Collaboration**
- [ ] **Mobile App Version**

### **Testing Framework Integration**
- [ ] **Cypress Test Suite** with visual regression
- [ ] **Selenium Test Automation** with Python
- [ ] **API Testing** with Postman/Newman
- [ ] **Performance Testing** with Lighthouse
- [ ] **Accessibility Testing** with axe-core

## 🤝 Contributing

This is a learning project for automated testing practice. Feel free to:

1. **Fork the repository**
2. **Create feature branches** for testing scenarios
3. **Add new test cases** and automation scripts
4. **Improve the UI/UX** with new features
5. **Document your findings** and testing approaches

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Project Goals

1. **Build a realistic sales platform** for testing practice
2. **Implement comprehensive automated tests** with Cypress and Selenium
3. **Add hidden easter eggs** for fun testing scenarios
4. **Create a portfolio piece** showcasing testing skills
5. **Learn modern web development** and testing best practices

---

**Built with ❤️ for automated testing practice**

*Perfect for QA engineers, developers, and anyone interested in web automation testing!*
