document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = getUserFromStorage();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize dashboard
    initializeDashboard(user);

    // Event listeners
    setupEventListeners();

    // Update stats periodically
    setInterval(updateStats, 30000); // Update every 30 seconds

    console.log('Dashboard loaded successfully for user:', user.name);
});

function getUserFromStorage() {
    const user = localStorage.getItem('sandboxProUser') || sessionStorage.getItem('sandboxProUser');
    return user ? JSON.parse(user) : null;
}

function initializeDashboard(user) {
    // Set user information
    document.getElementById('userName').textContent = user.name;
    document.getElementById('welcomeUserName').textContent = user.name;

    // Update stats based on user role
    updateStatsForUser(user.role);
}

function updateStatsForUser(role) {
    const stats = {
        admin: { sandboxes: 15, storage: '4.2 GB', team: 12, uptime: '99.9%' },
        user: { sandboxes: 8, storage: '2.1 GB', team: 6, uptime: '99.8%' },
        demo: { sandboxes: 3, storage: '0.8 GB', team: 2, uptime: '99.7%' },
        test: { sandboxes: 5, storage: '1.5 GB', team: 4, uptime: '99.6%' }
    };

    const userStats = stats[role] || stats.user;
    
    document.getElementById('activeSandboxes').textContent = userStats.sandboxes;
    document.getElementById('storageUsed').textContent = userStats.storage;
    document.getElementById('teamMembers').textContent = userStats.team;
    document.getElementById('uptime').textContent = userStats.uptime;
}

function setupEventListeners() {
    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    userMenuBtn.addEventListener('click', () => {
        userDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        logout();
    });

    // Notifications
    document.getElementById('notificationsBtn').addEventListener('click', () => {
        showNotifications();
    });

    // Quick action buttons
    document.getElementById('createSandboxBtn').addEventListener('click', () => {
        showCreateSandboxModal();
    });

    document.getElementById('inviteTeamBtn').addEventListener('click', () => {
        showInviteTeamModal();
    });

    document.getElementById('viewAnalyticsBtn').addEventListener('click', () => {
        showAnalytics();
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
        showSettings();
    });

    // Refresh activity
    document.getElementById('refreshActivity').addEventListener('click', () => {
        refreshActivity();
    });

    // Search functionality
    document.getElementById('searchSandboxes').addEventListener('input', (e) => {
        searchSandboxes(e.target.value);
    });

    // Create sandbox modal
    const createSandboxModal = document.getElementById('createSandboxModal');
    const createSandboxForm = document.getElementById('createSandboxForm');
    const cancelCreate = document.getElementById('cancelCreate');

    cancelCreate.addEventListener('click', () => {
        createSandboxModal.classList.add('hidden');
    });

    createSandboxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createSandbox();
    });

    // Close modal when clicking outside
    createSandboxModal.addEventListener('click', (e) => {
        if (e.target === createSandboxModal) {
            createSandboxModal.classList.add('hidden');
        }
    });
}

function logout() {
    // Clear storage
    localStorage.removeItem('sandboxProUser');
    sessionStorage.removeItem('sandboxProUser');
    
    // Redirect to login
    window.location.href = 'login.html';
}

