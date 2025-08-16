import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

class SandBoxProDashboardTest(unittest.TestCase):
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

    def login_as_admin(self):
        """Helper method to login as admin"""
        self.driver.get(f"{self.base_url}/login.html")
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys(self.credentials['admin']['email'])
        password_field.send_keys(self.credentials['admin']['password'])
        
        self.driver.find_element(By.ID, "loginForm").submit()
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)

    def test_dashboard_loads_correctly(self):
        """Test that the dashboard loads with all required elements"""
        self.login_as_admin()
        
        # Check page title
        self.assertIn("Dashboard - SandBox Pro", self.driver.title)
        
        # Check main dashboard elements
        self.assertTrue(self.driver.find_element(By.ID, "welcomeUserName").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "activeSandboxes").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "storageUsed").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "teamMembers").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "uptime").is_displayed())
        
        # Check navigation elements
        self.assertTrue(self.driver.find_element(By.ID, "notificationsBtn").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "userMenuBtn").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "createSandboxBtn").is_displayed())

    def test_admin_statistics_display(self):
        """Test that admin statistics are displayed correctly"""
        self.login_as_admin()
        
        # Check admin-specific stats
        active_sandboxes = self.driver.find_element(By.ID, "activeSandboxes").text
        self.assertEqual("15", active_sandboxes)
        
        storage_used = self.driver.find_element(By.ID, "storageUsed").text
        self.assertEqual("4.2 GB", storage_used)
        
        team_members = self.driver.find_element(By.ID, "teamMembers").text
        self.assertEqual("12", team_members)
        
        uptime = self.driver.find_element(By.ID, "uptime").text
        self.assertEqual("99.9%", uptime)

    def test_user_menu_dropdown(self):
        """Test user menu dropdown functionality"""
        self.login_as_admin()
        
        user_menu_btn = self.driver.find_element(By.ID, "userMenuBtn")
        user_dropdown = self.driver.find_element(By.ID, "userDropdown")
        
        # Initially dropdown should be hidden
        self.assertFalse(user_dropdown.is_displayed())
        
        # Click to open dropdown
        user_menu_btn.click()
        self.assertTrue(user_dropdown.is_displayed())
        
        # Click outside to close
        self.driver.find_element(By.TAG_NAME, "body").click()
        self.assertFalse(user_dropdown.is_displayed())

    def test_logout_functionality(self):
        """Test logout functionality"""
        self.login_as_admin()
        
        # Open user menu and click logout
        self.driver.find_element(By.ID, "userMenuBtn").click()
        self.driver.find_element(By.ID, "logoutBtn").click()
        
        # Should redirect to login page
        self.wait.until(lambda driver: "login.html" in driver.current_url)
        self.assertIn("login.html", self.driver.current_url)

    def test_notifications_popup(self):
        """Test notifications popup functionality"""
        self.login_as_admin()
        
        # Click notifications button
        self.driver.find_element(By.ID, "notificationsBtn").click()
        
        # Check notification popup appears
        self.assertIn("Notifications", self.driver.page_source)
        self.assertIn("New feature: Advanced analytics dashboard", self.driver.page_source)
        self.assertIn("Your sandbox \"Python-Data\" will be stopped", self.driver.page_source)
        self.assertIn("Team member Sarah Chen has been successfully added", self.driver.page_source)
        
        # Notification badge should be hidden
        notification_badge = self.driver.find_element(By.ID, "notificationBadge")
        self.assertEqual("none", notification_badge.value_of_css_property("display"))

    def test_create_sandbox_modal(self):
        """Test create sandbox modal functionality"""
        self.login_as_admin()
        
        # Click create sandbox button
        self.driver.find_element(By.ID, "createSandboxBtn").click()
        
        # Check modal is visible
        modal = self.driver.find_element(By.ID, "createSandboxModal")
        self.assertTrue(modal.is_displayed())
        
        # Check modal elements
        self.assertTrue(self.driver.find_element(By.ID, "sandboxName").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "sandboxTemplate").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "cancelCreate").is_displayed())

    def test_create_new_sandbox(self):
        """Test creating a new sandbox"""
        self.login_as_admin()
        
        # Open create sandbox modal
        self.driver.find_element(By.ID, "createSandboxBtn").click()
        
        # Fill in sandbox details
        sandbox_name = self.driver.find_element(By.ID, "sandboxName")
        sandbox_template = self.driver.find_element(By.ID, "sandboxTemplate")
        
        sandbox_name.send_keys("Test Sandbox")
        sandbox_template.send_keys("React")
        
        # Submit form
        self.driver.find_element(By.ID, "createSandboxForm").submit()
        
        # Check loading state
        submit_button = self.driver.find_element(By.CSS_SELECTOR, "#createSandboxForm button[type='submit']")
        self.assertIn("Creating...", submit_button.text)
        
        # Wait for modal to close and check new sandbox appears
        self.wait.until(EC.invisibility_of_element_located((By.ID, "createSandboxModal")))
        self.assertIn("Test Sandbox", self.driver.page_source)

    def test_search_sandboxes(self):
        """Test sandbox search functionality"""
        self.login_as_admin()
        
        search_field = self.driver.find_element(By.ID, "searchSandboxes")
        search_field.send_keys("React")
        
        # Should filter to show only React sandbox
        self.assertIn("React-App", self.driver.page_source)
        # Node-API should not be visible (filtered out)
        sandboxes_table = self.driver.find_element(By.ID, "sandboxesTableBody")
        self.assertNotIn("Node-API", sandboxes_table.text)

    def test_refresh_activity(self):
        """Test activity refresh functionality"""
        self.login_as_admin()
        
        refresh_btn = self.driver.find_element(By.ID, "refreshActivity")
        refresh_btn.click()
        
        # Check loading state
        self.assertIn("Refreshing...", refresh_btn.text)
        
        # Wait for completion and check success message
        time.sleep(2)  # Wait for toast message
        self.assertIn("Activity refreshed!", self.driver.page_source)

    def test_quick_action_buttons(self):
        """Test quick action buttons functionality"""
        self.login_as_admin()
        
        # Test invite team button
        self.driver.find_element(By.ID, "inviteTeamBtn").click()
        time.sleep(1)  # Wait for toast message
        self.assertIn("Invite team functionality coming soon!", self.driver.page_source)
        
        # Test analytics button
        self.driver.find_element(By.ID, "viewAnalyticsBtn").click()
        time.sleep(1)  # Wait for toast message
        self.assertIn("Analytics dashboard coming soon!", self.driver.page_source)
        
        # Test settings button
        self.driver.find_element(By.ID, "settingsBtn").click()
        time.sleep(1)  # Wait for toast message
        self.assertIn("Settings panel coming soon!", self.driver.page_source)

    def test_system_status_display(self):
        """Test system status display"""
        self.login_as_admin()
        
        # Check system status elements
        self.assertIn("API Services", self.driver.page_source)
        self.assertIn("Database", self.driver.page_source)
        self.assertIn("CDN", self.driver.page_source)
        self.assertIn("Monitoring", self.driver.page_source)
        
        # Check status indicators
        self.assertIn("Online", self.driver.page_source)
        self.assertIn("Warning", self.driver.page_source)

    def test_keyboard_shortcuts(self):
        """Test keyboard shortcuts functionality"""
        self.login_as_admin()
        
        # Test Ctrl+Shift+L for logout
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.CONTROL + Keys.SHIFT + "l")
        self.wait.until(lambda driver: "login.html" in driver.current_url)
        
        # Login again for next test
        self.login_as_admin()
        
        # Test Ctrl+Shift+C for create sandbox
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.CONTROL + Keys.SHIFT + "c")
        modal = self.driver.find_element(By.ID, "createSandboxModal")
        self.assertTrue(modal.is_displayed())
        
        # Close modal
        self.driver.find_element(By.ID, "cancelCreate").click()
        
        # Test Ctrl+Shift+N for notifications
        self.driver.find_element(By.TAG_NAME, "body").send_keys(Keys.CONTROL + Keys.SHIFT + "n")
        self.assertIn("Notifications", self.driver.page_source)

    def test_konami_code_easter_egg(self):
        """Test Konami code easter egg"""
        self.login_as_admin()
        
        # Enter Konami code: ↑↑↓↓←→←→BA
        body = self.driver.find_element(By.TAG_NAME, "body")
        body.send_keys(Keys.ARROW_UP)
        body.send_keys(Keys.ARROW_UP)
        body.send_keys(Keys.ARROW_DOWN)
        body.send_keys(Keys.ARROW_DOWN)
        body.send_keys(Keys.ARROW_LEFT)
        body.send_keys(Keys.ARROW_RIGHT)
        body.send_keys(Keys.ARROW_LEFT)
        body.send_keys(Keys.ARROW_RIGHT)
        body.send_keys("b")
        body.send_keys("a")
        
        # Check easter egg modal
        self.assertIn("🎉 Easter Egg Found! 🎉", self.driver.page_source)
        self.assertIn("You discovered the secret Konami code!", self.driver.page_source)

    def test_sandboxes_table_display(self):
        """Test sandboxes table display"""
        self.login_as_admin()
        
        # Check table structure
        table_body = self.driver.find_element(By.ID, "sandboxesTableBody")
        rows = table_body.find_elements(By.TAG_NAME, "tr")
        self.assertEqual(3, len(rows))  # Should have 3 sandboxes
        
        # Check existing sandboxes
        self.assertIn("React-App", self.driver.page_source)
        self.assertIn("Node-API", self.driver.page_source)
        self.assertIn("Python-Data", self.driver.page_source)
        
        # Check status badges
        self.assertIn("Running", self.driver.page_source)
        self.assertIn("Stopped", self.driver.page_source)

    def test_responsive_design(self):
        """Test responsive design functionality"""
        self.login_as_admin()
        
        # Test mobile viewport
        self.driver.set_window_size(375, 667)
        self.assertTrue(self.driver.find_element(By.ID, "welcomeUserName").is_displayed())
        self.assertTrue(self.driver.find_element(By.ID, "createSandboxBtn").is_displayed())
        
        # Test tablet viewport
        self.driver.set_window_size(768, 1024)
        self.assertTrue(self.driver.find_element(By.ID, "welcomeUserName").is_displayed())
        
        # Test desktop viewport
        self.driver.set_window_size(1280, 720)
        self.assertTrue(self.driver.find_element(By.ID, "welcomeUserName").is_displayed())

    def test_role_based_statistics(self):
        """Test different user roles show different statistics"""
        # Test user role
        self.driver.get(f"{self.base_url}/login.html")
        email_field = self.driver.find_element(By.ID, "email")
        password_field = self.driver.find_element(By.ID, "password")
        
        email_field.send_keys(self.credentials['user']['email'])
        password_field.send_keys(self.credentials['user']['password'])
        self.driver.find_element(By.ID, "loginForm").submit()
        
        self.wait.until(lambda driver: "dashboard.html" in driver.current_url)
        
        # Check user-specific stats
        active_sandboxes = self.driver.find_element(By.ID, "activeSandboxes").text
        self.assertEqual("8", active_sandboxes)
        
        storage_used = self.driver.find_element(By.ID, "storageUsed").text
        self.assertEqual("2.1 GB", storage_used)
        
        team_members = self.driver.find_element(By.ID, "teamMembers").text
        self.assertEqual("6", team_members)

if __name__ == "__main__":
    unittest.main()
