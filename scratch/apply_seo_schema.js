const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Add Canonical if missing
        if (!content.includes('rel="canonical"')) {
            const canonical = `<link rel="canonical" href="https://www.severancecalculator.xyz/blog/${file}">`;
            content = content.replace('</head>', `    ${canonical}\n</head>`);
        }
        
        // 2. Add Article/Software Schema
        if (!content.includes('application/ld+json')) {
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            const descMatch = content.match(/<meta name="description" content="(.*?)"/);
            const title = titleMatch ? titleMatch[1].replace(/"/g, "'") : 'Labor Law Guide';
            const description = descMatch ? descMatch[1].replace(/"/g, "'") : 'Detailed labor law guide for 2025.';
            
            let schema = `
    <!-- JSON-LD SCHEMA (GEO/AIO Optimization) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${title}",
      "description": "${description}",
      "author": { "@type": "Organization", "name": "SeveranceCalculator.xyz" },
      "publisher": {
        "@type": "Organization",
        "name": "SeveranceCalculator.xyz",
        "logo": { "@type": "ImageObject", "url": "https://www.severancecalculator.xyz/assets/favicon.png" }
      },
      "datePublished": "2025-01-01"
    }
    </script>`;

            // 3. Add FAQ Schema if <details> found
            if (content.includes('<details')) {
                // Very basic regex to pull summary and content
                const faqMatch = content.match(/<details.*?>\s*<summary>(.*?)<\/summary>\s*(?:<div.*?>)?(.*?)(?:<\/div>)?\s*<\/details>/gs);
                if (faqMatch) {
                    const faqs = faqMatch.map(m => {
                        const q = m.match(/<summary>(.*?)<\/summary>/)[1].replace(/"/g, "'");
                        const a = m.match(/<\/summary>\s*(?:<div.*?>)?(.*?)(?:<\/div>)?\s*<\/details>/s)[1].replace(/<[^>]*>?/gm, '').replace(/"/g, "'").trim();
                        return { "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } };
                    });
                    
                    schema += `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(faqs)}
    }
    </script>`;
                }
            }

            content = content.replace('</head>', `${schema}\n</head>`);
        }
        
        fs.writeFileSync(filePath, content);
    }
});
