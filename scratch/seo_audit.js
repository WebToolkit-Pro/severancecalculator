const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log("=== Meta Description Audit ===");
files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? descMatch[1] : '';
    const length = desc.length;
    
    if (length < 110) {
        console.log(`[SHORT] ${file} (${length} chars): ${desc}`);
    } else if (length > 160) {
        console.log(`[LONG]  ${file} (${length} chars): ${desc}`);
    } else {
        // ok
    }
});
