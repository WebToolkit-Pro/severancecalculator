const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo';

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== 'assets') {
                processFiles(filePath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Inject legacy mobile tags after viewport
            const legacyTags = `
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">`;
            
            if (!content.includes('HandheldFriendly')) {
                content = content.replace(/(<meta name="viewport".*?>)/i, '$1' + legacyTags);
                fs.writeFileSync(filePath, content);
                console.log(`Injected legacy mobile tags in ${filePath}`);
            }
        }
    });
}

processFiles(rootDir);
