import { useState, useEffect } from 'react'

function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    const container = document.getElementById('floatingCookies')
    const bgEmojis = ['🍪', '💖']
    
    for (let i = 0; i < 15; i++) {
      const cookie = document.createElement('div')
      cookie.className = 'floating-cookie-bg'
      cookie.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)]
      cookie.style.left = Math.random() * 100 + '%'
      cookie.style.animationDelay = Math.random() * 15 + 's'
      cookie.style.animationDuration = (10 + Math.random() * 10) + 's'
      container.appendChild(cookie)
    }
  }, [])

  const cookies = [
    { id: 1, name: 'Classic Choco Chip', rarity: 'common', image: '/cookie-choco.png', traits: 'Chocolate • Chips • Pixel Art' },
    { id: 2, name: 'Strawberry Kiss', rarity: 'uncommon', class: 'cookie-pink', traits: 'Pink • Sprinkles • Heart' },
    { id: 3, name: 'Golden Glory', rarity: 'rare', class: 'cookie-golden', traits: 'Gold • Stars • Shiny' },
    { id: 4, name: 'Rainbow Dream', rarity: 'epic', class: 'cookie-rainbow', traits: 'Rainbow • Multi • Glow' },
    { id: 5, name: 'Cosmic Cookie', rarity: 'legendary', class: 'cookie-cosmic', traits: 'Galaxy • Stars • Rare' },
    { id: 6, name: 'Oatmeal Delight', rarity: 'common', class: 'cookie-oatmeal', traits: 'Tan • Raisins • Classic' },
  ]

  const filteredCookies = activeFilter === 'all' ? cookies : cookies.filter(c => c.rarity === activeFilter)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletConnected(true)
        setShowModal(true)
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  return (
    <>
      <div className="floating-cookies" id="floatingCookies"></div>

      <nav className="navbar">
        <div className="logo">
          <img src="/cookie2.png" alt="Cookie" style={{width:'35px'}} />
          <span style={{marginLeft:'8px'}}>CookieHeaven</span>
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#collection">Cookies</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#mint" className="btn-nav">Mint Soon</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-badge">✨ Coming Soon to Solana ✨</div>
        <h1>COOKIE HEAVEN</h1>
        
        <div className="hero-buttons">
          <a href="#collection" className="btn btn-primary">🍪 See the Cookies</a>
          <a href="#about" className="btn btn-secondary">💕 Our Story</a>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat"><span className="stat-num">1,000</span><span className="stat-text">Unique Cookies</span></div>
          <div className="hero-stat"><span className="stat-num">Free</span><span className="stat-text">Mint Cost</span></div>
          <div className="hero-stat"><span className="stat-num">Solana</span><span className="stat-text">Blockchain</span></div>
        </div>

        <div className="hero-cookie">
          <img 
            src="/cookie2.png" 
            alt="Cookie" 
            style={{width:'400px',cursor:'pointer'}}
            onClick={() => setShowMessage(!showMessage)}
          />
          {showMessage && (
            <div className="cookie-message">
              💖 A deliciously cute collection<br/>of 1,000 unique pixel cookies! 🍪
            </div>
          )}
        </div>
      </header>

      <section id="about" className="section about-section">
        <div className="section-header">
          <h2>💕 About CookieHeaven</h2>
          <p className="section-subtitle">Made with love for cookie lovers everywhere</p>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <div className="card-emoji">🌟</div>
            <h3>The Sweet Story</h3>
            <p>CookieHeaven was born from my absolute <strong>love for cookies</strong>. There's something magical about biting into a warm, chewy cookie with chocolate chips melting in your mouth.</p>
            <p>I wanted to capture that joy and spread it to the world through cute pixel art cookies that live forever on the blockchain.</p>
            <p className="signature">With love, <strong>Melissa</strong> 🧡</p>
          </div>
          
          <div className="about-card">
            <div className="card-emoji">🎨</div>
            <h3>Created by Melissa</h3>
            <p>Hey! I'm Melissa, and I created CookieHeaven because I believe the world needs more sweetness. This is my first NFT project!</p>
            <div className="creator-badges">
              <span className="badge">🌸 First Project</span>
              <span className="badge">💖 Made with Love</span>
              <span className="badge">🎮 Pixel Art</span>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="section collection-section">
        <div className="section-header">
          <h2>🍪 Cookie Collection</h2>
          <p className="section-subtitle">Sneak peek at our delicious pixel creations</p>
        </div>
        
        <div className="rarity-filter">
          {['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => (
            <button 
              key={rarity}
              className={`rarity-btn ${activeFilter === rarity ? 'active' : ''}`}
              onClick={() => setActiveFilter(rarity)}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="cookie-grid">
          {filteredCookies.map(cookie => (
            <div key={cookie.id} className="cookie-card">
              <div className={`cookie-image ${cookie.class || ''}`}>
                {cookie.image && <img src={cookie.image} alt={cookie.name} />}
              </div>
              <div className="cookie-info">
                <h4>{cookie.name}</h4>
                <span className={`rarity ${cookie.rarity}`}>{cookie.rarity}</span>
                <p className="traits">{cookie.traits}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="section roadmap-section">
        <div className="section-header">
          <h2>🗺️ Our Journey</h2>
          <p className="section-subtitle">The sweet road ahead for CookieHeaven</p>
        </div>
        
        <div className="roadmap">
          <div className="roadmap-item">
            <div className="roadmap-marker">1</div>
            <div className="roadmap-content">
              <h3>Phase 1: The Beginning</h3>
              <ul>
                <li>🌐 Website launch</li>
                <li>📱 Social media setup</li>
                <li>💬 Community building</li>
                <li>👥 Early supporter rewards</li>
              </ul>
            </div>
          </div>
          
          <div className="roadmap-item">
            <div className="roadmap-marker">2</div>
            <div className="roadmap-content">
              <h3>Phase 2: The Drop</h3>
              <ul>
                <li>🎉 Free mint launch</li>
                <li>🍪 All 1,000 cookies find homes</li>
                <li>🎁 Holder exclusive perks</li>
                <li>📦 Care package for OG holders</li>
              </ul>
            </div>
          </div>
          
          <div className="roadmap-item">
            <div className="roadmap-marker">3</div>
            <div className="roadmap-content">
              <h3>Phase 3: Growing</h3>
              <ul>
                <li>🛍️ Cookie merch store</li>
                <li>🏪 Secondary marketplace</li>
                <li>🎮 Future cookie drops</li>
                <li>🌟 CommunityDAO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="mint" className="section mint-section">
        <div className="mint-container">
          <h2>🍪 Mint Your Cookie</h2>
          <p className="section-subtitle">Free mint on Solana network</p>
          
          <div className="mint-box">
            <div className="mint-cookie-display">
              <img src="/cookie2.png" alt="Mint" style={{width:'150px'}} />
            </div>
            <div className="mint-details">
              <p>📅 Launch Date: Coming Soon!</p>
              <p>💰 Cost: 0 SOL + Gas Fee</p>
              <p>📦 Supply: 1,000 unique cookies</p>
            </div>
            <button 
              className="btn btn-mint" 
              onClick={connectWallet}
              disabled={walletConnected}
            >
              {walletConnected ? '✅ Wallet Connected!' : '🔗 Connect Wallet'}
            </button>
            <div className="notify-options">
              <p>Or join our community:</p>
              <div className="social-btns">
                <a href="#" className="social-btn twitter">🐦 Twitter</a>
                <a href="#" className="social-btn discord">💬 Discord</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">🍪 CookieHeaven</div>
          <p className="footer-tagline">Spreading sweetness, one pixel at a time 💕</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#collection">Collection</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#mint">Mint</a>
          </div>
          <p className="copyright">© 2026 CookieHeaven. Crafted with 💖 by Melissa</p>
        </div>
      </footer>

      {showModal && (
        <div className="modal show" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-emoji">🍪</div>
            <h3>You're on the list! 🎉</h3>
            <p>We'll notify you when minting goes live!</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App
