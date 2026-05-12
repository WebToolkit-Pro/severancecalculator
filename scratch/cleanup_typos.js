const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

const replacements = [
    { from: /SAudi/g, to: 'Saudi' },
    { from: /SAlary/g, to: 'salary' },
    { from: /tax-SAving/g, to: 'tax-saving' },
    { from: /search Console/g, to: 'Search Console' },
    { from: /statutory /g, to: 'statutory ' }, // Just to be safe, I won't force capitalize yet unless sure
    { from: /PAKISTAN/g, to: 'Pakistan' }
];

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let updatedContent = content;
        
        replacements.forEach(r => {
            updatedContent = updatedContent.replace(r.from, r.to);
        });
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Cleaned up typos in ${file}`);
        }
    }
});
