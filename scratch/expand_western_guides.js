const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';

const manualExpansions = {
    'usa-severance.html': `
            <SECTION>
                <h2>Federal Guidelines & The WARN Act</h2>
                <p>In the United States, while there is no general federal requirement for severance under the FLSA, the <strong>Worker Adjustment and Retraining Notification (WARN) Act</strong> provides protection during mass layoffs. Employers with 100+ employees must provide 60 days' notice or pay-in-lieu if they close a site or lay off a large percentage of staff.</p>

                <h3>Industry-Standard Formulas</h3>
                <p>Most US corporations follow a "1-to-2 week per year" formula for involuntary terminations. Executive packages are typically more robust.</p>
                <div class="formula-block">
                    Standard: 1 Week Salary x Years of Service<br>
                    Management: 1 Month Salary x Years of Service
                </div>

                <h3 style="margin-top: 30px;">State-Specific Nuances</h3>
                <p>Some states offer additional protections. For example, in <strong>California</strong>, employees must receive their final paycheck (including accrued vacation) immediately upon termination. In <strong>New Jersey</strong>, recent amendments require mandatory severance for mass layoffs in certain scenarios.</p>

                <h3>COBRA & Health Benefits</h3>
                <p>One of the most critical parts of a US severance package is the continuation of health insurance. Under COBRA, you can maintain your employer's plan for 18 months, though you usually pay the full premium. Many severance agreements include a "subsidy" where the employer pays the COBRA premiums for several months.</p>

                <h3>Taxation of Severance (IRS Rules)</h3>
                <p>Severance pay is considered supplemental wages by the IRS. It is subject to standard federal and state income taxes, as well as Social Security and Medicare taxes. It is often withheld at a flat rate of 22% for amounts up to $1 million.</p>

                <h3 style="margin-top: 30px;">Authentic FAQ</h3>
                <details>
                    <summary>Is severance mandatory in the US?</summary>
                    <div>No federal law mandates it, but it is often required if specified in your employment contract or employee handbook.</div>
                </details>
                <details>
                    <summary>Do I have to sign a release of claims?</summary>
                    <div>Yes, most employers require you to sign a waiver promising not to sue them in exchange for the severance pay.</div>
                </details>

                <div class="cta-box">
                    <h4>Calculate Your US Severance</h4>
                    <p>Estimate your settlement based on the 1-week-per-year industry standard and current federal guidelines.</p>
                    <a href="/?country=usa#calculator" class="btn-calc" style="text-decoration: none; display: inline-block; width: auto; padding: 14px 32px;">Open US Calculator</a>
                </div>
            </SECTION>
    `,
    'uk-redundancy.html': `
            <SECTION>
                <h2>Statutory Redundancy Pay (SRP)</h2>
                <p>In the UK, if you have been an employee for at least <strong>2 years</strong>, you are legally entitled to Statutory Redundancy Pay. The amount depends on your age and length of service.</p>

                <h3>The UK Age-Based Multiplier</h3>
                <div class="formula-block">
                    Under 22: 0.5 week's pay per year<br>
                    22 to 40: 1 week's pay per year<br>
                    41 and Over: 1.5 weeks' pay per year
                </div>

                <h3 style="margin-top: 30px;">Consultation & Notice Rights</h3>
                <p>Employers must follow a fair redundancy process, which includes a consultation period. If they are making 20+ people redundant, there are strict collective consultation timelines (30 to 45 days).</p>

                <h3>Tax-Free Thresholds</h3>
                <p>A major benefit in the UK is that the first <strong>£30,000</strong> of redundancy pay is usually tax-free. Any amount above this threshold is subject to standard Income Tax and National Insurance contributions.</p>

                <h3>Pay in Lieu of Notice (PILON)</h3>
                <p>If your employer wants you to leave immediately, they may pay you "in lieu of notice." This is separate from your redundancy pay and is fully taxable as regular earnings.</p>

                <h3 style="margin-top: 30px;">Authentic FAQ</h3>
                <details>
                    <summary>What is the maximum weekly pay cap?</summary>
                    <div>The government sets a limit on the amount of 'weekly pay' used for the calculation (currently £700 per week for 2024/25).</div>
                </details>
                <details>
                    <summary>Can I lose my redundancy pay?</summary>
                    <div>Yes, if your employer offers you "suitable alternative work" and you refuse it without a good reason, you may lose your entitlement.</div>
                </details>

                <div class="cta-box">
                    <h4>Calculate Your UK Redundancy</h4>
                    <p>Get a detailed breakdown of your Statutory Redundancy Pay based on the latest 2025 UK government caps.</p>
                    <a href="/?country=uk#calculator" class="btn-calc" style="text-decoration: none; display: inline-block; width: auto; padding: 14px 32px;">Open UK Calculator</a>
                </div>
            </SECTION>
    `
};

Object.keys(manualExpansions).forEach(file => {
    const filePath = path.join(blogDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const sectionRegex = /<SECTION>.*?<\/SECTION>/gs;
        let updatedContent = content.replace(sectionRegex, manualExpansions[file]);
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Manually expanded content for ${file}`);
    }
});
