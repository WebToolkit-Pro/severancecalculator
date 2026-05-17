const fs = require('fs');
const path = require('path');

// Dynamically determine the root directory relative to the script location
const rootDir = path.join(__dirname, '..');
const baseUrl = 'https://severancecalculator.xyz';
const urls = [];

function scan(dir, relPath = '') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const currentRelPath = relPath ? `${relPath}/${file}` : file;

        if (stat.isDirectory()) {
            if (file !== '.git' && file !== 'assets' && file !== 'css' && file !== 'js' && file !== 'scratch' && file !== 'legal') {
                scan(filePath, currentRelPath);
            }
        } else if (file.endsWith('.html')) {
            let urlPath = currentRelPath.replace(/\\/g, '/').replace('.html', '');
            if (urlPath === 'index') urlPath = '';
            else if (urlPath.endsWith('/index')) urlPath = urlPath.replace('/index', '');
            
            // Format URL cleanly without double trailing slashes or duplicate paths
            const cleanUrl = urlPath ? `${baseUrl}/${urlPath}` : `${baseUrl}/`;
            urls.push(cleanUrl);
        }
    });
}

// Add legal links manually to maintain control over their crawling priorities
const legalFiles = ['disclaimer.html', 'privacy-policy.html', 'terms-and-conditions.html'];
legalFiles.forEach(file => {
    const legalPath = path.join(rootDir, 'legal', file);
    if (fs.existsSync(legalPath)) {
        urls.push(`${baseUrl}/legal/${file.replace('.html', '')}`);
    }
});

scan(rootDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === baseUrl + '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : url.includes('/blog/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
