import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

class SandBoxProLoginTest(unittest.TestCase):
    def setUp(self):
        """Set up the test environment before each test"""
        # Configure Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1280,720")
        
        # Initialize the driver
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 10)
        
        # Test credentials
        self.credentials = {
            'admin': {'email': 'admin@sandboxpro.com', 'password': 'admin123', 'name': 'Admin User'},
            'user': {'email': 'user@sandboxpro.com', 'password': 'user123', 'name': 'John Doe'},
            'demo': {'email': 'demo@sandboxpro.com', 'password': 'demo123', 'name': 'Demo User'},
            'test': {'email': 'test@sandboxpro.com', 'password': 'test123', 'name': 'Test User'}
        }
        
        # Base URL
        self.base_url = "https://looseitp.github.io/looseitpcursor.io"

    def tearDown(self):
        """Clean up after each test"""
        if hasattr(self, 'driver'):
            self.driver.quit()

    def test_login_page_loads_correctly(self):
        """Test that the login page loads with all required elements"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Check page title
        self.assertIn("Login - SandBox Pro", self.driver.title)
        
        # Check main elements are present
        self.assertTrue(self.driver.find_element(By.ID, "loginForm").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "email").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "password").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "loginButton").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "togglePassword").is_displayed())
        
        # Check demo credentials helper is present
        self.assertIn("Demo Credentials:", self.driver.page_source)

    def test_admin_login_successful(self):
        """Test successful login with admin credentials"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Enter admin credentials
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys(self.credentials['admin']['email'])
        password_field.send_keys(self.credentials['admin']['password'])
        
        # Submit form
        self.driver.find_element(By.ID, "loginForm").submit()
        
        # Wait for loading state
        self.wait.until(EC.visibility_of_element_located((By.ID, "spinner")))
        
        # Wait for redirect to dashboard
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
        
        # Check dashboard elements
        self.assertIn("dashboard.html", self.driver.current_url)
        welcome_text = self.driver.find_element(By.ID, "welcomeUserName").text
        self.assertIn(self.credentials['admin']['name'], welcome_text)
        
        # Check admin-specific stats
        active_sandboxes = self.driver.find_element(By.ID, "activeSandboxes").text
        self.assertEqual("15", active_sandboxes)
        
        storage_used = self.driver.find_element(By.ID, "storageUsed").text
        self.assertEqual("4.2 GB", storage_used)
        
        team_members = self.driver.find_element(By.ID, "teamMembers").text
        self.assertEqual("12", team_members)

    def test_user_login_successful(self):
        """Test successful login with user credentials"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Enter user credentials
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys(self.credentials['user']['email'])
        password_field.send_keys(self.credentials['user']['password'])
        
        # Submit form
        self.driver.find_element(By.ID, "loginForm").submit()
        
        # Wait for redirect to dashboard
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
        
        # Check dashboard elements
        welcome_text = self.driver.find_element(By.ID, "welcomeUserName").text
        self.assertIn(self.credentials['user']['name'], welcome_text)
        
        # Check user-specific stats
        active_sandboxes = self.driver.find_element(By.ID, "activeSandboxes").text
        self.assertEqual("8", active_sandboxes)
        
        storage_used = self.driver.find_element(By.ID, "storageUsed").text
        self.assertEqual("2.1 GB", storage_used)
        
        team_members = self.driver.find_element(By.ID, "teamMembers").text
        self.assertEqual("6", team_members)

    def test_demo_login_successful(self):
        """Test successful login with demo credentials"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Enter demo credentials
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys(self.credentials['demo']['email'])
        password_field.send_keys(self.credentials['demo']['password'])
        
        # Submit form
        self.driver.find_element(By.ID, "loginForm").submit()
        
        # Wait for redirect to dashboard
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
        
        # Check dashboard elements
        welcome_text = self.driver.find_element(By.ID, "welcomeUserName").text
        self.assertIn(self.credentials['demo']['name'], welcome_text)
        
        # Check demo-specific stats
        active_sandboxes = self.driver.find_element(By.ID, "activeSandboxes").text
        self.assertEqual("3", active_sandboxes)
        
        storage_used = self.driver.find_element(By.ID, "storageUsed").text
        self.assertEqual("0.8 GB", storage_used)
        
        team_members = self.driver.find_element(By.ID, "teamMembers").text
        self.assertEqual("2", team_members)

    def test_invalid_credentials_error(self):
        """Test error handling for invalid credentials"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Enter invalid credentials
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys("invalid@email.com")
        password_field.send_keys("wrongpassword")
        
        # Submit form
        self.driver.find_element(By.ID, "loginForm").submit()
        
        # Wait for error message
        error_message = self.wait.until(EC.visibility_of_element_located((By.ID, "errorMessage")))
        
        # Check error message
        self.assertTrue(error_message.is_displayed())
        self.assertIn("Invalid email or password", error_message.text)
        
        # Should stay on login page
        self.assertIn("login.html", self.driver.current_url)

    def test_password_visibility_toggle(self):
        """Test password visibility toggle functionality"""
        self.driver.get(f"{self.base_url}/login.html")
        
        password_field = self.driver.find_element(By.ID, "password")
        toggle_button = self.driver.find_element(By.ID, "togglePassword")
        eye_icon = self.driver.find_element(By.ID, "eyeIcon")
        
        # Initially password should be hidden
        self.assertEqual("password", password_field.get_attribute("type"))
        self.assertIn("fa-eye", eye_icon.get_attribute("class"))
        
        # Click toggle button
        toggle_button.click()
        
        # Password should now be visible
        self.assertEqual("text", password_field.get_attribute("type"))
        self.assertIn("fa-eye-slash", eye_icon.get_attribute("class"))
        
        # Click again to hide
        toggle_button.click()
        
        # Password should be hidden again
        self.assertEqual("password", password_field.get_attribute("type"))
        self.assertIn("fa-eye", eye_icon.get_attribute("class"))

    def test_remember_me_checkbox(self):
        """Test remember me checkbox functionality"""
        self.driver.get(f"{self.base_url}/login.html")
        
        remember_checkbox = self.driver.find_element(By.ID, "remember")
        
        # Initially should not be checked
        self.assertFalse(remember_checkbox.is_selected())
        
        # Check the checkbox
        remember_checkbox.click()
        self.assertTrue(remember_checkbox.is_selected())
        
        # Uncheck the checkbox
        remember_checkbox.click()
        self.assertFalse(remember_checkbox.is_selected())

    def test_demo_credentials_helper(self):
        """Test demo credentials helper functionality"""
        self.driver.get(f"{self.base_url}/login.html")
        
        # Find and double-click demo credentials helper
        demo_helper = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Demo Credentials:')]")
        self.driver.execute_script("arguments[0].dispatchEvent(new MouseEvent('dblclick', {bubbles: true}));", demo_helper)
        
        # Check if credentials are auto-filled
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        remember_checkbox = self.driver.find_element(By.ID, "remember")
        
        self.assertEqual("admin@sandboxpro.com", email_field.get_attribute("value"))
        self.assertEqual("admin123", password_field.get_attribute("value"))
        self.assertTrue(remember_checkbox.is_selected())

    def test_keyboard_shortcuts(self):
        """Test keyboard shortcuts functionality"""
        self.driver.get(f"{self.base_url}/login.html")
        
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        # Enter credentials
        email_field.send_keys(self.credentials['admin']['email'])
        password_field.send_keys(self.credentials['admin']['password'])
        
        # Use Ctrl+Enter to submit
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.CONTROL + Keys.ENTER)
        
        # Wait for redirect to dashboard
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
        self.assertIn("dashboard.html", self.driver.current_url)

    def test_escape_key_clears_form(self):
        """Test escape key clears the form"""
        self.driver.get(f"{self.base_url}/login.html")
        
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        # Enter some text
        email_field.send_keys("test@email.com")
        password_field.send_keys("testpassword")
        
        # Press escape key
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.ESCAPE)
        
        # Check if fields are cleared
        self.assertEqual("", email_field.get_attribute("value"))
        self.assertEqual("", password_field.get_attribute("value"))

    def test_email_validation(self):
        """Test email format validation"""
        self.driver.get(f"{self.base_url}/login.html")
        
        email_field = self.driver.find_element(By.ID, "email")
        
        # Enter invalid email
        email_field.send_keys("invalid-email")
        email_field.send_keys(Keys.TAB)  # Trigger blur event
        
        # Check for validation error styling
        self.assertIn("border-red-500", email_field.get_attribute("class"))

if __name__ == "__main__":
    unittest.main()
