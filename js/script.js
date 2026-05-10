/**
 * Severance Pay Calculator - Core Engine v2.0
 * Includes: Detailed Breakdowns, Ad-Reveal Logic, Nav Link Toggling
 */

const CountryConfig = {
    usa: { sym: '$', name: 'USD', flag: '🇺🇸' },
    uk: { sym: '£', name: 'GBP', flag: '🇬🇧' },
    uae: { sym: 'AED ', name: 'AED', flag: '🇦🇪' },
    india: { sym: '₹', name: 'INR', flag: '🇮🇳' },
    pakistan: { sym: 'Rs.', name: 'PKR', flag: '🇵🇰' },
    philippines: { sym: '₱', name: 'PHP', flag: '🇵🇭' },
    saudi: { sym: 'SAR ', name: 'SAR', flag: '🇸🇦' },
    canada: { sym: 'CA$', name: 'CAD', flag: '🇨🇦' }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCurrency();
    initAdDetection();
    toggleNavLinks();
});

function updateCurrency() {
    const countryEl = document.getElementById('country');
    if (!countryEl) return;
    const country = countryEl.value.toLowerCase();
    const config = CountryConfig[country];
    if (config) {
        document.querySelectorAll('.curr-sym').forEach(el => el.textContent = config.sym);
    }
}

function toggleMenu() {
    const links = document.getElementById('topnav-links');
    links.classList.toggle('active');
}

function fmt(n, country) {
    const s = CountryConfig[country].sym;
    return s + Math.round(n).toLocaleString();
}

function toggleNavLinks() {
    const isCalcPage = document.getElementById('severance-pay-calculator-2025') !== null;
    const calcLink = document.getElementById('nav-calc-link');
    if (calcLink && isCalcPage) {
        // calcLink.style.display = 'none'; // Re-enable if you want it hidden on home
    }
}

