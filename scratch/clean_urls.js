const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo';

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'assets' && file !== 'css' && file !== 'js' && file !== 'scratch') {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 1. Remove .html from internal links
            // Pattern: href="/path/to/page.html" or href="page.html"
            // We avoid external links (starting with http)
            let updatedContent = content.replace(/href="(?!\/\/|https?:\/\/)([^"]+)\.html(#?[^"]*)"/g, (match, p1, p2) => {
                // If it's index.html, replace with /
                if (p1 === 'index' || p1 === '/index' || p1.endsWith('/index')) {
                    const dirPath = p1.substring(0, p1.lastIndexOf('index'));
                    return `href="${dirPath || '/'}${p2}"`;
                }
                return `href="${p1}${p2}"`;
            });
            
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Updated links in ${filePath}`);
            }
        }
    });
}

processDirectory(rootDir);
