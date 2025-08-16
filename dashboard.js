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
    
    // Initialize real-time features
    initializeRealTimeFeatures();
    
    // Start sandbox monitoring
    startSandboxMonitoring();
    
    // Initialize performance charts
    initializePerformanceCharts();

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

// ===== ENHANCED SANDBOX FUNCTIONALITY =====

function initializeRealTimeFeatures() {
    // Add real-time indicators
    addRealTimeIndicators();
    
    // Initialize team chat
    initializeTeamChat();
    
    // Add deployment pipeline
    addDeploymentPipeline();
    
    // Initialize cost tracking
    initializeCostTracking();
}

function addRealTimeIndicators() {
    const header = document.querySelector('header');
    const realTimeIndicator = document.createElement('div');
    realTimeIndicator.className = 'absolute top-4 right-4 flex items-center space-x-2';
    realTimeIndicator.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-xs text-green-400 font-medium">LIVE</span>
        </div>
    `;
    header.appendChild(realTimeIndicator);
}

function startSandboxMonitoring() {
    // Simulate real-time sandbox status updates
    setInterval(() => {
        const sandboxRows = document.querySelectorAll('#sandboxesTableBody tr');
        sandboxRows.forEach(row => {
            const statusCell = row.querySelector('td:nth-child(2) span');
            if (statusCell && Math.random() > 0.95) { // 5% chance to change status
                const statuses = ['Running', 'Starting', 'Stopping', 'Warning'];
                const colors = ['green', 'yellow', 'orange', 'red'];
                const randomIndex = Math.floor(Math.random() * statuses.length);
                statusCell.textContent = statuses[randomIndex];
                statusCell.className = `bg-${colors[randomIndex]}-500/20 text-${colors[randomIndex]}-400 px-2 py-1 rounded-full text-xs`;
            }
        });
    }, 5000);
}

function initializePerformanceCharts() {
    // Add performance monitoring section
    const mainContent = document.querySelector('main');
    const performanceSection = document.createElement('div');
    performanceSection.className = 'mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10';
    performanceSection.innerHTML = `
        <h3 class="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/5 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-300 mb-2">CPU Usage</h4>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-gray-700 rounded-full h-2">
                        <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000" style="width: ${Math.floor(Math.random() * 80 + 20)}%"></div>
                    </div>
                    <span class="text-sm text-white">${Math.floor(Math.random() * 80 + 20)}%</span>
                </div>
            </div>
            <div class="bg-white/5 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-300 mb-2">Memory Usage</h4>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-gray-700 rounded-full h-2">
                        <div class="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000" style="width: ${Math.floor(Math.random() * 60 + 30)}%"></div>
                    </div>
                    <span class="text-sm text-white">${Math.floor(Math.random() * 60 + 30)}%</span>
                </div>
            </div>
            <div class="bg-white/5 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-300 mb-2">Network I/O</h4>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-gray-700 rounded-full h-2">
                        <div class="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000" style="width: ${Math.floor(Math.random() * 70 + 20)}%"></div>
                    </div>
                    <span class="text-sm text-white">${Math.floor(Math.random() * 70 + 20)}%</span>
                </div>
            </div>
        </div>
    `;
    mainContent.appendChild(performanceSection);
    
    // Update charts every 3 seconds
    setInterval(() => {
        const progressBars = performanceSection.querySelectorAll('.bg-gradient-to-r');
        progressBars.forEach(bar => {
            const newWidth = Math.floor(Math.random() * 80 + 20);
            bar.style.width = `${newWidth}%`;
            bar.nextElementSibling.textContent = `${newWidth}%`;
        });
    }, 3000);
}

function initializeTeamChat() {
    const mainContent = document.querySelector('main');
    const chatSection = document.createElement('div');
    chatSection.className = 'mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10';
    chatSection.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-white">Team Chat</h3>
            <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span class="text-sm text-green-400">3 online</span>
            </div>
        </div>
        <div class="bg-white/5 rounded-lg p-4 h-48 overflow-y-auto mb-4" id="chatMessages">
            <div class="space-y-3">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">JD</div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <span class="text-white font-medium text-sm">John Doe</span>
                            <span class="text-gray-400 text-xs">2 min ago</span>
                        </div>
                        <p class="text-gray-300 text-sm">Just deployed the new API endpoints to staging</p>
                    </div>
                </div>
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">SC</div>
                    <div>
                        <div class="flex items-center space-x-2">
                            <span class="text-white font-medium text-sm">Sarah Chen</span>
                            <span class="text-gray-400 text-xs">1 min ago</span>
                        </div>
                        <p class="text-gray-300 text-sm">Great! I'll test them in the React sandbox</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex space-x-2">
            <input type="text" placeholder="Type a message..." class="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400">
            <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    mainContent.appendChild(chatSection);
    
    // Simulate new messages
    setInterval(() => {
        const messages = [
            { name: 'John Doe', avatar: 'JD', color: 'blue', message: 'The new analytics dashboard is ready for review' },
            { name: 'Sarah Chen', avatar: 'SC', color: 'purple', message: 'I found a bug in the Python sandbox, fixing it now' },
            { name: 'Mike Johnson', avatar: 'MJ', color: 'green', message: 'Deployment to production completed successfully' }
        ];
        
        if (Math.random() > 0.7) { // 30% chance for new message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const chatContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'flex items-start space-x-3';
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-${randomMessage.color}-500 rounded-full flex items-center justify-center text-white text-sm font-medium">${randomMessage.avatar}</div>
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="text-white font-medium text-sm">${randomMessage.name}</span>
                        <span class="text-gray-400 text-xs">just now</span>
                    </div>
                    <p class="text-gray-300 text-sm">${randomMessage.message}</p>
                </div>
            `;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 10000);
}

