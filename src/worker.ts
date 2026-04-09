// worker.ts - Cocapn.com Cloudflare Worker
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cocapn Ecosystem - Open Source Agent Infrastructure</title>
  <meta name="description" content="Open source agent infrastructure. Pay only for cloud services and support. Everything else is free and yours.">
  <style>
    :root {
      --accent: #00d4ff;
      --bg-dark: #0a0a0a;
      --bg-card: #111111;
      --text-primary: #ffffff;
      --text-secondary: #a0a0a0;
      --border: #222222;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg-dark);
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
    nav {
      padding: 24px 0;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: var(--bg-dark);
      z-index: 100;
    }
    
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
    }
    
    .nav-links {
      display: flex;
      gap: 32px;
    }
    
    .nav-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .nav-links a:hover {
      color: var(--accent);
    }
    
    /* Hero */
    .hero {
      padding: 120px 0 80px;
      text-align: center;
    }
    
    .hero h1 {
      font-size: 64px;
      font-weight: 700;
      margin-bottom: 24px;
      background: linear-gradient(90deg, #ffffff, var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-subtitle {
      font-size: 20px;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 48px;
    }
    
    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .btn-primary {
      background: var(--accent);
      color: var(--bg-dark);
    }
    
    .btn-outline {
      border: 2px solid var(--border);
      color: var(--text-primary);
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
    }
    
    /* Sections */
    section {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: 40px;
      margin-bottom: 48px;
      text-align: center;
    }
    
    /* Membership Cards */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 48px;
    }
    
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 32px;
      transition: all 0.3s;
    }
    
    .card:hover {
      border-color: var(--accent);
      transform: translateY(-4px);
    }
    
    .card-popular {
      border-color: var(--accent);
      position: relative;
    }
    
    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent);
      color: var(--bg-dark);
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    
    .card-title {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .card-price {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--accent);
    }
    
    .card-features {
      list-style: none;
    }
    
    .card-features li {
      padding: 8px 0;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border);
    }
    
    .card-features li:last-child {
      border-bottom: none;
    }
    
    /* Why Pay */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
      margin-top: 48px;
    }
    
    .why-card {
      padding: 32px;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border);
    }
    
    .why-card h3 {
      font-size: 20px;
      margin-bottom: 16px;
      color: var(--accent);
    }
    
    /* Ecosystem Diagram */
    .ecosystem-flow {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin: 48px 0;
      font-size: 18px;
    }
    
    .flow-item {
      padding: 16px 24px;
      background: var(--bg-card);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    
    .flow-arrow {
      color: var(--accent);
      font-size: 24px;
    }
    
    /* Company */
    .company-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    .company-content p {
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
    
    /* Footer */
    footer {
      padding: 64px 0;
      border-top: 1px solid var(--border);
      margin-top: 80px;
    }
    
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px;
      margin-bottom: 32px;
    }
    
    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .footer-links a:hover {
      color: var(--accent);
    }
    
    .copyright {
      text-align: center;
      color: var(--text-secondary);
      font-size: 14px;
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 48px;
      }
      
      .nav-links {
        display: none;
      }
      
      .ecosystem-flow {
        flex-direction: column;
      }
      
      .flow-arrow {
        transform: rotate(90deg);
      }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container nav-content">
      <a href="/" class="logo">Cocapn</a>
      <div class="nav-links">
        <a href="#membership">Membership</a>
        <a href="#ecosystem">Ecosystem</a>
        <a href="#company">Company</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>

  <main>
    <section class="hero">
      <div class="container">
        <h1>The Cocapn Ecosystem</h1>
        <p class="hero-subtitle">Open source agent infrastructure. Pay only for cloud services and support. Everything else is free and yours.</p>
        <div class="cta-buttons">
          <a href="https://github.com/Lucineer" class="btn btn-primary">Get Started</a>
          <a href="#architecture" class="btn btn-outline">Read the Architecture</a>
        </div>
      </div>
    </section>

    <section id="membership">
      <div class="container">
        <h2 class="section-title">Membership</h2>
        <div class="cards-grid">
          <div class="card">
            <h3 class="card-title">Free</h3>
            <div class="card-price">$0</div>
            <ul class="card-features">
              <li>5 Deckboss designs/day</li>
              <li>1 Cocapn instance</li>
              <li>Community content and support</li>
              <li>Open source access</li>
            </ul>
          </div>
          
          <div class="card">
            <h3 class="card-title">Standard</h3>
            <div class="card-price">$9/mo</div>
            <ul class="card-features">
              <li>Unlimited designs</li>
              <li>5 instances</li>
              <li>Cloud sync</li>
              <li>500 course tokens/mo</li>
              <li>Email support</li>
              <li>Fleet analytics</li>
            </ul>
          </div>
          
          <div class="card card-popular">
            <div class="popular-badge">Most Popular</div>
            <h3 class="card-title">Professional</h3>
            <div class="card-price">$29/mo</div>
            <ul class="card-features">
              <li>Unlimited instances</li>
              <li>Capitaine.ai access</li>
              <li>Priority support</li>
              <li>2000 course tokens/mo</li>
              <li>White-label options</li>
              <li>Multi-device management</li>
            </ul>
          </div>
          
          <div class="card">
            <h3 class="card-title">Enterprise</h3>
            <div class="card-price">$99/seat/mo</div>
            <ul class="card-features">
              <li>Dedicated support engineer</li>
              <li>Custom hardware configurations</li>
              <li>On-site training available</li>
              <li>SLA guarantees</li>
              <li>Unlimited tokens</li>
              <li>White-label everything</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="why">
      <div class="container">
        <h2 class="section-title">Open Source. Zero Lock-in.</h2>
        <div class="why-grid">
          <div class="why-card">
            <h3>Cost-Plus Pricing</h3>
            <p>We charge for cloud infrastructure and support at cost-plus. Higher-tier members see pricing approach zero as the ecosystem scales. Loyalty is rewarded.</p>
          </div>
          <div class="why-card">
            <h3>Fork and Self-Host</h3>
            <p>Everything is MIT licensed. Run your own Cloudflare Workers. Build your own hardware. No dependency on us.</p>
          </div>
          <div class="why-card">
            <h3>Token Economy</h3>
            <p>Course generation and fresh AI content costs tokens. Shared community content is free. The sharing flywheel means costs decrease over time as the community grows.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="ecosystem">
      <div class="container">
        <h2 class="section-title">Ecosystem Lifecycle</h2>
        <div class="ecosystem-flow">
          <div class="flow-item">Deckboss.ai (Build)</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">Deckboss.net (Buy Hardware)</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">Cocapn (Deploy on Device)</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">Cocapn.ai (Operate and Monitor)</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">Cocapn.com (Membership and Support)</div>
        </div>
      </div>
    </section>

    <section id="company">
      <div class="container">
        <h2 class="section-title">Built in Alaska. By Technicians, For Technicians.</h2>
        <div class="company-content">
          <p>We are commercial fishermen and marine technicians who built AI tools because we needed them. The same tools that monitor fishing vessels now power robotics systems, content pipelines, and agent networks worldwide.</p>
          <p>Open source is not our business model - it is our conviction. We believe the best tools are the ones anyone can inspect, modify, and share.</p>
        </div>
      </div>
    </section>
  </main>

  <footer id="contact">
    <div class="container">
      <div class="footer-links">
        <a href="https://deckboss.ai">Deckboss.ai</a>
        <a href="https://deckboss.net">Deckboss.net</a>
        <a href="https://cocapn.ai">Cocapn.ai</a>
        <a href="https://cocapn.com">Cocapn.com</a>
        <a href="https://capitaine.ai">Capitaine.ai</a>
        <a href="https://github.com/Lucineer">github.com/Lucineer</a>
      </div>
      <p class="copyright">© 2024 Cocapn Ecosystem. All rights reserved.</p>
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
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
  </script>

    <div style="max-width:700px;margin:2rem auto;padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:12px;text-align:center">
      <p style="margin:0 0 0.5rem;font-size:0.8rem;color:#888">Part of the Lucineer Ecosystem</p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;font-size:0.75rem">
        <a href="https://github.com/Lucineer/cocapn-ai" style="color:#60a5fa;text-decoration:none">cocapn.ai</a>
        <a href="https://github.com/Lucineer/deckboss" style="color:#60a5fa;text-decoration:none">deckboss.ai</a>
        <a href="https://github.com/Lucineer/deckboss-hardware" style="color:#60a5fa;text-decoration:none">deckboss.net</a>
        <a href="https://github.com/Lucineer/capitaine-ai" style="color:#60a5fa;text-decoration:none">capitaine.ai</a>
        <a href="https://github.com/Lucineer/the-fleet" style="color:#60a5fa;text-decoration:none">the-fleet</a>
      </div>
      <p style="margin:0.5rem 0 0;font-size:0.65rem;color:#666">Built by Superinstance &amp; Lucineer (DiGennaro et al.)</p>
    </div>
</body>
</html>`;

const membershipData = {
  tiers: [
    {
      name: "Free",
      price: "$0",
      features: [
        "5 Deckboss designs/day",
        "1 Cocapn instance",
        "Community content and support",
        "Open source access"
      ]
    },
    {
      name: "Standard",
      price: "$9/mo",
      features: [
        "Unlimited designs",
        "5 instances",
        "Cloud sync",
        "500 course tokens/mo",
        "Email support",
        "Fleet analytics"
      ]
    },
    {
      name: "Professional",
      price: "$29/mo",
      features: [
        "Unlimited instances",
        "Capitaine.ai access",
        "Priority support",
        "2000 course tokens/mo",
        "White-label options",
        "Multi-device management"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99/seat/mo",
      features: [
        "Dedicated support engineer",
        "Custom hardware configurations",
        "On-site training available",
        "SLA guarantees",
        "Unlimited tokens",
        "White-label everything"
      ]
    }
  ]
};

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Set security headers
    const securityHeaders = {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    };

    // Handle API endpoints
    if (path === "/api/v1/membership") {
      return new Response(JSON.stringify(membershipData), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
          ...securityHeaders
        }
      });
    }

    if (path === "/health") {
      return new Response(JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }), {
        headers: {
          "Content-Type": "application/json",
          ...securityHeaders
        }
      });
    }

    // Handle OPTIONS for CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Serve main HTML page
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        ...securityHeaders
      }
    });
  }
};