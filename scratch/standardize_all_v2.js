const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Target the CTA block more broadly
        // Matches blocks with either amber (accent) or emerald (primary) inline backgrounds
        const ctaRegex = /<div style="background: (rgba\(16, 185, 129, 0.05\)|var\(--accent-light\)|#f8fafc);.*?">.*?<h4.*?>\s*(.*?)\s*<\/h4>\s*<p.*?>\s*(.*?)\s*<\/p>\s*<a href="(.*?)" class="btn-calc"(.*?)>(.*?)<\/a>\s*<\/div>/gs;
        
        content = content.replace(ctaRegex, '<div class="cta-box"><h4>$2</h4><p>$3</p><a href="$4" class="btn-calc"$5>$6</a></div>');
        
        // 2. Clean up any remaining legacy inline h2/h3 styles
        content = content.replace(/<(h[23]) style=".*?">/g, '<$1>');
        
        // 3. Fix the unreadable formula block if it exists
        content = content.replace(/<div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px; margin: 15px 0;">\s*(.*?)\s*<\/div>/g, '<div class="formula-block">$1</div>');

        fs.writeFileSync(filePath, content);
    }
});
