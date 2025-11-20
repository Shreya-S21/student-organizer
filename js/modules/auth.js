// js/modules/auth.js
// Authentication Module

export class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
    }
    
    init() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            this.setupLoginForm(loginForm);
        }
        
        // Check if user is already logged in (using localStorage)
        this.checkAuthStatus();
    }
    
    setupLoginForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(form);
        });
    }
    
    handleLogin(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        
        // Basic validation
        if (!username || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        // Simulate login (in real app, this would be an API call)
        this.simulateLogin(username, password);
    }
    
    simulateLogin(username, password) {
        // Show loading state
        const submitBtn = document.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, any username/password works
            this.isAuthenticated = true;
            this.currentUser = {
                username: username,
                name: username.charAt(0).toUpperCase() + username.slice(1),
                email: `${username}@example.com`
            };
            
            // Store auth status
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            // Redirect to dashboard
            window.location.href = 'home.html';
        }, 1500);
    }
    
    checkAuthStatus() {
        const isAuth = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('currentUser');
        
        if (isAuth === 'true' && userData) {
            this.isAuthenticated = true;
            this.currentUser = JSON.parse(userData);
            
            // Update UI with user info if on dashboard
            this.updateUserInterface();
        }
    }
    
    updateUserInterface() {
        const userDisplay = document.querySelector('.header-user span');
        const avatar = document.querySelector('.header-avatar');
        
        if (userDisplay && this.currentUser) {
            userDisplay.textContent = `Welcome, ${this.currentUser.name}!`;
        }
        
        if (avatar && this.currentUser) {
            avatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }
    }
    
    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
    
    showError(message) {
        // Create error element if it doesn't exist
        let errorElement = document.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            const form = document.getElementById('login-form');
            form.insertBefore(errorElement, form.firstChild);
        }
        
        errorElement.textContent = message;
        errorElement.style.cssText = `
            background: #fee;
            color: #c00;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
        `;
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }
}