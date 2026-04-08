Here's a complete Cloudflare Worker for Cocapn.com in a single TypeScript file:


export interface Env {
  // Environment variables can be added here
}

interface MembershipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  accent?: boolean;
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Deckboss.ai trial (5/day)",
      "Cocapn.ai (1 instance)",
      "Community support",
      "Open source access"
    ],
    ctaText: "Get Started",
    ctaLink: "#signup"
  },
  {
    id: "standard",
    name: "Standard",
    price: "$9/mo",
    description: "For growing teams",
    features: [
      "Unlimited Deckboss.ai",
      "5 cocapn instances",
      "Cloud sync",
      "Email support",
      "Fleet analytics"
    ],
    ctaText: "Upgrade Now",
    ctaLink: "#signup",
    accent: true
  },
  {
    id: "professional",
    name: "Professional",
    price: "$29/mo",
    description: "Full platform access",
    features: [
      "Unlimited everything",
      "Capitaine.ai access",
      "Priority support",
      "Multi-device fleet",
      "Custom templates",
      "White-label"
    ],
    ctaText: "Go Pro",
    ctaLink: "#signup"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99/seat/mo",
    description: "Custom solutions",
    features: [
      "Dedicated support",
      "Custom hardware",
      "On-site training",
      "SLA guarantee",
      "Fleet analytics",
      "White-label everything",
      "Custom domains"
    ],
    ctaText: "Contact Sales",
    ctaLink: "#contact"
  }
];

