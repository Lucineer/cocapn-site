const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cocapn-site | Cloudflare Worker Platform</title>
    <meta name="description" content="Deploy serverless applications globally with cocapn-site">
    <style>
        :root {
            --accent: #00d4ff;
            --bg: #0a0a0f;
            --surface: #151520;
            --text: #f0f0f5;
            --text-secondary: #a0a0b0;
            --border: #2a2a3a;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Navigation */
        nav {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--accent);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: var(--text);
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--accent);
        }
        
        /* Hero */
        .hero {
            padding: 5rem 0;
            text-align: center;
            background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, var(--accent), #00a8ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 1.2rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 2rem;
        }
        
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: var(--bg);
            padding: 0.8rem 2rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
        }
        
        /* Features */
        .features {
            padding: 4rem 0;
            background: var(--surface);
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2rem;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: var(--bg);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--border);
            transition: border-color 0.3s;
        }
        
        .feature-card:hover {
            border-color: var(--accent);
        }
        
        .feature-icon {
            color: var(--accent);
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        /* Pricing */
        .pricing {
            padding: 4rem 0;
        }
        
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .pricing-card {
            background: var(--surface);
            border-radius: 8px;
            padding: 2rem;
            border: 1px solid var(--border);
            transition: transform 0.3s;
        }
        
        .pricing-card:hover {
            transform: translateY(-5px);
        }
        
        .pricing-card.popular {
            border-color: var(--accent);
            position: relative;
        }
        
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent);
            color: var(--bg);
            padding: 0.3rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .price {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--accent);
            margin: 1rem 0;
        }
        
        .price span {
            font-size: 1rem;
            color: var(--text-secondary);
        }
        
        .pricing-features {
            list-style: none;
            margin: 2rem 0;
        }
        
        .pricing-features li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border);
        }
        
        /* Footer */
        footer {
            background: var(--surface);
            padding: 3rem 0;
            border-top: 1px solid var(--border);
            margin-top: 4rem;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 2rem;
        }
        
        .footer-section h4 {
            color: var(--accent);
            margin-bottom: 1rem;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: var(--accent);
        }
        
        .copyright {
            text-align: center;
            margin-top: 3rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        /* Mobile */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .footer-content {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-content">
            <a href="#" class="logo">cocapn-site</a>
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#">Documentation</a>
                <a href="#">Login</a>
            </div>
        </div>
    </nav>
    
    <section class="hero">
        <div class="container">
            <h1>Deploy Globally in Milliseconds</h1>
            <p>Serverless platform built on Cloudflare Workers. Scale instantly with zero configuration.</p>
            <a href="#pricing" class="cta-button">Get Started Free</a>
        </div>
    </section>
    
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Why Choose cocapn-site</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Global Edge Network</h3>
                    <p>Deploy to 300+ cities worldwide with automatic traffic routing.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Built-in Security</h3>
                    <p>DDoS protection, WAF, and zero-trust security by default.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔄</div>
                    <h3>Instant Deployments</h3>
                    <p>Push code and see it live globally in under 300ms.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Real-time Analytics</h3>
                    <p>Monitor performance and usage with detailed metrics.</p>
                </div>
            </div>
        </div>
    </section>
    
    <section id="pricing" class="pricing">
        <div class="container">
            <h2 class="section-title">Simple, Predictable Pricing</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Free</h3>
                    <div class="price">$0<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>100,000 requests/day</li>
                        <li>10ms CPU time/request</li>
                        <li>1GB storage</li>
                        <li>Basic analytics</li>
                    </ul>
                    <a href="#" class="cta-button">Get Started</a>
                </div>
                
                <div class="pricing-card popular">
                    <div class="popular-badge">Most Popular</div>
                    <h3>Pro</h3>
                    <div class="price">$9<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>1M requests/day</li>
                        <li>50ms CPU time/request</li>
                        <li>10GB storage</li>
                        <li>Advanced analytics</li>
                    </ul>
                    <a href="#" class="cta-button">Upgrade Now</a>
                </div>
                
                <div class="pricing-card">
                    <h3>Business</h3>
                    <div class="price">$29<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>10M requests/day</li>
                        <li>100ms CPU time/request</li>
                        <li>100GB storage</li>
                        <li>Priority support</li>
                    </ul>
                    <a href="#" class="cta-button">Contact Sales</a>
                </div>
                
                <div class="pricing-card">
                    <h3>Enterprise</h3>
                    <div class="price">$99<span>/month</span></div>
                    <ul class="pricing-features">
                        <li>Unlimited requests</li>
                        <li>Custom limits</li>
                        <li>1TB storage</li>
                        <li>24/7 phone support</li>
                    </ul>
                    <a href="#" class="cta-button">Enterprise Plan</a>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>cocapn-site</h4>
                    <p>Global serverless platform powered by Cloudflare Workers.</p>
                </div>
                <div class="footer-section">
                    <h4>Product</h4>
                    <ul class="footer-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul class="footer-links">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                &copy; 2024 cocapn-site. All rights reserved.
            </div>
        </div>
    </footer>
    
    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    </script>
</body>
</html>
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Health endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'cocapn-site'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    // Main landing page
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';",
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
};