function calculate() {
    const country = document.getElementById('country').value;
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    const age = parseInt(document.getElementById('age').value) || 35;
    const reason = document.getElementById('reason').value;

    if (!salary || !years) {
        alert('Please enter your monthly salary and years of service.');
        return;
    }

    let amount = 0, breakdown = [], law = '', warn = '', sub = '', eligible = true;

    // --- Country Specific Logic with Detailed Breakdowns ---
    if (country === 'usa') {
        const wpy = reason === 'resigned' ? 0 : 1;
        if (reason === 'resigned') {
            eligible = false;
            warn = 'In the USA, voluntary resignation typically does not entitle you to severance pay.';
        }
        const ws = (salary * 12) / 52;
        amount = ws * wpy * years;
        breakdown = [
            { l: 'Weekly Salary', v: fmt(ws, 'usa') },
            { l: 'Formula', v: wpy + ' week(s) per year' },
            { l: 'Service Years', v: years.toFixed(1) + ' yrs' }
        ];
        law = '<strong>US Standard Practice:</strong> No federal law mandates severance. Formula uses industry standard (1 week/year).';
        sub = 'US industry standard estimate';
    } 
    else if (country === 'uk') {
        if (reason === 'resigned' || reason === 'fired') {
            eligible = false;
            warn = 'UK Statutory Redundancy Pay only applies to genuine redundancy.';
        }
        if (years < 2) {
            eligible = false;
            warn = 'UK Statutory Redundancy Pay requires a minimum of 2 years service.';
        }
        const cap = 643;
        const ws = Math.min((salary * 12) / 52, cap);
        let tw = 0;
        for (let y = 1; y <= Math.floor(years); y++) {
            const ca = age - Math.floor(years) + y;
            if (ca < 22) tw += 0.5; else if (ca <= 40) tw += 1; else tw += 1.5;
        }
        amount = ws * tw;
        breakdown = [
            { l: 'Weekly Pay (Capped)', v: fmt(ws, 'uk') },
            { l: 'Redundancy Weeks', v: tw.toFixed(1) + ' wks' },
            { l: 'Service Years', v: years.toFixed(1) + ' yrs' }
        ];
        law = '<strong>UK Employment Rights Act 1996:</strong> Calculated based on age multipliers (0.5x, 1x, 1.5x) and tenure.';
        sub = 'UK Statutory Redundancy Pay';
    }
    else if (country === 'uae') {
        let g = years <= 5 ? (salary / 30) * 21 * years : (salary / 30) * 21 * 5 + (salary / 30) * 30 * (years - 5);
        let m = 1;
        if (reason === 'resigned') {
            if (years < 1) { eligible = false; warn = 'No gratuity for resignation under 1 year.'; }
            else if (years < 3) m = 1 / 3; else if (years < 5) m = 2 / 3; else m = 1;
        }
        amount = g * m;
        breakdown = [
            { l: 'Daily Basic Salary', v: fmt(salary/30, 'uae') },
            { l: 'Resignation Multiplier', v: Math.round(m*100) + '%' },
            { l: 'Service Years', v: years.toFixed(1) + ' yrs' }
        ];
        law = '<strong>UAE Federal Decree-Law No. 33 of 2021:</strong> Gratuity calculated on basic salary (21 days for first 5 yrs, 30 days after).';
        sub = 'UAE End-of-Service Gratuity';
    }
    else if (country === 'india') {
        if (years < 5) { eligible = false; warn = 'Minimum 5 years service required for Indian gratuity.'; }
        amount = Math.min((15 / 26) * salary * years, 2000000);
        breakdown = [
            { l: 'Monthly Salary', v: fmt(salary, 'india') },
            { l: 'Formula', v: '(15/26) x salary x yrs' },
            { l: 'Service Years', v: years.toFixed(1) + ' yrs' }
        ];
        law = '<strong>Payment of Gratuity Act 1972:</strong> Formula = (15 x Monthly Salary x Years) / 26. Capped at ₹20 lakhs.';
        sub = 'India Gratuity Act Estimate';
    }
    else if (country === 'pakistan') {
        if (years < 1) { eligible = false; warn = 'Minimum 1 year service required for Pakistan gratuity.'; }
        amount = salary * Math.floor(years);
        breakdown = [
            { l: 'Monthly Wages', v: fmt(salary, 'pakistan') },
            { l: 'Completed Years', v: Math.floor(years) + ' yrs' }
        ];
        law = '<strong>West Pakistan Employment Ordinance 1968:</strong> 30 days wages per completed year of service.';
        sub = 'Pakistan Gratuity Estimate';
    }
    else if (country === 'philippines') {
        let dpY = 0;
        if (reason === 'resigned') { eligible = false; warn = 'Resignation typically does not entitle you to separation pay in the Philippines.'; }
        else if (reason === 'layoff' || reason === 'mutual' || reason === 'retirement') { dpY = 15; }
        else { dpY = 30; }
        const ds = salary / 26;
        amount = eligible ? Math.max(ds * dpY * years, salary) : 0;
        breakdown = [
            { l: 'Daily Rate', v: fmt(ds, 'philippines') },
            { l: 'Entitlement Days/Yr', v: dpY + ' days' }
        ];
        law = '<strong>Philippine Labor Code:</strong> 1/2 month per year for redundancy, 1 month per year for closure.';
        sub = 'Philippine Separation Pay';
    }
    else if (country === 'saudi') {
        let a1 = 0, a2 = 0;
        if (years <= 5) a1 = (salary / 2) * years; else { a1 = (salary / 2) * 5; a2 = salary * (years - 5); }
        let m = 1;
        if (reason === 'resigned') {
            if (years < 2) { m = 0; eligible = false; warn = 'No award for resignation under 2 years in Saudi.'; }
            else if (years < 5) m = 1 / 3; else if (years < 10) m = 2 / 3; else m = 1;
        }
        amount = (a1 + a2) * m;
        breakdown = [
            { l: 'Full Entitlement', v: fmt(a1+a2, 'saudi') },
            { l: 'Resignation Multiplier', v: Math.round(m*100) + '%' }
        ];
        law = '<strong>Saudi Labour Law Art. 84:</strong> 1/2 month/year for first 5 years, 1 month/year after.';
        sub = 'Saudi End-of-Service Award';
    }
    else if (country === 'canada') {
        if (reason === 'resigned' || reason === 'fired') { eligible = false; warn = 'Without-cause termination required for Canadian severance.'; }
        const clM = Math.min(years, 24);
        amount = salary * clM;
        breakdown = [
            { l: 'Common Law Est.', v: clM.toFixed(0) + ' months' },
            { l: 'Monthly Rate', v: fmt(salary, 'canada') }
        ];
        law = '<strong>Canada Common Law:</strong> Standard estimate of approximately 1 month per year of service.';
        sub = 'Canada Common Law Estimate';
    }

    // --- DISPLAY RESULTS ---
    const resDiv = document.getElementById('RESULTS');
    resDiv.classList.add('show');
    
    document.getElementById('res-amount').textContent = eligible ? fmt(amount, country) : 'Not Eligible';
    document.getElementById('res-sub').textContent = sub;
    document.getElementById('lawtext').innerHTML = `
        <p>${law}</p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
            <strong>Why this amount?</strong> Based on your ${years.toFixed(1)} years of service and local labor regulations, 
            you are entitled to the breakdown shown above. 
            ${eligible ? 'This estimate assumes a "without-cause" termination.' : 'Note the warnings above regarding eligibility.'}
        </div>
    `;
    
    const warnEl = document.getElementById('warn-text');
    if (warn) { warnEl.innerHTML = '⚠️ ' + warn; warnEl.style.display = 'block'; } else { warnEl.style.display = 'none'; }

    // Populate Breakdown Grid
    document.getElementById('bkgrid').innerHTML = breakdown.map(b => `
        <div class="bki">
            <div class="bkl">${b.l}</div>
            <div class="bkv">${b.v}</div>
        </div>
    `).join('');

    resDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initAdDetection() {
    const ads = document.querySelectorAll('.adsbygoogle');
    const fallback = setTimeout(revealAds, 3000);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            if (m.attributeName === 'data-ad-status' && m.target.getAttribute('data-ad-status') === 'filled') {
                clearTimeout(fallback);
                revealAds();
            }
        });
    });

    ads.forEach(a => observer.observe(a, { attributes: true }));
}

function revealAds() {
    document.querySelectorAll('.ad-slot').forEach(el => el.classList.add('reveal'));
}
