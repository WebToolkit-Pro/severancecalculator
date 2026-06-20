const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');

const mainUrls = [];
const blogUrls = [];
// Read partials
const navContent = fs.readFileSync(path.join(PARTIALS_DIR, 'nav.html'), 'utf8');
const footerContent = fs.readFileSync(path.join(PARTIALS_DIR, 'footer.html'), 'utf8');

// Helper to copy folder recursively
function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    const elements = fs.readdirSync(from);
    for (const element of elements) {
        if (element === 'partials') continue; // Don't copy partials folder to dist

        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);

        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    }
}

// Process HTML files recursively
function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processHtmlFiles(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Replace existing <nav> block with the partial
            content = content.replace(/<nav>[\s\S]*?<\/nav>/i, navContent);

            // Replace existing <footer> block with the partial
            content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/i, footerContent);

            // Extract Title & Description
            const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
            const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
            const title = titleMatch ? titleMatch[1].trim() : 'Severance Pay Calculator - 2026 Labor Law Estimation';
            const desc = descMatch ? descMatch[1].trim() : 'Calculate your severance pay, redundancy settlement, and end-of-service gratuity based on global 2026 labor laws.';

            // Calculate URL
            let urlPath = fullPath.replace(DIST_DIR, '').replace(/\\/g, '/');
            
            // Remove /index.html or .html for clean URLs (matches Vercel cleanUrls: true)
            if (urlPath.endsWith('/index.html')) {
                urlPath = urlPath.replace('/index.html', '');
            } else if (urlPath.endsWith('.html')) {
                urlPath = urlPath.replace('.html', '');
            }
            
            // Fallback for root
            if (urlPath === '') urlPath = '/';
            
            const fullUrl = 'https://severancecalculator.xyz' + urlPath;

            if (urlPath.startsWith('/blog') && urlPath !== '/blog' && urlPath !== '/') {
                blogUrls.push({ url: fullUrl, priority: '0.8' });
            } else {
                mainUrls.push({ url: fullUrl, priority: urlPath === '/' ? '1.0' : '0.9' });
            }

            // Prepare Dynamic Injection Block
            const semanticMeta = `
    <!-- Dynamic SEO & OpenGraph Injection -->
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:image" content="https://severancecalculator.xyz/assets/og-image.jpg" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://severancecalculator.xyz/assets/og-image.jpg" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${urlPath === '/' ? 'SoftwareApplication' : 'Article'}",
      "name": "${title}",
      "description": "${desc}",
      "url": "${fullUrl}",
      "image": "https://severancecalculator.xyz/assets/og-image.jpg",
      "author": { "@type": "Organization", "name": "SeveranceCalculator.xyz" }${urlPath === '/' ? `,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "1"
      }` : ''}
    }
    </script>
</head>`;

            // Remove existing canonicals or OGs to prevent duplicates (simplified approach)
            content = content.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
            content = content.replace(/<meta\s+property="og:[^>]*>/gi, '');
            content = content.replace(/<meta\s+name="twitter:[^>]*>/gi, '');
            content = content.replace(/<script[^>]*src="\/_vercel\/insights\/script\.js"[^>]*><\/script>/gi, '');
            
            // Inject new meta
            content = content.replace(/<\/head>/i, semanticMeta);

            fs.writeFileSync(fullPath, content);
            console.log(`Processed: ${fullPath.replace(DIST_DIR, '')}`);
        }
    }
}

// Clean and build
console.log('Building site...');
if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}

copyFolderSync(SRC_DIR, DIST_DIR);
processHtmlFiles(DIST_DIR);

// Generate sitemap.xml
// Generate sitemap_main.xml
console.log('Generating sitemap_main.xml...');
let sitemapMainXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
for (const item of mainUrls) {
    sitemapMainXml += `\n  <url>\n    <loc>${item.url}</loc>\n    <priority>${item.priority}</priority>\n    <changefreq>weekly</changefreq>\n  </url>`;
}
sitemapMainXml += `\n</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap_main.xml'), sitemapMainXml);

// Generate sitemap_blog.xml
console.log('Generating sitemap_blog.xml...');
let sitemapBlogXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
for (const item of blogUrls) {
    sitemapBlogXml += `\n  <url>\n    <loc>${item.url}</loc>\n    <priority>${item.priority}</priority>\n    <changefreq>weekly</changefreq>\n  </url>`;
}
sitemapBlogXml += `\n</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap_blog.xml'), sitemapBlogXml);

// Generate sitemap_index.xml
console.log('Generating sitemap_index.xml...');
const today = new Date().toISOString().split('T')[0];
let sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://severancecalculator.xyz/sitemap_main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://severancecalculator.xyz/sitemap_blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap_index.xml'), sitemapIndexXml);

console.log('Build complete! Output in /dist');