function addDeploymentPipeline() {
    const mainContent = document.querySelector('main');
    const pipelineSection = document.createElement('div');
    pipelineSection.className = 'mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10';
    pipelineSection.innerHTML = `
        <h3 class="text-xl font-semibold text-white mb-4">Deployment Pipeline</h3>
        <div class="space-y-4">
            <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-white font-medium">Build</span>
                <span class="text-gray-400 text-sm">✓ Completed</span>
                <span class="text-gray-500 text-xs">2 min ago</span>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <span class="text-white font-medium">Test</span>
                <span class="text-gray-400 text-sm">✓ Passed</span>
                <span class="text-gray-500 text-xs">1 min ago</span>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-yellow-500/20 rounded-lg">
                <div class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span class="text-white font-medium">Deploy to Staging</span>
                <span class="text-yellow-400 text-sm">🔄 In Progress</span>
                <span class="text-gray-500 text-xs">30s ago</span>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span class="text-gray-400 font-medium">Deploy to Production</span>
                <span class="text-gray-500 text-sm">⏳ Pending</span>
                <span class="text-gray-500 text-xs">-</span>
            </div>
        </div>
    `;
    mainContent.appendChild(pipelineSection);
    
    // Simulate pipeline progression
    setTimeout(() => {
        const stagingStep = pipelineSection.querySelector('.bg-yellow-500\\/20');
        stagingStep.className = 'flex items-center space-x-4 p-4 bg-green-500/20 rounded-lg';
        stagingStep.querySelector('.bg-yellow-400').className = 'w-3 h-3 bg-green-400 rounded-full';
        stagingStep.querySelector('.text-yellow-400').className = 'text-green-400 text-sm';
        stagingStep.querySelector('.text-yellow-400').textContent = '✓ Completed';
        
        // Start production deployment
        setTimeout(() => {
            const productionStep = pipelineSection.querySelector('.bg-gray-700\\/50');
            productionStep.className = 'flex items-center space-x-4 p-4 bg-yellow-500/20 rounded-lg';
            productionStep.querySelector('.bg-gray-500').className = 'w-3 h-3 bg-yellow-400 rounded-full animate-pulse';
            productionStep.querySelector('.text-gray-500').className = 'text-yellow-400 text-sm';
            productionStep.querySelector('.text-gray-500').textContent = '🔄 In Progress';
        }, 3000);
    }, 5000);
}

