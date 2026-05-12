const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo';

const mobileTags = `
    <!-- Mobile & PWA Optimization -->
    <meta name="theme-color" content="#0f172a">
    <link rel="apple-touch-icon" href="/assets/favicon.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
`;

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
            
            // Add mobile tags after viewport if not already present
            if (!content.includes('apple-touch-icon')) {
                content = content.replace(/<meta name="viewport".*?>/, (match) => `${match}\n    ${mobileTags.trim()}`);
                fs.writeFileSync(filePath, content);
                console.log(`Added mobile optimization tags to ${filePath}`);
            }
        }
    });
}

processDirectory(rootDir);
