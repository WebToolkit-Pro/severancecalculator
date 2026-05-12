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
            
            // Remove mobile compliance tags and comments
            let updatedContent = content.replace(/<meta name="HandheldFriendly" content="True">/g, '');
            updatedContent = updatedContent.replace(/<meta name="MobileOptimized" content="320">/g, '');
            updatedContent = updatedContent.replace(/<link rel="apple-touch-icon" .*?>/g, '');
            updatedContent = updatedContent.replace(/<link rel="apple-touch-startup-image" .*?>/g, '');
            updatedContent = updatedContent.replace(/<!-- Mobile Compliance -->/g, '');
            
            // Clean up extra whitespace/newlines left by removals
            updatedContent = updatedContent.replace(/^\s*[\r\n]/gm, '');
            
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Removed mobile tags from ${filePath}`);
            }
        }
    });
}

processDirectory(rootDir);
