import os
import re

# Premium Components
NAV_HTML = """
    <nav>
        <a href="/" class="topnav-brand">
            <i data-lucide="briefcase"></i> <span>SeveranceCalculator.xyz</span>
        </a>
        <div class="topnav-links" id="topnav-links">
            <a href="/#calculator">Calculator</a>
            <a href="/blog/index.html">Legal Guides</a>
            <a href="/about.html">About Us</a>
            <a href="/#calculator" class="nav-cta">Get Started</a>
        </div>
        <button class="menu-toggle" onclick="toggleMenu()">
            <i data-lucide="menu"></i>
        </button>
    </nav>
"""

FOOTER_HTML = """
    <footer>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1000px; margin: 0 auto;">
            <div>
                <h4>SeveranceCalculator.xyz</h4>
                <p>Professional global financial tools powered by <a href="https://wtkpro.site" target="_blank" style="color:white; font-weight:600;">WebToolkit Pro</a>.</p>
            </div>
            <div>
                <h4>legal</h4>
                <ul>
                    <li><a href="/legal/privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="/legal/terms-and-conditions.html">Terms & Conditions</a></li>
                    <li><a href="/legal/disclaimer.html">Disclaimer</a></li>
                </ul>
            </div>
            <div>
                <h4>support</h4>
                <ul>
                    <li><a href="/about.html">About Us</a></li>
                    <li><a href="/contact.html">Contact Us</a></li>
                    <li><a href="/blog/index.html">Labor Guides</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2025 SeveranceCalculator.xyz. All Rights Reserved.
        </div>
    </footer>
"""

SCRIPTS_HTML = """
    <script src="/js/script.js?v=2.3"></script>
    <script>lucide.createIcons();</script>
</body>
</html>
"""

def overhaul_page(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Replace Navbar (using broad pattern to catch corruption)
    content = re.sub(r'<nav.*?</nav>', NAV_HTML, content, flags=re.DOTALL)
    
    # Replace Footer
    content = re.sub(r'<footer.*?</footer>', FOOTER_HTML, content, flags=re.DOTALL)
    
    # Replace Script tags at end
    content = re.sub(r'<script src="js/script\.js.*?</script>.*?<script>lucide\.createIcons\(\);</script>.*?</body>.*?</html>', SCRIPTS_HTML, content, flags=re.DOTALL)
    content = re.sub(r'<script src="/js/script\.js.*?</script>.*?<script>lucide\.createIcons\(\);</script>.*?</body>.*?</html>', SCRIPTS_HTML, content, flags=re.DOTALL)

    # Header Overhaul for non-index pages
    if os.path.basename(path) != "index.html":
        # Add common header style if missing
        header_pattern = r'<header>(.*?)</header>'
        header_match = re.search(header_pattern, content, flags=re.DOTALL)
        if header_match:
            new_header = f"""<header>
    {header_match.group(1)}
</header>"""
            content = content.replace(header_match.group(0), new_header)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Process all files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            overhaul_page(os.path.join(root, file))

# Run deep clean to ensure symbols are perfect
os.system('python nuclear_clean.py')