function initializeCostTracking() {
    const mainContent = document.querySelector('main');
    const costSection = document.createElement('div');
    costSection.className = 'mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10';
    costSection.innerHTML = `
        <h3 class="text-xl font-semibold text-white mb-4">Cost Tracking</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white/5 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-300 mb-2">This Month</h4>
                <div class="text-2xl font-bold text-white">$${(Math.random() * 500 + 200).toFixed(2)}</div>
                <div class="text-sm text-green-400 mt-1">↓ 12% vs last month</div>
            </div>
            <div class="bg-white/5 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-300 mb-2">Projected</h4>
                <div class="text-2xl font-bold text-white">$${(Math.random() * 800 + 400).toFixed(2)}</div>
                <div class="text-sm text-yellow-400 mt-1">↑ 8% vs last month</div>
            </div>
        </div>
        <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-300 mb-2">Cost Breakdown</h4>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Compute Resources</span>
                    <span class="text-white text-sm">$${(Math.random() * 300 + 150).toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Storage</span>
                    <span class="text-white text-sm">$${(Math.random() * 100 + 50).toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Network Transfer</span>
                    <span class="text-white text-sm">$${(Math.random() * 50 + 20).toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
    mainContent.appendChild(costSection);
}

// Enhanced sandbox controls
function addSandboxControls() {
    const sandboxRows = document.querySelectorAll('#sandboxesTableBody tr');
    sandboxRows.forEach(row => {
        const actionsCell = row.querySelector('td:last-child');
        if (actionsCell) {
            actionsCell.innerHTML = `
                <div class="flex space-x-2">
                    <button class="text-blue-400 hover:text-blue-300 transition duration-300" onclick="openSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="text-green-400 hover:text-green-300 transition duration-300" onclick="startSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="text-yellow-400 hover:text-yellow-300 transition duration-300" onclick="restartSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="text-red-400 hover:text-red-300 transition duration-300" onclick="stopSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-stop"></i>
                    </button>
                    <button class="text-purple-400 hover:text-purple-300 transition duration-300" onclick="scaleSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                    <button class="text-gray-400 hover:text-gray-300 transition duration-300" onclick="deleteSandbox('${row.querySelector('td:first-child span').textContent}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }
    });
}

function openSandbox(name) {
    showToast(`Opening sandbox: ${name}`, 'info');
    // Simulate opening sandbox in new tab
    setTimeout(() => {
        showToast(`Sandbox ${name} opened successfully!`, 'success');
    }, 1000);
}

function startSandbox(name) {
    showToast(`Starting sandbox: ${name}`, 'info');
    setTimeout(() => {
        showToast(`Sandbox ${name} started successfully!`, 'success');
    }, 2000);
}

function restartSandbox(name) {
    showToast(`Restarting sandbox: ${name}`, 'warning');
    setTimeout(() => {
        showToast(`Sandbox ${name} restarted successfully!`, 'success');
    }, 3000);
}

function stopSandbox(name) {
    showToast(`Stopping sandbox: ${name}`, 'warning');
    setTimeout(() => {
        showToast(`Sandbox ${name} stopped successfully!`, 'success');
    }, 2000);
}

function scaleSandbox(name) {
    showScaleModal(name);
}

function deleteSandbox(name) {
    if (confirm(`Are you sure you want to delete sandbox "${name}"?`)) {
        showToast(`Deleting sandbox: ${name}`, 'warning');
        setTimeout(() => {
            const row = Array.from(document.querySelectorAll('#sandboxesTableBody tr')).find(r => 
                r.querySelector('td:first-child span').textContent === name
            );
            if (row) {
                row.remove();
                showToast(`Sandbox ${name} deleted successfully!`, 'success');
            }
        }, 2000);
    }
}

