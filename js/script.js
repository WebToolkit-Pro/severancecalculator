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
    canada: { sym: 'CA$', name: 'CAD', flag: '🇨🇦' },
    qatar: { sym: 'QAR ', name: 'QAR', flag: '🇶🇦' },
    kuwait: { sym: 'KWD ', name: 'KWD', flag: '🇰🇼' },
    bahrain: { sym: 'BHD ', name: 'BHD', flag: '🇧🇭' },
    oman: { sym: 'OMR ', name: 'OMR', flag: '🇴🇲' },
    germany: { sym: '€', name: 'EUR', flag: '🇩🇪' },
    france: { sym: '€', name: 'EUR', flag: '🇫🇷' },
    spain: { sym: '€', name: 'EUR', flag: '🇪🇸' },
    italy: { sym: '€', name: 'EUR', flag: '🇮🇹' },
    netherlands: { sym: '€', name: 'EUR', flag: '🇳🇱' },
    ireland: { sym: '€', name: 'EUR', flag: '🇮🇪' },
    switzerland: { sym: 'CHF ', name: 'CHF', flag: '🇨🇭' },
    australia: { sym: 'A$', name: 'AUD', flag: '🇦🇺' },
    singapore: { sym: 'S$', name: 'SGD', flag: '🇸🇬' },
    malaysia: { sym: 'RM ', name: 'MYR', flag: '🇲🇾' },
    hongkong: { sym: 'HK$', name: 'HKD', flag: '🇭🇰' },
    japan: { sym: '¥', name: 'JPY', flag: '🇯🇵' },
    southkorea: { sym: '₩', name: 'KRW', flag: '🇰🇷' },
    newzealand: { sym: 'NZ$', name: 'NZD', flag: '🇳🇿' },
    brazil: { sym: 'R$', name: 'BRL', flag: '🇧🇷' },
    mexico: { sym: 'MX$', name: 'MXN', flag: '🇲🇽' },
    argentina: { sym: '$', name: 'ARS', flag: '🇦🇷' },
    southafrica: { sym: 'R ', name: 'ZAR', flag: '🇿🇦' }
};