const BRAND_FAMILY = [
  { name: "Deckboss.ai", description: "AI-powered presentation builder", color: "#00d4ff" },
  { name: "Deckboss.net", description: "Presentation hosting & sharing", color: "#00b8e6" },
  { name: "Cocapn.ai", description: "Autonomous agent framework", color: "#0099cc" },
  { name: "Cocapn.com", description: "Membership & billing portal", color: "#0077b3" },
  { name: "Capitaine.ai", description: "Enterprise agent orchestration", color: "#005580" }
];

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn Ecosystem - Open-Source Agent Infrastructure</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>">
    <style>
        :root {
            --accent: #00d4ff;
            --accent-dark: #0099cc;
            --bg-primary: #0a0a0a;
            --bg-secondary: #111111;
            --bg-card: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #a0a0a0;
            --border: #333333;
            --radius: 12px;
            --shadow: 0 8px 30px rgba(0, 212, 255, 0.08);
            --transition: all 0.2s ease;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            z-index: 1000;
        }
        
        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: 600;
            color: var(--text-primary);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 32px;
        }
        
        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .nav-link:hover {
            color: var(--accent);
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 24px;
            cursor: pointer;
        }
        
        /* Hero */
        .hero {
            padding: 160px 0 100px;
            text-align: center;
            background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(0, 212, 255, 0.05) 100%);
        }
        
        .hero h1 {
            font-size: 64px;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent) 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
        }
        
        .hero-subtitle {
            font-size: 20px;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 40px;
        }
        
        /* Sections */
        .section {
            padding: 100px 0;
        }
        
        .section-title {
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 60px;
            text-align: center;
        }
        
        /* Membership Cards */
        .tiers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .tier-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 40px 30px;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }
        
        .tier-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
            box-shadow: var(--shadow);
        }
        
        .tier-card.accent {
            border-color: var(--accent);
            box-shadow: var(--shadow);
        }
        
        .tier-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: var(--accent);
            color: var(--bg-primary);
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 0 var(--radius) 0 var(--radius);
        }
        
        .tier-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .tier-price {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 20px;
            color: var(--accent);
        }
        
        .tier-description {
            color: var(--text-secondary);
            margin-bottom: 30px;
            font-size: 16px;
        }
        
        .tier-features {
            list-style: none;
            margin-bottom: 40px;
        }
        
        .tier-feature {
            padding: 10px 0;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .tier-feature:before {
            content: "✓";
            color: var(--accent);
            font-weight: bold;
        }
        
        .tier-cta {
            display: block;
            width: 100%;
            padding: 16px;
            background: var(--accent);
            color: var(--bg-primary);
            border: none;
            border-radius: var(--radius);
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            text-align: center;
            text-decoration: none;
        }
        
        .tier-cta:hover {
            background: var(--accent-dark);
            transform: translateY(-2px);
        }
        
        /* Brand Family */
        .brand-flow {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
        }
        
        .brand-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 30px;
            width: 200px;
            text-align: center;
            transition: var(--transition);
        }
        
        .brand-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent);
        }
        
        .brand-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--accent);
        }
        
        .brand-description {
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        /* Philosophy */
        .philosophy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .philosophy-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 30px;
        }
        
        .philosophy-icon {
            font-size: 32px;
            margin-bottom: 20px;
        }
        
        .philosophy-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--accent);
        }
        
        /* Company */
        .company-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        .company-text {
            font-size: 18px;
            color: var(--text-secondary);
            margin-bottom: 30px;
        }
        
        /* Contact */
        .contact-form {
            max-width: 500px;
            margin: 40px auto 0;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-input {
            width: 100%;
            padding: 16px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            color: var(--text-primary);
            font-size: 16px;
            transition: var(--transition);
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--accent);
        }
        
        .form-textarea {
            min-height: 150px;
            resize: vertical;
        }
        
        /* Footer */
        .footer {
            background: var(--bg-secondary);
            padding: 60px 0 40px;
            border-top: 1px solid var(--border);
            margin-top: 100px;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .footer-brand {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: var(--accent);
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-link {
            color: var(--text-secondary);
            text-decoration: none;
            margin-bottom: 10px;
            display: block;
            transition: var(--transition);
        }
        
        .footer-link:hover {
            color: var(--accent);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 40px;
            border-top: 1px solid var(--border);
            color: var(--text-secondary);
            font-size: 14px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 48px;
            }
            
            .nav-links {
                display: none;
            }
            
            .mobile-menu-btn {
                display: block;
            }
            
            .brand-flow {
                flex-direction: column;
                align-items: center;
            }
            
            .brand-card {
                width: 100%;
                max-width: 300px;
            }
            
            .section {
                padding: 60px 0;
            }
        }
        
        @media (max-width: 480px) {
            .hero h1 {
                font-size: 36px;
            }
            
            .hero-subtitle {
                font-size: 18px;
            }
            
            .section-title {
                font-size: 32px;
            }
            
            .tier-price {
                font-size: 36px;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="container nav-content">
            <a href="/" class="logo">
                <span>🧠</span>
                <span>Cocapn</span>
            </a>
            <div class="nav-links">
                <a href="#membership" class="nav-link">Membership</a>
                <a href="#features" class="nav-link">Features</a>
                <a href="#company" class="nav-link">Company</a>
                <a href="#docs" class="nav-link">Docs</a>
                <a href="#contact" class="nav-link">Contact</a>
            </div>
            <button class="mobile-menu-btn">☰</button>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <h1>The Cocapn Ecosystem</h1>
            <p class="hero-subtitle">
                Open-source agent infrastructure for the next generation of autonomous systems.
                Pay only for what you use, fork everything, and self-host if you want.
            </p>
        </div>
    </section>

    <!-- Membership Tiers -->
    <section id="membership" class="section">
        <div class="container">
            <h2 class="section-title">Membership Tiers</h2>
            <div class="tiers-grid">
                ${MEMBERSHIP_TIERS.map(tier => `
                <div class="tier-card ${tier.accent ? 'accent' : ''}">
                    ${tier.accent ? '<div class="tier-badge">Most Popular</div>' : ''}
                    <h3 class="tier-name">${tier.name}</h3>
                    <div class="tier-price">${tier.price}</div>
                    <p class="tier-description">${tier.description}</p>
                    <ul class="tier-features">
                        ${tier.features.map(feature => `
                        <li class="tier-feature">${feature}</li>
                        `).join('')}
                    </ul>
                    <a href="${tier.ctaLink}" class="tier-cta">${tier.ctaText}</a>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Why Pay? -->
    <section id="features" class="section" style="background: var(--bg-secondary);">
        <div class="container">
            <h2 class="section-title">What You're Paying For</h2>
            <div class="philosophy-grid">
                <div class="philosophy-card">
                    <div class="philosophy-icon">📦</div>
                    <h3 class="philosophy-title">Cloud Infrastructure</h3>
                    <p>Your membership pays for servers, bandwidth, and maintenance. The software itself is free and open source.</p>
                </div>
                <div class="philosophy-card">
                    <div class="philosophy-icon">🤝</div>
                    <h3 class="philosophy-title">Cost-Plus Pricing</h3>
                    <p>We charge only what it costs us, plus a small margin. High-performing stars get their costs reduced to zero.</p>
                </div>
                <div class="philosophy-card">
                    <div class="philosophy-icon">🌱</div>
                    <h3 class="philosophy-title">Ecosystem Growth</h3>
                    <p>Upper tiers subsidize lower tiers. The more people use it, the better it gets for everyone.</p>
                </div>
                <div class="philosophy-card">
                    <div class="philosophy-icon">🔓</div>
                    <h3 class="philosophy-title">No Lock-in</h3>
                    <p>Fork everything on GitHub and self-host if you want. You own your data and your workflow.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Brand Family -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">The Ecosystem</h2>
            <div class="brand-flow">
                ${BRAND_FAMILY.map(brand => `
                <div class="brand-card">
                    <div class="brand-name">${brand.name}</div>
                    <p class="brand-description">${brand.description}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Company -->
    <section id="company" class="section" style="background: var(--bg-secondary);">
        <div class="container">
            <h2 class="section-title">Our Story</h2>
            <div class="company-content">
                <p class="company-text">
                    Cocapn started with a simple idea: make autonomous agent infrastructure accessible to everyone.
                    We believe that the future of software is collaborative, open, and decentralized.
                </p>
                <p class="company-text">
                    Our mission is to build tools that empower creators, not lock them in.
                    Every line of code we write is open source, every decision we make is transparent,
                    and every dollar we charge goes back into making the ecosystem better.
                </p>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section">
        <div class="container">
            <h2 class="section-title">Get in Touch</h2>
            <form class="contact-form">
                <div class="form-group">
                    <input type="email" class="form-input" placeholder="Your email" required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Subject" required>
                </div>
                <div class="form-group">
                    <textarea class="form-input form-textarea" placeholder="Your message" required></textarea>
                </div>
                <button type="submit" class="tier-cta">Send Message</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">🧠 Cocapn</div>
                    <p style="color: var(--text-secondary);">Open-source agent infrastructure</p>
                </div>
                <div>
                    <div class="footer-brand">Products</div>
                    <ul class="footer-links">
                        <li><a href="https://deckboss.ai" class="footer-link">Deckboss.ai</a></li>
                        <li><a href="https://deckboss.net" class="footer-link">Deckboss.net</a></li>
                        <li><a href="https://cocapn.ai" class="footer-link">Cocapn.ai</a></li>
                        <li><a href="https://capitaine.ai" class="footer-link">Capitaine.ai</a></li>
                    </ul>
                </div>
                <div>
                    <div class="footer-brand">Resources</div>
                    <ul class="footer-links">
                        <li><a href="/docs" class="footer-link">Documentation</a></li>
                        <li><a href="https://github.com/Lucineer" class="footer-link">GitHub</a></li>
                        <li><a href="/blog" class="footer-link">Blog</a></li>
                        <li><a href="/support" class="footer-link">Support</a></li>
                    </ul>
                </div>
                <div>
                    <div class="footer-brand">Legal</div>
                    <ul class="footer-links">
                        <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
                        <li><a href="/terms" class="footer-link">Terms of Service</a></li>
                        <li><a href="/security" class="footer-link">Security</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© ${new Date().getFullYear()} Cocapn Ecosystem. All software is open source under MIT License.</p>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    </script>
</body>
</html>
`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Set security headers
    const securityHeaders = {
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };

    // Health endpoint
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }), {
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }

    // API endpoint for membership data
    if (path === '/api/v1/membership') {
      const apiResponse = {
        tiers: MEMBERSHIP_TIERS,
        philosophy: {
          title: "Our Pricing Philosophy",
          points: [
            "Software is open source and free — membership pays for cloud infrastructure, support, and convenience",
            "Cost-plus pricing that drops to 0 for high-performing stars — loyalty reward",
            "Upper tiers subsidize lower tiers — the ecosystem grows when more people use it",
            "No lock-in: fork everything and self-host if you want"
          ]
        },
        updated: new Date().toISOString()
      };

      return new Response(JSON.stringify(apiResponse, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          ...securityHeaders
        }
      });
    }

    // Serve main HTML page
    if (path === '/' || path === '/index.html') {
      return new Response(HTML_TEMPLATE, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          ...securityHeaders
        }
      });
    }

    // 404 for other routes
    return new Response('Not Found', {
      status: 404,
      headers: securityHeaders
    });
  }
};


This Cloudflare Worker provides:

1. **Complete Company/Membership Site** with all requested sections
2. **Professional Design** with dark theme, responsive layout, and Linear/Vercel-like aesthetics
3. **Membership Tiers** displayed in responsive cards with clear CTAs
4. **Brand Family Diagram** showing the ecosystem lifecycle
5. **Pricing Philosophy** section explaining the cost-plus model
6. **Required Endpoints**:
   - `/health` for health checks
   - `/api/v1/membership` returning tier details as JSON
7. **Security Headers** including CSP and X-Frame-Options
8. **Mobile-First Responsive Design**
9. **Single File** with no external dependencies
10. **TypeScript** with proper typing

The design uses the `#00d4ff` accent color throughout, has a clean professional feel, and includes all navigation items. The membership tiers are clearly presented with their features, and the philosophy section communicates the unique pricing approach effectively.