function showScaleModal(sandboxName) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Scale Sandbox: ${sandboxName}</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-300 text-sm mb-2">CPU Cores</label>
                    <input type="range" min="1" max="8" value="2" class="w-full" id="cpuSlider">
                    <div class="flex justify-between text-xs text-gray-400">
                        <span>1 Core</span>
                        <span id="cpuValue">2 Cores</span>
                        <span>8 Cores</span>
                    </div>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Memory (GB)</label>
                    <input type="range" min="1" max="16" value="4" class="w-full" id="memorySlider">
                    <div class="flex justify-between text-xs text-gray-400">
                        <span>1 GB</span>
                        <span id="memoryValue">4 GB</span>
                        <span>16 GB</span>
                    </div>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Instances</label>
                    <input type="range" min="1" max="5" value="1" class="w-full" id="instancesSlider">
                    <div class="flex justify-between text-xs text-gray-400">
                        <span>1 Instance</span>
                        <span id="instancesValue">1 Instance</span>
                        <span>5 Instances</span>
                    </div>
                </div>
            </div>
            <div class="flex space-x-3 mt-6">
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300" onclick="applyScaling('${sandboxName}', this.parentElement.parentElement.parentElement)">
                    Apply Scaling
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add slider event listeners
    document.getElementById('cpuSlider').addEventListener('input', (e) => {
        document.getElementById('cpuValue').textContent = `${e.target.value} Cores`;
    });
    document.getElementById('memorySlider').addEventListener('input', (e) => {
        document.getElementById('memoryValue').textContent = `${e.target.value} GB`;
    });
    document.getElementById('instancesSlider').addEventListener('input', (e) => {
        document.getElementById('instancesValue').textContent = `${e.target.value} Instance${e.target.value > 1 ? 's' : ''}`;
    });
}

function applyScaling(sandboxName, modal) {
    const cpu = document.getElementById('cpuSlider').value;
    const memory = document.getElementById('memorySlider').value;
    const instances = document.getElementById('instancesSlider').value;
    
    showToast(`Scaling ${sandboxName} to ${cpu} cores, ${memory}GB RAM, ${instances} instance(s)...`, 'info');
    modal.remove();
    
    setTimeout(() => {
        showToast(`Sandbox ${sandboxName} scaled successfully!`, 'success');
    }, 3000);
}

// Initialize enhanced controls after page load
setTimeout(addSandboxControls, 1000);

// ===== API TESTING FUNCTIONS =====

function testEndpoint(method, endpoint) {
    const logContainer = document.getElementById('apiResponseLog');
    const timestamp = new Date().toLocaleTimeString();
    
    // Simulate API response
    const responses = {
        'GET /api/sandboxes': {
            status: 200,
            data: {
                sandboxes: [
                    { id: 1, name: 'React-App', status: 'running', type: 'react' },
                    { id: 2, name: 'Node-API', status: 'stopped', type: 'node' },
                    { id: 3, name: 'Python-Data', status: 'running', type: 'python' }
                ]
            }
        },
        'POST /api/sandboxes': {
            status: 201,
            data: { id: 4, name: 'New-Sandbox', status: 'creating', type: 'vue' }
        },
        'PUT /api/sandboxes/1': {
            status: 200,
            data: { id: 1, name: 'React-App-Updated', status: 'running', type: 'react' }
        },
        'DELETE /api/sandboxes/1': {
            status: 204,
            data: null
        }
    };
    
    const response = responses[`${method} ${endpoint}`] || {
        status: 404,
        data: { error: 'Endpoint not found' }
    };
    
    const logEntry = document.createElement('div');
    logEntry.className = 'mb-2 p-2 bg-white/5 rounded';
    logEntry.innerHTML = `
        <div class="flex items-center justify-between mb-1">
            <span class="text-green-400 font-medium">${method} ${endpoint}</span>
            <span class="text-${response.status < 300 ? 'green' : 'red'}-400">${response.status}</span>
        </div>
        <div class="text-gray-300 text-xs">${timestamp}</div>
        <pre class="text-gray-400 text-xs mt-1 overflow-x-auto">${JSON.stringify(response.data, null, 2)}</pre>
    `;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep only last 10 entries
    const entries = logContainer.querySelectorAll('div');
    if (entries.length > 10) {
        entries[0].remove();
    }
}

// ===== QUICK ACTION MODALS =====

function showBackupModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Backup All Sandboxes</h3>
            <p class="text-gray-300 mb-6">This will create a complete backup of all your sandboxes and their data.</p>
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" id="includeData" checked class="rounded">
                    <label for="includeData" class="text-gray-300">Include sandbox data</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" id="includeConfig" checked class="rounded">
                    <label for="includeConfig" class="text-gray-300">Include configuration files</label>
                </div>
                <div class="flex items-center space-x-3">
                    <input type="checkbox" id="includeLogs" class="rounded">
                    <label for="includeLogs" class="text-gray-300">Include log files</label>
                </div>
            </div>
            <div class="flex space-x-3 mt-6">
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300" onclick="startBackup(this.parentElement.parentElement.parentElement)">
                    Start Backup
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function startBackup(modal) {
    showToast('Starting backup process...', 'info');
    modal.remove();
    
    setTimeout(() => {
        showToast('Backup completed successfully! Download ready.', 'success');
    }, 3000);
}

function showRestoreModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Restore from Backup</h3>
            <p class="text-gray-300 mb-6">Upload a backup file to restore your sandboxes.</p>
            <div class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-300 mb-2">Drag and drop backup file here</p>
                <p class="text-gray-500 text-sm">or click to browse</p>
                <input type="file" class="hidden" id="backupFile" accept=".zip,.tar,.gz">
            </div>
            <div class="flex space-x-3 mt-6">
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300" onclick="startRestore(this.parentElement.parentElement.parentElement)">
                    Restore
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function startRestore(modal) {
    showToast('Restoring from backup...', 'warning');
    modal.remove();
    
    setTimeout(() => {
        showToast('Restore completed successfully!', 'success');
    }, 4000);
}

function showMigrationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-lg w-full border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Migrate Sandboxes</h3>
            <p class="text-gray-300 mb-6">Migrate your sandboxes to a different region or environment.</p>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Source Environment</label>
                    <select class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                        <option>Production (us-east-1)</option>
                        <option>Staging (us-west-2)</option>
                        <option>Development (eu-west-1)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Target Environment</label>
                    <select class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                        <option>Production (us-west-2)</option>
                        <option>Staging (us-east-1)</option>
                        <option>Development (ap-southeast-1)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Sandboxes to Migrate</label>
                    <div class="space-y-2">
                        <div class="flex items-center space-x-3">
                            <input type="checkbox" checked class="rounded">
                            <span class="text-gray-300">React-App</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <input type="checkbox" checked class="rounded">
                            <span class="text-gray-300">Node-API</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <input type="checkbox" class="rounded">
                            <span class="text-gray-300">Python-Data</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex space-x-3 mt-6">
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300" onclick="startMigration(this.parentElement.parentElement.parentElement)">
                    Start Migration
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function startMigration(modal) {
    showToast('Starting migration process...', 'info');
    modal.remove();
    
    setTimeout(() => {
        showToast('Migration completed successfully!', 'success');
    }, 5000);
}

function showMaintenanceModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Maintenance Mode</h3>
            <p class="text-gray-300 mb-6">Enable maintenance mode to perform system updates.</p>
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" id="maintenanceMode" class="rounded">
                    <label for="maintenanceMode" class="text-gray-300">Enable maintenance mode</label>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Maintenance Message</label>
                    <textarea class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white" rows="3" placeholder="System is under maintenance...">System is under maintenance. Please check back in 30 minutes.</textarea>
                </div>
                <div>
                    <label class="block text-gray-300 text-sm mb-2">Duration (minutes)</label>
                    <input type="number" value="30" min="5" max="120" class="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                </div>
            </div>
            <div class="flex space-x-3 mt-6">
                <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300" onclick="enableMaintenance(this.parentElement.parentElement.parentElement)">
                    Enable Maintenance
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function enableMaintenance(modal) {
    showToast('Enabling maintenance mode...', 'warning');
    modal.remove();
    
    setTimeout(() => {
        showToast('Maintenance mode enabled. System will be back online in 30 minutes.', 'success');
    }, 2000);
}
