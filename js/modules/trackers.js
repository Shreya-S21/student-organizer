// js/modules/trackers.js
// Activity Trackers Module

export class Trackers {
    constructor() {
        this.trackers = {};
        this.progressBars = {};
    }
    
    init() {
        this.setupTrackers();
        this.loadSavedData();
        this.setupSaveButton();
        this.updateDate();
    }
    
    setupTrackers() {
        // Find all tracker inputs
        const trackerInputs = document.querySelectorAll('.tracker-input');
        
        trackerInputs.forEach(input => {
            const card = input.closest('.tracker-card');
            const progressBar = card.querySelector('.progress-fill');
            const trackerType = this.getTrackerType(card);
            
            // Store references
            this.trackers[trackerType] = input;
            if (progressBar) {
                this.progressBars[trackerType] = progressBar;
            }
            
            // Add event listeners
            input.addEventListener('input', () => {
                this.updateProgress(trackerType, input.value);
                this.saveToLocalStorage(trackerType, input.value);
            });
            
            // Add focus effects
            input.addEventListener('focus', () => {
                card.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', () => {
                card.style.transform = 'scale(1)';
            });
        });
        
        // Setup textarea for class schedule
        const classTextarea = document.querySelector('.tracker-textarea');
        if (classTextarea) {
            classTextarea.addEventListener('input', () => {
                this.saveToLocalStorage('class-schedule', classTextarea.value);
            });
        }
    }
    
    getTrackerType(card) {
        const classes = ['sleep', 'study', 'screen', 'exercise', 'break', 'class'];
        for (let className of classes) {
            if (card.classList.contains(className)) {
                return className;
            }
        }
        return 'unknown';
    }
    
    updateProgress(type, value) {
        const progressBar = this.progressBars[type];
        if (!progressBar) return;
        
        let percentage = 0;
        const numValue = parseFloat(value) || 0;
        
        // Calculate percentage based on type
        switch(type) {
            case 'sleep':
                percentage = (numValue / 8) * 100; // 8 hours is 100%
                break;
            case 'study':
                percentage = (numValue / 6) * 100; // 6 hours is 100%
                break;
            case 'screen':
                percentage = (numValue / 8) * 100; // 8 hours is 100%
                break;
            case 'exercise':
                percentage = (numValue / 60) * 100; // 60 minutes is 100%
                break;
            case 'break':
                percentage = (numValue / 5) * 100; // 5 breaks is 100%
                break;
        }
        
        percentage = Math.min(percentage, 100); // Cap at 100%
        progressBar.style.width = `${percentage}%`;
        
        // Change color based on percentage
        if (percentage < 30) {
            progressBar.style.background = 'linear-gradient(135deg, #F5576C 0%, #F093FB 100%)';
        } else if (percentage < 70) {
            progressBar.style.background = 'linear-gradient(135deg, #FA8C16 0%, #FFD93D 100%)';
        } else {
            progressBar.style.background = 'var(--gradient-success)';
        }
    }
    
    saveToLocalStorage(type, value) {
        const date = new Date().toISOString().split('T')[0];
        const key = `tracker_${date}_${type}`;
        localStorage.setItem(key, value);
    }
    
    loadSavedData() {
        const date = new Date().toISOString().split('T')[0];
        
        // Load input values
        Object.keys(this.trackers).forEach(type => {
            const key = `tracker_${date}_${type}`;
            const savedValue = localStorage.getItem(key);
            
            if (savedValue) {
                this.trackers[type].value = savedValue;
                this.updateProgress(type, savedValue);
            }
        });
        
        // Load class schedule
        const classTextarea = document.querySelector('.tracker-textarea');
        if (classTextarea) {
            const savedSchedule = localStorage.getItem(`tracker_${date}_class-schedule`);
            if (savedSchedule) {
                classTextarea.value = savedSchedule;
            }
        }
    }
    
    setupSaveButton() {
        const saveBtn = document.querySelector('.trackers-header .btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveAllData();
            });
        }
    }
    
    saveAllData() {
        const date = new Date().toISOString().split('T')[0];
        const data = {};
        
        // Collect all tracker data
        Object.keys(this.trackers).forEach(type => {
            data[type] = this.trackers[type].value || 0;
        });
        
        // Get class schedule
        const classTextarea = document.querySelector('.tracker-textarea');
        if (classTextarea) {
            data['class-schedule'] = classTextarea.value;
        }
        
        // Save as a single entry for the day
        localStorage.setItem(`daily_data_${date}`, JSON.stringify(data));
        
        // Show success message
        this.showNotification('Data saved successfully!', 'success');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? 'var(--gradient-success)' : 'var(--gradient-primary)'};
            color: white;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    updateDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date().toLocaleDateString('en-US', options);
            dateElement.textContent = today;
        }
    }
}

// Add animation keyframes
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