function showNotifications() {
    const notifications = [
        { type: 'info', message: 'New feature: Advanced analytics dashboard is now available!' },
        { type: 'warning', message: 'Your sandbox "Python-Data" will be stopped in 30 minutes due to inactivity.' },
        { type: 'success', message: 'Team member Sarah Chen has been successfully added to your project.' }
    ];

    // Create notification popup
    const popup = document.createElement('div');
    popup.className = 'fixed top-20 right-4 w-80 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 z-50';
    popup.innerHTML = `
        <div class="p-4">
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-white">Notifications</h4>
                <button class="text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-3">
                ${notifications.map(notification => `
                    <div class="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                        <div class="w-2 h-2 rounded-full mt-2 ${notification.type === 'success' ? 'bg-green-400' : notification.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}"></div>
                        <p class="text-gray-300 text-sm">${notification.message}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Remove notification badge
    document.getElementById('notificationBadge').style.display = 'none';

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

function showCreateSandboxModal() {
    document.getElementById('createSandboxModal').classList.remove('hidden');
}

function createSandbox() {
    const name = document.getElementById('sandboxName').value;
    const template = document.getElementById('sandboxTemplate').value;

    if (!name.trim()) {
        alert('Please enter a sandbox name');
        return;
    }

    // Simulate sandbox creation
    const loadingBtn = document.querySelector('#createSandboxForm button[type="submit"]');
    const originalText = loadingBtn.textContent;
    loadingBtn.textContent = 'Creating...';
    loadingBtn.disabled = true;

    setTimeout(() => {
        // Add new sandbox to table
        addSandboxToTable(name, template);
        
        // Close modal
        document.getElementById('createSandboxModal').classList.add('hidden');
        document.getElementById('createSandboxForm').reset();
        
        // Reset button
        loadingBtn.textContent = originalText;
        loadingBtn.disabled = false;

        // Show success message
        showToast('Sandbox created successfully!', 'success');
    }, 2000);
}

function addSandboxToTable(name, template) {
    const tbody = document.getElementById('sandboxesTableBody');
    const templateIcons = {
        'react': 'fab fa-react',
        'node': 'fab fa-node-js',
        'python': 'fab fa-python',
        'vue': 'fab fa-vuejs',
        'angular': 'fab fa-angular'
    };
    const templateColors = {
        'react': 'blue',
        'node': 'green',
        'python': 'yellow',
        'vue': 'green',
        'angular': 'red'
    };

    const newRow = document.createElement('tr');
    newRow.className = 'border-b border-white/5 hover:bg-white/5 transition duration-300';
    newRow.innerHTML = `
        <td class="py-3 px-4">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-${templateColors[template]}-500/20 rounded-lg flex items-center justify-center">
                    <i class="${templateIcons[template]} text-${templateColors[template]}-400"></i>
                </div>
                <span class="text-white font-medium">${name}</span>
            </div>
        </td>
        <td class="py-3 px-4">
            <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Starting</span>
        </td>
        <td class="py-3 px-4 text-gray-300">${template.charAt(0).toUpperCase() + template.slice(1)}</td>
        <td class="py-3 px-4 text-gray-300">Just now</td>
        <td class="py-3 px-4">
            <div class="flex space-x-2">
                <button class="text-blue-400 hover:text-blue-300 transition duration-300">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="text-purple-400 hover:text-purple-300 transition duration-300">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-400 hover:text-red-300 transition duration-300">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;

    tbody.insertBefore(newRow, tbody.firstChild);
}

function showInviteTeamModal() {
    showToast('Invite team functionality coming soon!', 'info');
}

function showAnalytics() {
    showToast('Analytics dashboard coming soon!', 'info');
}

function showSettings() {
    showToast('Settings panel coming soon!', 'info');
}

function refreshActivity() {
    const refreshBtn = document.getElementById('refreshActivity');
    const originalText = refreshBtn.innerHTML;
    
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Refreshing...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        showToast('Activity refreshed!', 'success');
    }, 1500);
}

function searchSandboxes(query) {
    const rows = document.querySelectorAll('#sandboxesTableBody tr');
    
    rows.forEach(row => {
        const name = row.querySelector('td:first-child span').textContent.toLowerCase();
        if (name.includes(query.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function updateStats() {
    // Simulate real-time updates
    const activeSandboxes = document.getElementById('activeSandboxes');
    const currentCount = parseInt(activeSandboxes.textContent);
    const newCount = currentCount + Math.floor(Math.random() * 3) - 1; // Random change
    activeSandboxes.textContent = Math.max(0, newCount);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white z-50 transition-all duration-300 transform translate-y-full`;
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    toast.classList.add(colors[type]);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-y-full');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Add some interactive features for testing
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+L to logout
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        logout();
    }
    
    // Ctrl+Shift+C to create sandbox
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        showCreateSandboxModal();
    }
    
    // Ctrl+Shift+N to show notifications
    if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        showNotifications();
    }
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEasterEgg();
        konamiCode = [];
    }
});

function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    easterEgg.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10 text-center">
            <h3 class="text-2xl font-bold text-white mb-4">🎉 Easter Egg Found! 🎉</h3>
            <p class="text-gray-300 mb-6">You discovered the secret Konami code! This is perfect for testing keyboard interactions.</p>
            <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300" onclick="this.parentElement.parentElement.remove()">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(easterEgg);
}
