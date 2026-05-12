const fs = require('fs');
const path = require('path');

const rootDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo';
const baseUrl = 'https://www.severancecalculator.xyz';
const urls = [];

function scan(dir, relPath = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const currentRelPath = relPath ? `${relPath}/${file}` : file;

        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'assets' && file !== 'css' && file !== 'js' && file !== 'scratch') {
                scan(filePath, currentRelPath);
            }
        } else if (file.endsWith('.html')) {
            let urlPath = currentRelPath.replace(/\\/g, '/').replace('.html', '');
            if (urlPath === 'index') urlPath = '';
            else if (urlPath.endsWith('/index')) urlPath = urlPath.replace('/index', '');
            
            urls.push(`${baseUrl}/${urlPath}`);
        }
    });
}

scan(rootDir);
fs.writeFileSync(path.join(rootDir, 'urls.txt'), urls.join('\n'));
console.log(`Generated urls.txt with ${urls.length} URLs`);
