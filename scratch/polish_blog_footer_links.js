const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update footer links with titles
        content = content.replace(/<li><a href="\/legal\/privacy-policy.html">Privacy Policy<\/a><\/li>/g, '<li><a href="/legal/privacy-policy.html" title="Privacy Policy">Privacy Policy</a></li>');
        content = content.replace(/<li><a href="\/legal\/terms-and-conditions.html">Terms & Conditions<\/a><\/li>/g, '<li><a href="/legal/terms-and-conditions.html" title="Terms & Conditions">Terms & Conditions</a></li>');
        content = content.replace(/<li><a href="\/legal\/disclaimer.html">Disclaimer<\/a><\/li>/g, '<li><a href="/legal/disclaimer.html" title="Legal Disclaimer">Disclaimer</a></li>');
        content = content.replace(/<li><a href="\/about.html">About Us<\/a><\/li>/g, '<li><a href="/about.html" title="Learn more About Us">About Us</a></li>');
        content = content.replace(/<li><a href="\/contact.html">Contact Us<\/a><\/li>/g, '<li><a href="/contact.html" title="Contact our Support Team">Contact Us</a></li>');
        content = content.replace(/<li><a href="\/blog\/index.html">Labor Guides<\/a><\/li>/g, '<li><a href="/blog/index.html" title="Browse all Labor Law Guides">Labor Guides</a></li>');
        
        fs.writeFileSync(filePath, content);
    }
});
