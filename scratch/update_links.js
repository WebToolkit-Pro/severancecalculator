const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'global-comparison.html') {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract country slug from filename (everything before the first dash)
        const slug = file.split('-')[0];
        
        // Replace links
        const updatedContent = content.replace(/href="\/(#calculator|#Severance-pay-calculator-2025)"/g, `href="/?country=${slug}#calculator"`);
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated ${file} with slug: ${slug}`);
        }
    }
});
