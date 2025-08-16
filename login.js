document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const loginButton = document.getElementById('loginButton');
    const buttonText = document.getElementById('buttonText');
    const spinner = document.getElementById('spinner');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');

    // Fake user credentials for testing
    const validCredentials = {
        'admin@sandboxpro.com': 'admin123',
        'user@sandboxpro.com': 'user123',
        'demo@sandboxpro.com': 'demo123',
        'test@sandboxpro.com': 'test123'
    };

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        // Show loading state
        setLoadingState(true);
        hideMessages();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Validate credentials
        if (validateCredentials(email, password)) {
            // Store login state
            if (remember) {
                localStorage.setItem('sandboxProUser', JSON.stringify({
                    email: email,
                    name: getUserName(email),
                    role: getUserRole(email),
                    loginTime: new Date().toISOString()
                }));
            } else {
                sessionStorage.setItem('sandboxProUser', JSON.stringify({
                    email: email,
                    name: getUserName(email),
                    role: getUserRole(email),
                    loginTime: new Date().toISOString()
                }));
            }

            // Show success message
            showSuccessMessage();
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Show error message
            showErrorMessage('Invalid email or password. Please try again.');
            setLoadingState(false);
        }
    });

    // Validate credentials
    function validateCredentials(email, password) {
        return validCredentials[email] === password;
    }

    // Get user name based on email
    function getUserName(email) {
        const userNames = {
            'admin@sandboxpro.com': 'Admin User',
            'user@sandboxpro.com': 'John Doe',
            'demo@sandboxpro.com': 'Demo User',
            'test@sandboxpro.com': 'Test User'
        };
        return userNames[email] || 'User';
    }

    // Get user role based on email
    function getUserRole(email) {
        if (email === 'admin@sandboxpro.com') return 'admin';
        if (email === 'user@sandboxpro.com') return 'user';
        if (email === 'demo@sandboxpro.com') return 'demo';
        if (email === 'test@sandboxpro.com') return 'test';
        return 'user';
    }

    // Set loading state
    function setLoadingState(loading) {
        if (loading) {
            buttonText.textContent = 'Signing In...';
            spinner.classList.remove('hidden');
            loginButton.disabled = true;
        } else {
            buttonText.textContent = 'Sign In';
            spinner.classList.add('hidden');
            loginButton.disabled = false;
        }
    }

    // Show error message
    function showErrorMessage(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('animate-pulse');
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-pulse');
    }

    // Hide all messages
    function hideMessages() {
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.remove('animate-pulse');
        successMessage.classList.remove('animate-pulse');
    }

    // Add input validation
    emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-white/20');
        } else {
            emailInput.classList.remove('border-white/20');
            emailInput.classList.add('border-red-500');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > 0) {
            passwordInput.classList.remove('border-red-500');
            passwordInput.classList.add('border-white/20');
        } else {
            passwordInput.classList.remove('border-white/20');
            passwordInput.classList.add('border-red-500');
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter to submit form
        if (e.ctrlKey && e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            loginForm.reset();
            hideMessages();
        }
    });

    // Add demo credentials helper
    const demoCredentials = document.createElement('div');
    demoCredentials.className = 'fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-xs text-gray-300 border border-white/10';
    demoCredentials.innerHTML = `
        <div class="font-semibold mb-2">Demo Credentials:</div>
        <div class="space-y-1">
            <div>admin@sandboxpro.com / admin123</div>
            <div>user@sandboxpro.com / user123</div>
            <div>demo@sandboxpro.com / demo123</div>
            <div>test@sandboxpro.com / test123</div>
        </div>
    `;
    document.body.appendChild(demoCredentials);

    // Auto-fill demo credentials on double-click
    demoCredentials.addEventListener('dblclick', () => {
        emailInput.value = 'admin@sandboxpro.com';
        passwordInput.value = 'admin123';
        document.getElementById('remember').checked = true;
    });

    console.log('Login page loaded successfully!');
    console.log('Available test credentials:', Object.keys(validCredentials));
});
