const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';
const files = fs.readdirSync(blogDir);

const skip = ['india-gratuity.html', 'uae-gratuity.html', 'saudi-gratuity.html', 'index.html'];

const authorityBlock = `
                <h3 style="margin-top: 40px;">Employee Rights & Protections</h3>
                <p>Regardless of your location, most modern labor laws provide standard protections during the severance process. Ensure you are aware of your right to a written explanation, your right to receive your final settlement within a reasonable timeframe (usually 14-30 days), and your protection against unauthorized deductions.</p>

                <h3 style="margin-top: 30px;">Final Settlement Checklist</h3>
                <ul style="list-style: disc; margin: 15px 0 15px 20px; color: var(--muted); line-height: 1.8;">
                    <li><strong>Accrued Leave:</strong> Check if you are entitled to encashment of unused vacation days.</li>
                    <li><strong>Notice Pay:</strong> If you are terminated without notice, you may be entitled to pay-in-lieu.</li>
                    <li><strong>Tax Certificates:</strong> Ensure you receive all necessary tax documentation for your final year of service.</li>
                    <li><strong>Experience Letter:</strong> A mandatory requirement in many jurisdictions for your next career move.</li>
                </ul>

                <h3 style="margin-top: 30px;">How to Negotiate Your Severance</h3>
                <p>If you believe your severance calculation is incorrect or unfair, start by requesting a detailed breakdown from your HR department. Compare it against the official laws cited in this guide. If discrepancies persist, consider seeking legal advice or contacting your local labor department or ombudsman.</p>
`;

files.forEach(file => {
    if (file.endsWith('.html') && !skip.includes(file)) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Inject before the cta-box
        if (content.includes('class="cta-box"') && !content.includes('Final Settlement Checklist')) {
            content = content.replace('<div class="cta-box">', authorityBlock + '\n                <div class="cta-box">');
            fs.writeFileSync(filePath, content);
            console.log(`Added authority block to ${file}`);
        }
    }
});
