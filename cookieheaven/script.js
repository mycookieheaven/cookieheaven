// CookieHeaven - Interactive Scripts

console.log('🍪 CookieHeaven NFT Loaded!');

// Wallet connection handling (placeholder for Thirdweb integration)
const connectButton = document.querySelector('button.btn-primary');

if (connectButton && connectButton.textContent.includes('Connect Wallet')) {
    connectButton.addEventListener('click', async () => {
        // Check for MetaMask or other wallets
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                console.log('Connected:', accounts[0]);
                connectButton.textContent = 'Wallet Connected!';
                connectButton.disabled = true;
            } catch (error) {
                console.error('Connection error:', error);
            }
        } else {
            alert('Please install MetaMask to connect your wallet!');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 13, 13, 0.95)';
    } else {
        navbar.style.background = 'rgba(13, 13, 13, 0.9)';
    }
});

// Add entrance animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.cookie-card, .roadmap-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

console.log('🍪 Ready to mint!');
