const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');

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

console.log('Build complete! Output in /dist');
