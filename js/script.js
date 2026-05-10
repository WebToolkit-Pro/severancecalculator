/**
 * Severance Pay Calculator - Core Logic & UI Interactions
 */

const CountryData = {
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
});

function updateCurrency() {
    const country = document.getElementById('country').value;
    const sym = CountryData[country].sym;
    document.querySelectorAll('.curr-sym').forEach(el => el.textContent = sym);
}

function fmt(n, country) {
    const s = CountryData[country].sym;
    return s + Math.round(n).toLocaleString();
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

    // --- Logic from original index.html ---
    if (country === 'usa') {
        const wpy = reason === 'resigned' ? 0 : 1;
        if (reason === 'resigned') {
            eligible = false;
            warn = 'In the USA, voluntary resignation typically does not entitle you to severance pay.';
        }
        const ws = (salary * 12) / 52;
        amount = ws * wpy * years;
        sub = 'US industry standard estimate (1 week/year)';
    } 
    else if (country === 'uk') {
        if (reason === 'resigned' || reason === 'fired') {
            eligible = false;
            warn = 'UK Statutory Redundancy Pay only applies to genuine redundancy.';
        }
        if (years < 2) {
            eligible = false;
            warn = 'UK Statutory Redundancy Pay requires a minimum of 2 years of service.';
        }
        const cap = 643;
        const ws = Math.min((salary * 12) / 52, cap);
        let tw = 0;
        for (let y = 1; y <= Math.floor(years); y++) {
            const ca = age - Math.floor(years) + y;
            if (ca < 22) tw += 0.5; else if (ca <= 40) tw += 1; else tw += 1.5;
        }
        amount = ws * tw;
        sub = 'UK Statutory Redundancy Pay';
    }
    else if (country === 'uae') {
        if (reason === 'resigned' && years < 1) {
            eligible = false;
            warn = 'No UAE gratuity is owed if you resign before completing 1 full year.';
        }
        let g = years <= 5 ? (salary / 30) * 21 * years : (salary / 30) * 21 * 5 + (salary / 30) * 30 * (years - 5);
        let m = 1;
        if (reason === 'resigned') {
            if (years < 3) m = 1 / 3; else if (years < 5) m = 2 / 3; else m = 1;
        }
        amount = g * m;
        sub = 'UAE End-of-Service Gratuity';
    }
    else if (country === 'india') {
        if (years < 5) {
            eligible = false;
            warn = 'Minimum 5 years of continuous service required in India.';
        }
        amount = Math.min((15 / 26) * salary * years, 2000000);
        sub = 'India Gratuity (Act 1972)';
    }
    else if (country === 'pakistan') {
        if (years < 1) {
            eligible = false;
            warn = 'Minimum 1 year of continuous service required for Pakistan gratuity.';
        }
        amount = salary * Math.floor(years);
        sub = 'Pakistan Gratuity (Ordinance 1968)';
    }
    else if (country === 'philippines') {
        let dpY = 0;
        if (reason === 'resigned') {
            eligible = false;
            warn = 'Voluntary resignation does not entitle you to separation pay in the Philippines.';
        } else if (reason === 'layoff' || reason === 'mutual' || reason === 'retirement') {
            dpY = 15;
        } else {
            dpY = 30;
        }
        const ds = salary / 26;
        amount = eligible ? Math.max(ds * dpY * years, salary) : 0;
        sub = 'Philippine Separation Pay';
    }
    else if (country === 'saudi') {
        let a1 = 0, a2 = 0;
        if (years <= 5) a1 = (salary / 2) * years; else { a1 = (salary / 2) * 5; a2 = salary * (years - 5); }
        let m = 1;
        if (reason === 'resigned') {
            if (years < 2) { m = 0; eligible = false; warn = 'No end-of-service award for resignation before 2 years in Saudi.'; }
            else if (years < 5) m = 1 / 3; else if (years < 10) m = 2 / 3; else m = 1;
        }
        amount = (a1 + a2) * m;
        sub = 'Saudi Arabia End-of-Service Award';
    }
    else if (country === 'canada') {
        if (reason === 'resigned' || reason === 'fired') {
            eligible = false;
            warn = 'Resignation and termination for cause do not qualify for severance in Canada.';
        }
        const clM = Math.min(years, 24);
        amount = salary * clM;
        sub = 'Common Law severance estimate';
    }

    // Display Results
    const resultsArea = document.querySelector('.results-area');
    resultsArea.classList.add('active');
    
    document.getElementById('res-amount').textContent = eligible ? fmt(amount, country) : 'Not Eligible';
    document.getElementById('res-sub').textContent = sub;
    
    if (warn) {
        document.getElementById('warn-text').textContent = warn;
        document.getElementById('warn-text').style.display = 'block';
    } else {
        document.getElementById('warn-text').style.display = 'none';
    }

    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Ad Detection Reveal Logic
 * Reveals hidden sections once an ad (ins element) is populated.
 */
function initAdDetection() {
    const adContainers = document.querySelectorAll('.adsbygoogle');
    
    // Fallback: Reveal after 3 seconds if ad doesn't load
    const fallbackTimeout = setTimeout(revealSections, 3000);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                const status = mutation.target.getAttribute('data-ad-status');
                if (status === 'filled') {
                    clearTimeout(fallbackTimeout);
                    revealSections();
                    observer.disconnect();
                }
            }
        });
    });

    adContainers.forEach(container => {
        observer.observe(container, { attributes: true });
    });
}

function revealSections() {
    document.querySelectorAll('.hidden-until-ad').forEach(el => {
        el.classList.add('reveal');
    });
}
