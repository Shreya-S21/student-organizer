// js/modules/sidebar.js
// Sidebar Navigation Module

export class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebar-overlay');
        this.menuToggle = document.getElementById('menu-toggle');
        this.content = document.getElementById('dashboard-content');
        this.isOpen = false;
    }
    
    init() {
        if (!this.sidebar || !this.menuToggle) return;
        
        this.setupEventListeners();
        this.setupNavigationLinks();
    }
    
    setupEventListeners() {
        // Toggle button click
        this.menuToggle.addEventListener('click', () => this.toggle());
        
        // Overlay click to close
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    setupNavigationLinks() {
        const navLinks = this.sidebar.querySelectorAll('.sidebar-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Handle navigation (in a real app, this would use a router)
                this.handleNavigation(link);
            });
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.sidebar.classList.add('active');
        this.overlay?.classList.add('active');
        this.content?.classList.add('shifted');
        
        // Animate menu icon
        this.animateMenuIcon(true);
    }
    
    close() {
        this.isOpen = false;
        this.sidebar.classList.remove('active');
        this.overlay?.classList.remove('active');
        this.content?.classList.remove('shifted');
        
        // Animate menu icon
        this.animateMenuIcon(false);
    }
    
    animateMenuIcon(isOpen) {
        const icon = this.menuToggle.querySelector('.menu-toggle-icon');
        if (icon) {
            icon.textContent = isOpen ? '✕' : '☰';
        }
    }
    
    handleNavigation(link) {
        const linkText = link.querySelector('span:last-child').textContent;
        console.log(`Navigating to: ${linkText}`);
        
        // You can implement actual navigation logic here
        // For now, just show a message
        if (linkText === 'Logout') {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.clear();
                window.location.href = 'index.html';
            }
        }
    }
}