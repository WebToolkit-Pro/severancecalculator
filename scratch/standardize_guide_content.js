const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Update Formula Blocks
        content = content.replace(/<div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 14px; margin: 15px 0;">\s*(.*?)\s*<\/div>/g, '<div class="formula-block">$1</div>');
        
        // 2. Update CTA Boxes (handle slight variations in whitespace/attributes)
        const ctaRegex = /<div style="background: var\(--accent-light\); padding: 24px; border-radius: 12px; margin-top: 40px; border-left: 4px solid var\(--accent-mid\);">\s*<h4 style="color: var\(--accent\); font-weight: 700;">(.*?)<\/h4>\s*<p style="font-size: 14px; margin: 10px 0 20px;">(.*?)<\/p>\s*<a href="(.*?)" class="btn-calc"(.*?)>(.*?)<\/a>\s*<\/div>/gs;
        
        content = content.replace(ctaRegex, '<div class="cta-box"><h4>$1</h4><p>$2</p><a href="$3" class="btn-calc"$4>$5</a></div>');
        
        // 3. Remove legacy inline styles from headers to allow CSS to take over
        content = content.replace(/<h2 style="font-weight: 700; margin-bottom: 20px;">/g, '<h2>');
        content = content.replace(/<h3 style="font-weight: 700; margin: 30px 0 15px;">/g, '<h3>');
        
        fs.writeFileSync(filePath, content);
    }
});
