const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');

const sitemapUrls = [];

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
            if (urlPath === '/index.html') urlPath = '/';
            const fullUrl = 'https://severancecalculator.xyz' + urlPath;

            sitemapUrls.push({ url: fullUrl, priority: urlPath === '/' ? '1.0' : '0.8' });

            // Prepare Dynamic Injection Block
            const semanticMeta = `
    <!-- Dynamic SEO & OpenGraph Injection -->
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:image" content="https://severancecalculator.xyz/assets/og-image.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://severancecalculator.xyz/assets/og-image.png" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${urlPath === '/' ? 'SoftwareApplication' : 'Article'}",
      "name": "${title}",
      "description": "${desc}",
      "url": "${fullUrl}",
      "image": "https://severancecalculator.xyz/assets/og-image.png",
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
console.log('Generating sitemap.xml...');
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
for (const item of sitemapUrls) {
    sitemapXml += `
  <url>
    <loc>${item.url}</loc>
    <priority>${item.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`;
}
sitemapXml += `\n</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

console.log('Build complete! Output in /dist');
