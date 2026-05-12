const fs = require('fs');
const path = require('path');

const blogDir = 'c:/xampp/htdocs/webtoolkit-pro/severance-calculator-repo/blog';

const countryContent = {
    'india-gratuity.html': `
            <SECTION>
                <h2>Detailed Eligibility & The 5-Year Rule</h2>
                <p>Under the Payment of Gratuity Act 1972, an employee is eligible for gratuity if they have rendered "continuous service" for at least <strong>5 years</strong>. However, there are critical nuances to this rule:</p>
                <ul style="list-style: disc; margin: 15px 0 15px 20px; color: var(--muted); line-height: 1.8;">
                    <li><strong>Continuous Service:</strong> This includes days of leave, sickness, or temporary disablement.</li>
                    <li><strong>The 240-Day Rule:</strong> If an employee completes 4 years and 240 days (or 190 days in certain sectors), they are often considered to have completed the 5th year for gratuity purposes.</li>
                    <li><strong>Death or Disablement:</strong> The 5-year requirement is waived in cases of death or disablement due to accident or disease.</li>
                </ul>

                <h3>The 15/26 Calculation Formula</h3>
                <p>The standard formula used to calculate gratuity for employees covered under the Act is:</p>
                <div class="formula-block">Gratuity = (Basic Salary + Dearness Allowance) x (15/26) x Tenure</div>
                
                <h3 style="margin-top: 30px;">Step-by-Step Calculation Example</h3>
                <p>Let's assume an employee, Ramesh, worked for 12 years and his last drawn basic salary (including DA) was ₹60,000.</p>
                <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid var(--border); margin: 20px 0;">
                    <ol style="margin-left: 20px; color: var(--muted); line-height: 1.8;">
                        <li><strong>Identify Components:</strong> Basic + DA = ₹60,000.</li>
                        <li><strong>Calculate 15 days salary:</strong> (60,000 / 26) * 15 = ₹34,615.</li>
                        <li><strong>Multiply by Tenure:</strong> 34,615 * 12 years = <strong>₹4,15,380</strong>.</li>
                    </ol>
                </div>

                <h3>Taxation & Exemptions (Section 10(10))</h3>
                <p>Gratuity is a retirement benefit and enjoys significant tax exemptions under the Income Tax Act:</p>
                <ul style="list-style: disc; margin: 15px 0 15px 20px; color: var(--muted); line-height: 1.8;">
                    <li><strong>Government Employees:</strong> Entire gratuity amount received is tax-exempt.</li>
                    <li><strong>Private Sector:</strong> Tax exemption is the least of: Actual gratuity received, ₹20,00,000 (Statutory limit), or 15 days' salary for every completed year of service.</li>
                </ul>

                <h3>Nomination & Payment Timeline</h3>
                <p>Every employee who has completed one year of service must make a nomination (Form F) to ensure the gratuity is paid to their legal heirs in case of death. Employers are legally bound to pay the gratuity within 30 days from the date it becomes payable.</p>

                <h3 style="margin-top: 30px;">Authentic FAQ</h3>
                <details>
                    <summary>What is the 4 year and 240 days rule?</summary>
                    <div>Courts in India have often ruled that if an employee completes 4 years and 240 days, they are entitled to gratuity as it counts as a full 5th year.</div>
                </details>
                <details>
                    <summary>Is gratuity taxable in India?</summary>
                    <div>For private-sector employees, it is tax-free up to ₹20 Lakhs as per the latest amendment.</div>
                </details>

                <div class="cta-box">
                    <h4>Calculate Your Indian Gratuity</h4>
                    <p>Use our 2025 tool to get an estimate based on your years of service and basic salary.</p>
                    <a href="/?country=india#calculator" class="btn-calc" style="text-decoration: none; display: inline-block; width: auto; padding: 12px 24px;">Open India Calculator</a>
                </div>
            </SECTION>
    `,
    'uae-gratuity.html': `
            <SECTION>
                <h2>The 2025 UAE Labour Framework</h2>
                <p>Since the implementation of Federal Decree-Law No. 33 of 2021, the UAE has standardized end-of-service benefits across the private sector. A major addition for 2024/2025 is the mandatory <strong>ILOE (Involuntary Loss of Employment)</strong> insurance.</p>

                <h3>Official Gratuity Calculation (Article 51)</h3>
                <p>Gratuity is calculated on your <strong>last drawn basic salary</strong>. Allowances like housing and transport are excluded.</p>
                <div class="formula-block">
                    1-5 Years: 21 Days per Year<br>
                    5+ Years: 30 Days per Year
                </div>

                <h3 style="margin-top: 30px;">Mandatory ILOE Insurance</h3>
                <p>All employees in the UAE (including Free Zones) must subscribe to the ILOE scheme. Failure to do so results in fines that can block your work permit renewal.</p>
                <ul style="list-style: disc; margin: 15px 0 15px 20px; color: var(--muted); line-height: 1.8;">
                    <li><strong>Category A:</strong> Basic salary ≤ AED 16,000 (Cost: AED 5/month).</li>
                    <li><strong>Category B:</strong> Basic salary > AED 16,000 (Cost: AED 10/month).</li>
                </ul>

                <h3>Resignation vs Termination Nuances</h3>
                <p>Under the new law, there is no longer a reduction in gratuity for resignation. If you complete at least one year of service, you are entitled to the full calculated amount regardless of whether you resign or are terminated.</p>

                <h3 style="margin-top: 30px;">Authentic FAQ</h3>
                <details>
                    <summary>Is gratuity calculated on total salary?</summary>
                    <div>No, only on the 'Basic Salary' specified in your MOHRE contract.</div>
                </details>
                <details>
                    <summary>Can an employer deduct from gratuity?</summary>
                    <div>Employers can only deduct amounts legally owed (e.g., unpaid loans or notice period compensation) as per Article 51.</div>
                </details>

                <div class="cta-box">
                    <h4>Calculate Your UAE Gratuity</h4>
                    <p>Use our 2025 MOHRE-compliant tool to get an accurate estimate of your end-of-service settlement.</p>
                    <a href="/?country=uae#calculator" class="btn-calc" style="text-decoration: none; display: inline-block; width: auto; padding: 12px 24px;">Open UAE Calculator</a>
                </div>
            </SECTION>
    `,
    'saudi-gratuity.html': `
            <SECTION>
                <h2>Article 84 of the Saudi Labor Law</h2>
                <p>In Saudi Arabia, the End-of-service Award is a statutory right for all workers, whether Saudi nationals or expats. It is calculated based on your <strong>total salary</strong> (Basic + major allowances).</p>

                <h3>The Award Multipliers</h3>
                <div class="formula-block">
                    First 5 Years: 1/2 Month Salary per Year<br>
                    After 5 Years: 1 Full Month Salary per Year
                </div>

                <h3 style="margin-top: 30px;">Impact of Resignation (Article 85)</h3>
                <p>The award amount significantly changes if an employee resigns before completing 10 years:</p>
                <ul style="list-style: disc; margin: 15px 0 15px 20px; color: var(--muted); line-height: 1.8;">
                    <li><strong>2 to 5 Years Tenure:</strong> 1/3 of the award.</li>
                    <li><strong>5 to 10 Years Tenure:</strong> 2/3 of the award.</li>
                    <li><strong>10+ Years Tenure:</strong> Full award.</li>
                </ul>

                <h3>The "Last Drawn Salary" Rule</h3>
                <p>The award is calculated using the salary rate at the time of contract termination. If you received a promotion or raise recently, your entire tenure is calculated using the new higher rate.</p>

                <h3 style="margin-top: 30px;">Authentic FAQ</h3>
                <details>
                    <summary>Do expats get the same award as Saudis?</summary>
                    <div>Yes, the Labor Law applies equally to all private-sector employees regardless of nationality.</div>
                </details>
                <details>
                    <summary>What if I am fired for cause?</summary>
                    <div>Under Article 80, if you are terminated for specific reasons (e.g., assault or theft), you may forfeit your right to the award.</div>
                </details>

                <div class="cta-box">
                    <h4>Calculate Your Saudi Award</h4>
                    <p>Get a precise breakdown of your KSA settlement based on the latest 2025 Labor Law updates.</p>
                    <a href="/?country=saudi#calculator" class="btn-calc" style="text-decoration: none; display: inline-block; width: auto; padding: 12px 24px;">Open Saudi Calculator</a>
                </div>
            </SECTION>
    `
};

Object.keys(countryContent).forEach(file => {
    const filePath = path.join(blogDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const sectionRegex = /<SECTION>.*?<\/SECTION>/gs;
        let updatedContent = content.replace(sectionRegex, countryContent[file]);
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Expanded content for ${file}`);
    }
});
