// CookieHeaven - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    console.log('🍪 CookieHeaven loaded! Welcome, cookie lover! 💕');
    
    // Initialize all features
    initFloatingCookies();
    initCursorTrail();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initRarityFilter();
    initWalletConnection();
    initModal();
    initScrollAnimations();
    initHoverSounds();
});

// Floating Cookies Background
function initFloatingCookies() {
    const container = document.getElementById('floatingCookies');
    const cookies = ['🍪', '🧁', '🍩', '⭐', '💫', '✨', '💖'];
    
    for (let i = 0; i < 15; i++) {
        const cookie = document.createElement('div');
        cookie.className = 'floating-cookie-bg';
        cookie.textContent = cookies[Math.floor(Math.random() * cookies.length)];
        cookie.style.left = Math.random() * 100 + '%';
        cookie.style.animationDelay = Math.random() * 15 + 's';
        cookie.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(cookie);
    }
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let isVisible = false;
    
    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        
        if (!isVisible) {
            isVisible = true;
            trail.style.opacity = '1';
        }
        
        clearTimeout(trail.hideTimeout);
        trail.hideTimeout = setTimeout(() => {
            isVisible = false;
        }, 500);
    });
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('show');
            btn.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('show');
                btn.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 2rem';
            navbar.style.boxShadow = '0 4px 20px rgba(255, 143, 171, 0.2)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Rarity Filter
function initRarityFilter() {
    const buttons = document.querySelectorAll('.rarity-btn');
    const cookies = document.querySelectorAll('.cookie-card');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const rarity = btn.dataset.rarity;
            
            // Filter cookies
            cookies.forEach(cookie => {
                if (rarity === 'all' || cookie.dataset.rarity === rarity) {
                    cookie.style.display = 'block';
                    cookie.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    cookie.style.display = 'none';
                }
            });
        });
    });
}

// Wallet Connection
function initWalletConnection() {
    const connectBtn = document.getElementById('connectWallet');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ 
                        method: 'eth_requestAccounts' 
                    });
                    
                    // Show success modal
                    showModal('You\'re on the list! 🎉\nWe\'ll notify ' + accounts[0].substring(0, 6) + '... when minting goes live!');
                    connectBtn.innerHTML = '<span>✅</span> Wallet Connected!';
                    connectBtn.disabled = true;
                    connectBtn.style.background = '#4ade80';
                    
                } catch (error) {
                    console.error('Wallet connection error:', error);
                    showModal('Could not connect wallet. Please try again!');
                }
            } else {
                showModal('Please install MetaMask to connect your wallet!');
            }
        });
    }
}

// Modal
function initModal() {
    const modal = document.getElementById('waitlistModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

function showModal(message) {
    const modal = document.getElementById('waitlistModal');
    const content = modal.querySelector('.modal-content p');
    content.textContent = message;
    modal.classList.add('show');
    
    // Auto close after 5 seconds
    setTimeout(() => {
        modal.classList.remove('show');
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.about-card, .cookie-card, .roadmap-item').forEach(el => {
        observer.observe(el);
    });
}

// Add hover sound effect (visual only - no actual sound)
function initHoverSounds() {
    const cards = document.querySelectorAll('.cookie-card, .about-card, .roadmap-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle scale animation
            card.style.transform = 'translateY(-5px)';
        });
    });
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
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
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .mobile-menu.show {
        display: flex;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🍪 CookieHeaven NFT', 'font-size: 24px; font-weight: bold; color: #ff8fab;');
console.log('%cMade with 💖 by Melissa', 'font-size: 14px; color: #5c4d5c;');
console.log('%cCan\'t wait to see your pixel cookies! 🍪', 'font-size: 12px; color: #8b7b8b;');
