const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const popularGuides = [
    { title: 'UAE Gratuity Guide', href: '/blog/uae-gratuity' },
    { title: 'Saudi End-of-Service Guide', href: '/blog/saudi-gratuity' },
    { title: 'Pakistan Benefits Guide', href: '/blog/pakistan-gratuity' },
    { title: 'India Gratuity Act Guide', href: '/blog/india-gratuity' },
    { title: 'UK Redundancy Guide', href: '/blog/uk-redundancy' }
];

console.log("=== SEO Fix Script ===");
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Fix Meta Descriptions
    const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
    if (descMatch) {
        let desc = descMatch[1];
        if (desc.length < 110) {
            desc += ' Calculate your legal entitlements, review notice periods, and understand employer obligations before you sign.';
            content = content.replace(descMatch[0], `<meta name="description" content="${desc}" />`);
            console.log(`[FIXED SHORT] ${file}`);
        } else if (desc.length > 160) {
            desc = desc.substring(0, 157) + '...';
            content = content.replace(descMatch[0], `<meta name="description" content="${desc}" />`);
            console.log(`[FIXED LONG] ${file}`);
        }
    }

    // 2. Inject Related Guides (if not already there)
    if (!content.includes('Related Global Severance Guides')) {
        // Find </article> tag to inject before it
        const articleCloseMatch = content.match(/<\/article>/i);
        if (articleCloseMatch) {
            // Pick 3 random guides that are NOT the current page
            const related = popularGuides.filter(g => !g.href.includes(file.replace('.html', ''))).slice(0, 3);
            
            let relatedHtml = `
                <div style="margin-top: 40px; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 15px;">Related Global Severance Guides</h3>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                        ${related.map(g => `<li><a href="${g.href}" style="color: #60a5fa; text-decoration: none; font-weight: 500;">&rarr; ${g.title}</a></li>`).join('')}
                    </ul>
                </div>
            `;
            
            content = content.replace(/<\/article>/i, relatedHtml + '\n            </article>');
            console.log(`[INJECTED LINKS] ${file}`);
        }
    }

    fs.writeFileSync(path.join(dir, file), content);
});

console.log("=== Done! ===");
