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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
