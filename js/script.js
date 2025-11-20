// js/script.js
// Complete JavaScript without modules - Works with direct file opening

document.addEventListener('DOMContentLoaded', () => {
    console.log('Structura App Initialized');
    
    // Check which page we're on
    const isLoginPage = document.querySelector('.login-page');
    const isDashboardPage = document.querySelector('.dashboard-page');
    
    if (isLoginPage) {
        initLoginPage();
    } else if (isDashboardPage) {
        initDashboardPage();
    }
});

// ============= LOGIN PAGE FUNCTIONS =============
function initLoginPage() {
    console.log('Login page initialized');
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        showLoginError('Please fill in all fields');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate login delay (in real app, this would be an API call)
    setTimeout(() => {
        // For demo, any username/password works
        // Save user data to localStorage
        const userData = {
            username: username,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            email: `${username}@example.com`
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Redirect to dashboard
        window.location.href = 'home.html';
    }, 1000);
}

function showLoginError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #ffebee;
        color: #c62828;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        border: 1px solid #ffcdd2;
    `;
    
    const form = document.getElementById('login-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// ============= DASHBOARD PAGE FUNCTIONS =============
function initDashboardPage() {
    console.log('Dashboard page initialized');
    
    // Check if user is authenticated
    if (!localStorage.getItem('isAuthenticated')) {
        alert('Please login first!');
        window.location.href = 'index.html';
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize trackers
    initTrackers();
    
    // Setup quick actions
    setupQuickActions();
    
    // Update current date
    updateCurrentDate();
}

function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        const user = JSON.parse(userData);
        
        // Update welcome message
        const greetingElement = document.querySelector('.banner-greeting');
        const userSpan = document.querySelector('.header-user span');
        const avatarElement = document.querySelector('.header-avatar');
        
        if (greetingElement) {
            const hour = new Date().getHours();
            const greeting = hour < 12 ? 'Good Morning' : 
                           hour < 18 ? 'Good Afternoon' : 'Good Evening';
            greetingElement.textContent = `${greeting}, ${user.name}! 👋`;
        }
        
        if (userSpan) {
            userSpan.textContent = `Welcome, ${user.name}!`;
        }
        
        if (avatarElement) {
            avatarElement.textContent = user.name.charAt(0).toUpperCase();
        }
    }
}

// ============= SIDEBAR FUNCTIONS =============
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const content = document.getElementById('dashboard-content');
    
    if (menuToggle && sidebar) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('active');
            
            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
        
        // Close sidebar when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
        
        // Setup navigation links
        const navLinks = sidebar.querySelectorAll('.sidebar-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get the link text
                const linkText = link.querySelector('span:last-child').textContent;
                console.log('Navigating to:', linkText);
                
                // Close sidebar on mobile after selection
                if (window.innerWidth < 768) {
                    closeSidebar();
                }
            });
        });
        
        // Logout button
        const logoutBtn = sidebar.querySelector('.btn-danger');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.clear();
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const content = document.getElementById('dashboard-content');
    const menuIcon = document.querySelector('.menu-toggle-icon');
    
    sidebar.classList.add('active');
    overlay.classList.add('active');
    content.classList.add('shifted');
    
    if (menuIcon) {
        menuIcon.textContent = '✕';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const content = document.getElementById('dashboard-content');
    const menuIcon = document.querySelector('.menu-toggle-icon');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    content.classList.remove('shifted');
    
    if (menuIcon) {
        menuIcon.textContent = '☰';
    }
}

// ============= TRACKER FUNCTIONS =============
function initTrackers() {
    const trackerInputs = document.querySelectorAll('.tracker-input');
    const date = new Date().toISOString().split('T')[0];
    
    trackerInputs.forEach(input => {
        const card = input.closest('.tracker-card');
        const trackerType = getTrackerType(card);
        
        // Load saved value
        const savedValue = localStorage.getItem(`tracker_${date}_${trackerType}`);
        if (savedValue) {
            input.value = savedValue;
            updateProgress(card, savedValue);
        }
        
        // Save on input change
        input.addEventListener('input', () => {
            localStorage.setItem(`tracker_${date}_${trackerType}`, input.value);
            updateProgress(card, input.value);
        });
        
        // Add hover effect
        input.addEventListener('focus', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
        });
        
        input.addEventListener('blur', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
    
    // Class schedule textarea
    const classTextarea = document.querySelector('.tracker-textarea');
    if (classTextarea) {
        const savedSchedule = localStorage.getItem(`tracker_${date}_schedule`);
        if (savedSchedule) {
            classTextarea.value = savedSchedule;
        }
        
        classTextarea.addEventListener('input', () => {
            localStorage.setItem(`tracker_${date}_schedule`, classTextarea.value);
        });
    }
    
    // Save All button
    const saveBtn = document.querySelector('.trackers-header .btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveAllTrackers);
    }
}

function getTrackerType(card) {
    const classes = ['sleep', 'study', 'screen', 'exercise', 'break'];
    for (let className of classes) {
        if (card.classList.contains(className)) {
            return className;
        }
    }
    return 'unknown';
}

function updateProgress(card, value) {
    const progressFill = card.querySelector('.progress-fill');
    if (!progressFill) return;
    
    const numValue = parseFloat(value) || 0;
    let percentage = 0;
    
    // Calculate percentage based on card type
    if (card.classList.contains('sleep')) {
        percentage = (numValue / 8) * 100; // 8 hours is ideal
    } else if (card.classList.contains('study')) {
        percentage = (numValue / 6) * 100; // 6 hours target
    } else if (card.classList.contains('screen')) {
        percentage = (numValue / 8) * 100; // Track up to 8 hours
    } else if (card.classList.contains('exercise')) {
        percentage = (numValue / 60) * 100; // 60 minutes target
    } else if (card.classList.contains('break')) {
        percentage = (numValue / 5) * 100; // 5 breaks target
    }
    
    percentage = Math.min(percentage, 100);
    progressFill.style.width = percentage + '%';
    
    // Change color based on percentage
    if (percentage < 30) {
        progressFill.style.background = 'linear-gradient(135deg, #F5576C 0%, #F093FB 100%)';
    } else if (percentage < 70) {
        progressFill.style.background = 'linear-gradient(135deg, #FA8C16 0%, #FFD93D 100%)';
    } else {
        progressFill.style.background = 'linear-gradient(135deg, #2DCE89 0%, #2DCECC 100%)';
    }
}

function saveAllTrackers() {
    const date = new Date().toISOString().split('T')[0];
    const data = {
        date: date,
        trackers: {}
    };
    
    // Collect all tracker values
    document.querySelectorAll('.tracker-input').forEach(input => {
        const card = input.closest('.tracker-card');
        const type = getTrackerType(card);
        data.trackers[type] = input.value || 0;
    });
    
    // Get class schedule
    const schedule = document.querySelector('.tracker-textarea');
    if (schedule) {
        data.trackers['schedule'] = schedule.value;
    }
    
    // Save to localStorage
    localStorage.setItem(`daily_summary_${date}`, JSON.stringify(data));
    
    // Show success notification
    showNotification('All trackers saved successfully!', 'success');
}

// ============= QUICK ACTIONS FUNCTIONS =============
function setupQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const actionLabel = card.querySelector('.action-label').textContent;
            handleQuickAction(actionLabel);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'Add Task':
            showNotification('Task feature coming soon!', 'info');
            break;
        case 'Take Notes':
            showNotification('Notes feature coming soon!', 'info');
            break;
        case 'Start Timer':
            startPomodoroTimer();
            break;
        case 'View Stats':
            showNotification('Statistics feature coming soon!', 'info');
            break;
    }
}

function startPomodoroTimer() {
    if (confirm('Start a 25-minute Pomodoro session?')) {
        showNotification('Pomodoro timer started! Focus for 25 minutes.', 'success');
        
        // Set a browser notification for 25 minutes
        setTimeout(() => {
            showNotification('Pomodoro session complete! Take a 5-minute break.', 'info');
        }, 25 * 60 * 1000);
    }
}

// ============= UTILITY FUNCTIONS =============
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = today;
    }
}

function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style based on type
    const bgColor = type === 'success' ? '#2DCE89' : 
                   type === 'error' ? '#F5576C' : '#5E72E4';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add required animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);