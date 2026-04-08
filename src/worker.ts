export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Health check endpoint
    if (path === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Main HTML response
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocapn - Membership & Billing</title>
    <meta name="description" content="Open source agent infrastructure. Pay only for convenience.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --bg: #0a0a0a; --accent: #00d4ff; --text: #f0f0f0; --card: #1a1a1a; }
        body { 
            background: var(--bg); 
            color: var(--text); 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 20px; 
        }
        header { 
            padding: 20px 0; 
            border-bottom: 1px solid #333; 
            position: sticky; 
            top: 0; 
            background: var(--bg); 
            z-index: 1000;
        }
        nav { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            flex-wrap: wrap;
        }
        .logo { 
            font-size: 1.5rem; 
            font-weight: bold; 
            color: var(--accent); 
            text-decoration: none; 
        }
        .nav-links { 
            display: flex; 
            gap: 30px; 
            flex-wrap: wrap;
        }
        .nav-links a { 
            color: var(--text); 
            text-decoration: none; 
            transition: color 0.3s; 
        }
        .nav-links a:hover { 
            color: var(--accent); 
        }
        .hero { 
            text-align: center; 
            padding: 80px 20px; 
            max-width: 800px; 
            margin: 0 auto; 
        }
        .hero h1 { 
            font-size: 3.5rem; 
            margin-bottom: 20px; 
            background: linear-gradient(90deg, var(--accent), #00a8ff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .hero p { 
            font-size: 1.2rem; 
            color: #aaa; 
            margin-bottom: 40px; 
        }
        section { 
            padding: 80px 0; 
            border-bottom: 1px solid #333; 
        }
        h2 { 
            font-size: 2.5rem; 
            margin-bottom: 30px; 
            color: var(--accent); 
        }
        .philosophy { 
            max-width: 800px; 
            margin: 0 auto; 
        }
        .philosophy p { 
            margin-bottom: 20px; 
            font-size: 1.1rem; 
        }
        .pricing-cards { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 30px; 
            margin-top: 50px; 
        }
        .card { 
            background: var(--card); 
            border-radius: 10px; 
            padding: 30px; 
            position: relative; 
            transition: transform 0.3s, box-shadow 0.3s; 
            border: 1px solid #333; 
        }
        .card:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1); 
        }
        .card h3 { 
            font-size: 1.8rem; 
            margin-bottom: 10px; 
        }
        .card .price { 
            font-size: 2.5rem; 
            color: var(--accent); 
            margin-bottom: 20px; 
        }
        .card ul { 
            list-style: none; 
            margin-bottom: 30px; 
        }
        .card li { 
            margin-bottom: 10px; 
            padding-left: 20px; 
            position: relative; 
        }
        .card li:before { 
            content: "✓"; 
            color: var(--accent); 
            position: absolute; 
            left: 0; 
        }
        .badge { 
            position: absolute; 
            top: -10px; 
            right: 20px; 
            background: var(--accent); 
            color: var(--bg); 
            padding: 5px 15px; 
            border-radius: 20px; 
            font-size: 0.9rem; 
            font-weight: bold; 
        }
        .btn { 
            display: inline-block; 
            background: var(--accent); 
            color: var(--bg); 
            padding: 12px 30px; 
            border-radius: 5px; 
            text-decoration: none; 
            font-weight: bold; 
            border: none; 
            cursor: pointer; 
            width: 100%; 
            text-align: center; 
            transition: opacity 0.3s; 
        }
        .btn:hover { 
            opacity: 0.9; 
        }
        .ecosystem { 
            text-align: center; 
            font-family: monospace; 
            font-size: 1.2rem; 
            line-height: 2; 
            background: var(--card); 
            padding: 30px; 
            border-radius: 10px; 
            margin-top: 30px; 
            overflow-x: auto;
        }
        .company { 
            text-align: center; 
            font-size: 1.2rem; 
        }
        footer { 
            padding: 50px 0; 
            text-align: center; 
            border-top: 1px solid #333; 
        }
        .footer-links { 
            display: flex; 
            justify-content: center; 
            flex-wrap: wrap; 
            gap: 30px; 
            margin-bottom: 30px; 
        }
        .footer-links a { 
            color: var(--text); 
            text-decoration: none; 
            transition: color 0.3s; 
        }
        .footer-links a:hover { 
            color: var(--accent); 
        }
        .copyright { 
            color: #666; 
            font-size: 0.9rem; 
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            h2 { font-size: 2rem; }
            .nav-links { gap: 15px; margin-top: 15px; }
            .pricing-cards { grid-template-columns: 1fr; }
            .footer-links { gap: 15px; }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="/" class="logo">Cocapn</a>
                <div class="nav-links">
                    <a href="#membership">Membership</a>
                    <a href="#features">Features</a>
                    <a href="#ecosystem">Ecosystem</a>
                    <a href="#company">Company</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <h1>The Cocapn Ecosystem</h1>
            <p>Open source agent infrastructure. Pay only for convenience.</p>
            <a href="#membership" class="btn">View Memberships</a>
        </section>

        <section id="philosophy" class="container">
            <div class="philosophy">
                <h2>Why pay?</h2>
                <p>All software is free and open source. Membership pays for cloud infrastructure, support, and training.</p>
                <p>We use cost-plus pricing that drops to $0 for top performers. No lock-in - fork and self-host anytime.</p>
            </div>
        </section>

        <section id="membership" class="container">
            <h2>Membership Plans</h2>
            <div class="pricing-cards">
                <div class="card">
                    <h3>Free</h3>
                    <div class="price">$0</div>
                    <ul>
                        <li>5 Deckboss designs/day</li>
                        <li>1 Cocapn instance</li>
                        <li>Community support</li>
                    </ul>
                    <a href="#" class="btn">Get Started</a>
                </div>
                <div class="card">
                    <h3>Standard</h3>
                    <div class="price">$9/mo</div>
                    <ul>
                        <li>Unlimited designs</li>
                        <li>5 instances</li>
                        <li>Cloud sync</li>
                        <li>Email support</li>
                    </ul>
                    <a href="#" class="btn">Subscribe</a>
                </div>
                <div class="card">
                    <div class="badge">Most Popular</div>
                    <h3>Professional</h3>
                    <div class="price">$29/mo</div>
                    <ul>
                        <li>Unlimited everything</li>
                        <li>Capitaine.ai access</li>
                        <li>Priority support</li>
                        <li>White-label options</li>
                    </ul>
                    <a href="#" class="btn">Subscribe</a>
                </div>
                <div class="card">
                    <h3>Enterprise</h3>
                    <div class="price">$99/seat</div>
                    <ul>
                        <li>Dedicated support</li>
                        <li>Custom hardware</li>
                        <li>On-site training</li>
                        <li>SLA guarantee</li>
                    </ul>
                    <a href="#" class="btn">Contact Sales</a>
                </div>
            </div>
        </section>

        <section id="ecosystem" class="container">
            <h2>Ecosystem</h2>
            <div class="ecosystem">
                Deckboss.ai (build) → Deckboss.net (buy) → Cocapn (deploy) → Cocapn.ai (operate) → Cocapn.com (membership)
            </div>
        </section>

        <section id="company" class="container">
            <div class="company">
                <h2>Company</h2>
                <p>Built by technicians, for technicians.</p>
                <p>Based in Alaska.</p>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="https://deckboss.ai">Deckboss.ai</a>
                <a href="https://deckboss.net">Deckboss.net</a>
                <a href="https://cocapn.ai">Cocapn.ai</a>
                <a href="https://cocapn.com">Cocapn.com</a>
                <a href="https://capitaine.ai">Capitaine.ai</a>
                <a href="https://github.com/Lucineer">github.com/Lucineer</a>
            </div>
            <p class="copyright">© ${new Date().getFullYear()} Cocapn. All software is open source.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                const target = document.querySelector(targetId);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
};