document.addEventListener('DOMContentLoaded', () => {
    // Pre-select country from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');
    const countryEl = document.getElementById('country');
    
    if (countryParam && countryEl) {
        // Try to match the parameter to an option value
        const option = Array.from(countryEl.options).find(opt => opt.value.toLowerCase() === countryParam.toLowerCase());
        if (option) {
            countryEl.value = option.value;
        }
    }

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
        
        // Update Age Hint dynamically
        const ageHint = document.getElementById('age-hint');
        if (ageHint) {
            if (country === 'uk') {
                ageHint.textContent = 'Required for UK Statutory Redundancy';
            } else if (country === 'uae' || country === 'saudi' || country === 'qatar') {
                ageHint.textContent = 'Required for gratuity verification';
            } else {
                ageHint.textContent = 'Recommended for accurate legal estimation';
            }
        }
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
    const country = document.getElementById('country').value.toLowerCase();
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
        if (reason === 'resigned') { eligible = false; warn = 'In the USA, voluntary resignation typically does not entitle you to severance pay.'; }
        const ws = (salary * 12) / 52;
        amount = ws * wpy * years;
        breakdown = [{ l: 'Weekly Salary', v: fmt(ws, 'usa') }, { l: 'Formula', v: wpy + ' week(s) per year' }, { l: 'Service Years', v: years.toFixed(1) + ' yrs' }];
        law = '<strong>US Standard Practice:</strong> No federal law mandates severance. Formula uses industry standard (1 week/year).';
        sub = 'US industry standard estimate';
    } 
    else if (country === 'uk') {
        if (reason === 'resigned' || reason === 'fired') { eligible = false; warn = 'UK Statutory Redundancy Pay only applies to genuine redundancy.'; }
        if (years < 2) { eligible = false; warn = 'UK Statutory Redundancy Pay requires a minimum of 2 years service.'; }
        const cap = 643;
        const ws = Math.min((salary * 12) / 52, cap);
        let tw = 0;
        for (let y = 1; y <= Math.floor(years); y++) {
            const ca = age - Math.floor(years) + y;
            if (ca < 22) tw += 0.5; else if (ca <= 40) tw += 1; else tw += 1.5;
        }
        amount = ws * tw;
        breakdown = [{ l: 'Weekly Pay (Capped)', v: fmt(ws, 'uk') }, { l: 'Redundancy Weeks', v: tw.toFixed(1) + ' wks' }];
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
        breakdown = [{ l: 'Daily Basic Salary', v: fmt(salary/30, 'uae') }, { l: 'Resignation Multiplier', v: Math.round(m*100) + '%' }];
        law = '<strong>UAE Decree-Law No. 33:</strong> 21 days basic salary for first 5 years, 30 days after.';
        sub = 'UAE End-of-Service Gratuity';
    }
    else if (country === 'india') {
        if (years < 5) { eligible = false; warn = 'Minimum 5 years service required for Indian gratuity.'; }
        amount = Math.min((15 / 26) * salary * years, 2000000);
        breakdown = [{ l: 'Formula', v: '(15/26) x salary x yrs' }, { l: 'Max Cap', v: '₹20,00,000' }];
        law = '<strong>Payment of Gratuity Act 1972:</strong> (15 x Monthly Salary x Years) / 26.';
        sub = 'India Gratuity Act Estimate';
    }
    else if (country === 'qatar') {
        amount = (salary / 30) * 21 * years;
        breakdown = [{ l: 'Daily Salary', v: fmt(salary/30, 'qatar') }, { l: 'Entitlement', v: '21 days per year' }];
        law = '<strong>Qatar Labour Law:</strong> 3 weeks basic salary for every year of service.';
        sub = 'Qatar End-of-Service Gratuity';
    }
    else if (country === 'kuwait') {
        amount = (salary / 30) * 15 * Math.min(years, 5) + (salary / 30) * 30 * Math.max(0, years - 5);
        law = '<strong>Kuwait Labour Law:</strong> 15 days for first 5 years, 30 days thereafter.';
        sub = 'Kuwait Gratuity Estimate';
    }
    else if (country === 'germany') {
        amount = salary * 0.5 * years;
        breakdown = [{ l: 'Formula', v: '0.5 month per year' }];
        law = '<strong>German KSchG:</strong> Standard redundancy estimate (Abfindung) of 0.5 months per year.';
        sub = 'Germany Redundancy Estimate';
    }
    else if (country === 'france') {
        amount = years <= 10 ? (salary / 4) * years : (salary / 4) * 10 + (salary / 3) * (years - 10);
        law = '<strong>French Labor Code:</strong> 1/4 month per year for first 10 yrs, 1/3 after.';
        sub = 'France Statutory Indemnity';
    }
    else if (country === 'spain') {
        amount = salary * (20 / 30) * years;
        law = '<strong>Spanish Labor Law:</strong> 20 days per year for objective dismissal.';
        sub = 'Spain Redundancy Pay';
    }
    else if (country === 'italy') {
        amount = (salary / 13.5) * years;
        law = '<strong>Italy TFR:</strong> Trattamento di Fine Rapporto (deferred salary) ~1 month/year.';
        sub = 'Italy TFR Estimate';
    }
    else if (country === 'australia') {
        let wks = 0;
        if (years >= 10) wks = 12; else if (years >= 9) wks = 16; else if (years >= 8) wks = 14; 
        else if (years >= 7) wks = 13; else if (years >= 6) wks = 11; else if (years >= 5) wks = 10;
        else if (years >= 4) wks = 9; else if (years >= 3) wks = 7; else if (years >= 2) wks = 6;
        else if (years >= 1) wks = 4;
        amount = (salary / 4.33) * wks;
        law = '<strong>Australia NES:</strong> National Employment Standards redundancy schedule (4-16 weeks).';
        sub = 'Australia NES Redundancy';
    }
    else if (country === 'singapore') {
        amount = (salary / 2) * years; // 2 weeks per year estimate
        law = '<strong>Singapore MOM:</strong> Industry norm is 2 weeks to 1 month per year of service.';
        sub = 'Singapore Redundancy Estimate';
    }
    else if (country === 'mexico') {
        amount = salary * 3 + (salary / 30) * 20 * years;
        law = '<strong>Mexican Federal Labor Law:</strong> 3 months salary plus 20 days per year.';
        sub = 'Mexico Statutory Severance';
    }
    else if (country === 'brazil') {
        amount = salary * 1 * years; // FGTS simplified
        law = '<strong>Brazil CLT:</strong> Estimated based on standard FGTS contributions and notice pay.';
        sub = 'Brazil Severance Estimate';
    }
    else if (country === 'canada') {
        const clM = Math.min(years, 24);
        amount = salary * Math.max(1, clM);
        law = '<strong>Canada Common Law:</strong> Standard estimate of ~1 month per year of service.';
        sub = 'Canada Common Law Estimate';
    }
    else if (country === 'pakistan') {
        amount = salary * years;
        law = '<strong>Pakistan Labor Laws:</strong> 30 days wages for every completed year of service.';
        sub = 'Pakistan Gratuity Estimate';
    }
    else if (country === 'philippines') {
        const rM = reason === 'layoff' ? 0.5 : 1;
        amount = salary * rM * years;
        law = '<strong>PH Labor Code:</strong> 1/2 month per year for redundancy, 1 month for closure.';
        sub = 'Philippines Separation Pay';
    }
    else if (country === 'saudi') {
        let g = years <= 5 ? (salary / 2) * years : (salary / 2) * 5 + salary * (years - 5);
        law = '<strong>Saudi Labor Law Art 84:</strong> 1/2 month for first 5 yrs, 1 month after.';
        sub = 'Saudi End-of-Service Award';
        amount = g;
    }
    else if (country === 'japan') {
        amount = salary * 1; // 30 days notice pay
        law = '<strong>Japan Labor Standards:</strong> 30 days of average wage as notice pay.';
        sub = 'Japan Notice Pay Estimate';
    }
    else if (country === 'southkorea') {
        amount = salary * years;
        law = '<strong>South Korea LSA:</strong> Minimum of 30 days of average wage for each year.';
        sub = 'South Korea Severance Pay';
    }
    else if (country === 'ireland') {
        amount = (salary / 4.33) * 2 * years + (salary / 4.33); // 2 weeks per year + 1 week
        law = '<strong>Ireland Redundancy Act:</strong> 2 weeks pay per year plus one bonus week.';
        sub = 'Ireland Statutory Redundancy';
    }
    else if (country === 'netherlands') {
        amount = (salary / 3) * years;
        law = '<strong>Netherlands Transition Payment:</strong> 1/3 of monthly salary per year of service.';
        sub = 'Netherlands Severance Estimate';
    }
    else if (country === 'switzerland') {
        amount = salary * years; // Industry norm
        law = '<strong>Swiss Code of Obligations:</strong> Industry norm estimate (statutory only after 20yrs/age 50).';
        sub = 'Switzerland Severance Estimate';
    }
    else if (country === 'newzealand') {
        amount = (salary / 4.33) * 4 * years; // 4 weeks per year norm
        law = '<strong>NZ Employment Law:</strong> No statutory minimum; industry standard is ~4 weeks/year.';
        sub = 'New Zealand Industry Standard';
    }
    else if (country === 'southafrica') {
        amount = (salary / 4.33) * 1 * years;
        law = '<strong>South Africa BCEA:</strong> 1 week of severance pay for each completed year.';
        sub = 'South Africa Statutory Severance';
    }
    else if (country === 'hongkong') {
        amount = Math.min((salary * 2 / 3) * years, 150000);
        law = '<strong>HK Employment Ordinance:</strong> 2/3 of last month salary per year, capped at HK$150k.';
        sub = 'Hong Kong Severance/Long Service';
    }
    else if (country === 'malaysia') {
        let days = years < 2 ? 10 : (years < 5 ? 15 : 20);
        amount = (salary / 26) * days * years;
        law = '<strong>Malaysia Employment Act:</strong> 10, 15, or 20 days per year depending on tenure.';
        sub = 'Malaysia Termination Benefits';
    }
    else if (country === 'bahrain') {
        amount = (salary / 30) * 15 * Math.min(years, 3) + (salary / 30) * 30 * Math.max(0, years - 3);
        law = '<strong>Bahrain Labour Law:</strong> 15 days for first 3 years, 30 days thereafter.';
        sub = 'Bahrain End-of-Service Gratuity';
    }
    else if (country === 'oman') {
        amount = (salary / 30) * 15 * Math.min(years, 3) + (salary / 30) * 30 * Math.max(0, years - 3);
        law = '<strong>Oman Labour Law:</strong> 15 days for first 3 years, 30 days thereafter.';
        sub = 'Oman End-of-Service Gratuity';
    }
    else if (country === 'argentina') {
        amount = salary * years;
        law = '<strong>Argentina Labor Law:</strong> 1 month of salary per year of service.';
        sub = 'Argentina Severance Estimate';
    } else {
        // Fallback for any missed countries
        amount = salary * years;
        law = '<strong>Standard Statutory Estimate:</strong> Based on general labor law principles of one month per year.';
        sub = 'General Statutory Estimate';
    }

    // --- DISPLAY RESULTS ---
    const resDiv = document.getElementById('RESULTS');
    resDiv.classList.add('show');
    
    document.getElementById('res-amount').textContent = eligible ? fmt(amount, country) : 'Not Eligible';
    document.getElementById('res-sub').textContent = sub;
    
    // Explicitly update law text and Why This Amount
    const countryName = CountryConfig[country] ? CountryConfig[country].flag + ' ' + country.toUpperCase() : 'Selected Country';
    document.getElementById('lawtext').innerHTML = `
        <div style="margin-bottom: 10px;">${law}</div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
            <strong style="color: var(--primary);">Why this amount?</strong> Based on ${years.toFixed(1)} years of service in ${countryName}, 
            you are entitled to the legal benefits shown above. 
            ${eligible ? 'This estimate assumes a "without-cause" termination.' : 'Note the warnings above regarding eligibility.'}
        </div>
    `;
    
    const warnEl = document.getElementById('warn-text');
    if (warn) { 
        warnEl.innerHTML = '⚠️ ' + warn; 
        warnEl.style.display = 'block'; 
        warnEl.style.background = 'rgba(251, 191, 36, 0.1)';
        warnEl.style.color = '#fbbf24';
        warnEl.style.border = '1px solid rgba(251, 191, 36, 0.2)';
    } else { 
        warnEl.style.display = 'none'; 
    }

    // Populate Breakdown Grid (Clear if empty)
    const gridEl = document.getElementById('bkgrid');
    if (breakdown.length > 0) {
        gridEl.style.display = 'grid';
        gridEl.innerHTML = breakdown.map(b => `
            <div class="bki">
                <div class="bkl">${b.l}</div>
                <div class="bkv">${b.v}</div>
            </div>
        `).join('');
    } else {
        gridEl.style.display = 'none';
        gridEl.innerHTML = '';
    }

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
