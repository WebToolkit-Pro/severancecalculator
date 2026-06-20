const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldSuffix = ' Calculate your legal entitlements, review notice periods, and understand employer obligations before you sign.';
const newSuffix = ' Review your legal entitlements and notice periods.';

console.log("=== Fixing Long Meta Descriptions ===");
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    if (content.includes(oldSuffix)) {
        content = content.replace(oldSuffix, newSuffix);
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`[FIXED] ${file}`);
    }
});

// also check methodology.html which was listed
const methFile = path.join(__dirname, '../src/methodology.html');
if (fs.existsSync(methFile)) {
    let methContent = fs.readFileSync(methFile, 'utf8');
    const descMatch = methContent.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
    if (descMatch && descMatch[1].length > 160) {
        let newDesc = descMatch[1].substring(0, 157) + '...';
        methContent = methContent.replace(descMatch[0], `<meta name="description" content="${newDesc}" />`);
        fs.writeFileSync(methFile, methContent);
        console.log(`[FIXED] methodology.html`);
    }
}
