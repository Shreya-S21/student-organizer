// js/main.js
// Main JavaScript Entry Point

// Import modules
import { Auth } from './modules/auth.js';
import { Sidebar } from './modules/sidebar.js';
import { Trackers } from './modules/trackers.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

class App {
    constructor() {
        this.auth = new Auth();
        this.sidebar = new Sidebar();
        this.trackers = new Trackers();
    }
    
    init() {
        console.log('Structura App Initialized');
        
        // Initialize authentication
        this.auth.init();
        
        // Check which page we're on
        const isLoginPage = document.querySelector('.login-page');
        const isDashboardPage = document.querySelector('.dashboard-page');
        
        if (isLoginPage) {
            this.initLoginPage();
        } else if (isDashboardPage) {
            this.initDashboardPage();
        }
    }
    
    initLoginPage() {
        console.log('Login page initialized');
        
        // Add animation to login form
        const formWrapper = document.querySelector('.login-form-wrapper');
        if (formWrapper) {
            formWrapper.style.animation = 'fadeInUp 0.6s ease';
        }
        
        // Add ripple effect to button
        this.addRippleEffect();
    }
    
    initDashboardPage() {
        console.log('Dashboard page initialized');
        
        // Check if user is authenticated
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'index.html';
            return;
        }
        
        // Initialize dashboard components
        this.sidebar.init();
        this.trackers.init();
        
        // Setup quick actions
        this.setupQuickActions();
        
        // Start real-time updates
        this.startRealtimeUpdates();
    }
    
    addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    setupQuickActions() {
        const actionCards = document.querySelectorAll('.action-card');
        
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const label = card.querySelector('.action-label').textContent;
                this.handleQuickAction(label);
            });
        });
    }
    
    handleQuickAction(action) {
        switch(action) {
            case 'Add Task':
                this.showModal('Add New Task', this.getTaskForm());
                break;
            case 'Take Notes':
                this.showModal('Quick Notes', this.getNotesForm());
                break;
            case 'Start Timer':
                this.startPomodoro();
                break;
            case 'View Stats':
                this.showStats();
                break;
        }
    }
    
    showModal(title, content) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">✕</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            position: relative;
            background: white;
            border-radius: 12px;
            padding: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalIn 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        backdrop.addEventListener('click', () => modal.remove());
    }
    
    getTaskForm() {
        return `
            <form class="task-form">
                <div class="form-group">
                    <label>Task Title</label>
                    <input type="text" class="form-input" placeholder="Enter task title">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="form-input">
                        <option>Study</option>
                        <option>Assignment</option>
                        <option>Project</option>
                        <option>Personal</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Due Date</label>
                    <input type="date" class="form-input">
                </div>
                <div class="form-group">
                    <label>Priority</label>
                    <select class="form-input">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Add Task</button>
            </form>
        `;
    }
    
    getNotesForm() {
        return `
            <form class="notes-form">
                <div class="form-group">
                    <label>Note Title</label>
                    <input type="text" class="form-input" placeholder="Enter note title">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-input" rows="6" placeholder="Write your note here..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Save Note</button>
            </form>
        `;
    }
    
    startPomodoro() {
        alert('Pomodoro Timer Started! Work for 25 minutes, then take a 5-minute break.');
        // You can implement a full pomodoro timer here
    }
    
    showStats() {
        alert('Statistics view coming soon! This will show detailed analytics of your activities.');
    }
    
    startRealtimeUpdates() {
        // Update time every minute
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const greeting = hours < 12 ? 'Good Morning' : 
                           hours < 18 ? 'Good Afternoon' : 'Good Evening';
            
            const greetingElement = document.querySelector('.banner-greeting');
            if (greetingElement) {
                const name = JSON.parse(localStorage.getItem('currentUser'))?.name || 'Student';
                greetingElement.textContent = `${greeting}, ${name}! 👋`;
            }
        }, 60000);
    }
}

// Add modal animation
const style = document.createElement('style');
style.textContent = `
    @keyframes modalIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);