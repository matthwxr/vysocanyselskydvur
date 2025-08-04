
// Admin functionality - show print button if ?admin=true in URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';
    
    if (isAdmin) {
        const printButton = document.getElementById('print-daily-menu');
        if (printButton) {
            printButton.style.display = 'block';
        }
        
        // Přidáme tlačítko pro obnovení menu
        const menuContainer = document.querySelector('.daily-menu h3');
        if (menuContainer) {
            const refreshButton = document.createElement('button');
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Obnovit menu ze Sheets';
            refreshButton.className = 'print-button';
            refreshButton.style.marginLeft = '1rem';
            refreshButton.onclick = () => {
                initializeDailyMenu();
            };
            menuContainer.appendChild(refreshButton);
        }
    }
});

// Print daily menu function
document.getElementById('print-daily-menu')?.addEventListener('click', function() {
    const dailyMenuContent = document.querySelector('.daily-menu-custom');
    
    if (dailyMenuContent) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Denní menu - Selský dvůr</title>
                <style>
                    @page {
                        size: A4;
                        margin: 10mm;
                    }
                    
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #333;
                        background: white;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                    
                    h1 {
                        color: #745842;
                        text-align: center;
                        border-bottom: 3px solid #745842;
                        padding-bottom: 10px;
                        margin: 0 0 20px 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    
                    h4 {
                        color: #745842;
                        margin: 15px 0 10px 0;
                        border-bottom: 2px solid #8b6f47;
                        padding-bottom: 5px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    
                    .menu-content {
                        width: 100%;
                        max-width: none;
                    }
                    
                    .menu-item {
                        margin-bottom: 12px;
                        padding: 8px 0;
                        border-bottom: 1px solid #ddd;
                        page-break-inside: avoid;
                    }
                    
                    .menu-item-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 4px;
                        flex-wrap: wrap;
                    }
                    
                    .item-name {
                        font-weight: bold;
                        font-size: 15px;
                        flex: 1;
                        margin-right: 10px;
                        color: #333;
                    }
                    
                    .item-weight {
                        font-weight: normal;
                        color: #666;
                        margin-right: 15px;
                        font-size: 13px;
                    }
                    
                    .item-price {
                        font-weight: bold;
                        color: #745842;
                        font-size: 15px;
                        min-width: 60px;
                        text-align: right;
                    }
                    
                    .menu-item-allergens {
                        margin-top: 4px;
                    }
                    
                    .menu-item-allergens small {
                        color: #666;
                        font-size: 11px;
                        line-height: 1.3;
                        font-style: italic;
                    }
                    
                    /* Header s logem a údaji restaurace */
                    .print-header {
                        text-align: center;
                        margin-bottom: 25px;
                        border-bottom: 2px solid #745842;
                        padding-bottom: 15px;
                    }
                    
                    .restaurant-info {
                        font-size: 12px;
                        color: #666;
                        margin-top: 8px;
                    }
                    
                    /* Footer s kontakty */
                    .print-footer {
                        position: fixed;
                        bottom: 10mm;
                        left: 10mm;
                        right: 10mm;
                        text-align: center;
                        font-size: 11px;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 8px;
                    }
                    
                    /* Optimalizace pro tisk */
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        
                        .menu-item {
                            break-inside: avoid;
                        }
                        
                        h1, h4 {
                            break-after: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>Denní menu</h1>
                    <div class="restaurant-info">
                        <strong>Selský dvůr</strong><br>
                        Vysočanská 20, Praha 9 | Tel: +420 601 024 486
                    </div>
                </div>
                
                <div class="menu-content">
                    ${dailyMenuContent.innerHTML}
                </div>
                
                <div class="print-footer">
                    Selský dvůr - Tradiční česká kuchyně | www.vysocanyselskydvur.cz | Tel: +420 601 024 486
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Use native scroll with CSS scroll-margin-top
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', function() {
    const isOpen = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    
    // Update aria-expanded attribute
    hamburger.setAttribute('aria-expanded', !isOpen);
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (!isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar background change on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change navbar opacity based on scroll position
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(116, 88, 66, 0.98)';
    } else {
        navbar.style.background = 'rgba(116, 88, 66, 0.95)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-content, .menu-category, .gallery-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Scroll indicator click
document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
    scrollToSection('about');
});

// Set current date for daily menu
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const czechDate = today.toLocaleDateString('cs-CZ', options);
        dateElement.textContent = czechDate;
    }
}

// Google Sheets konfigurace
const GOOGLE_SHEETS_CONFIG = {
    SHEET_ID: '2PACX-1vTe1K-AloxSVrQ1iq1h-UuqpuUbdbjbRpgVRBy4wNF7DAHVy1smjLN5s4PTz-bm1irwjE2xN4Mwsbom',
    CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTe1K-AloxSVrQ1iq1h-UuqpuUbdbjbRpgVRBy4wNF7DAHVy1smjLN5s4PTz-bm1irwjE2xN4Mwsbom/pub?output=csv',
    SHEET_NAME: 'Sheet1',
    COLUMNS: {
        weight: 0,
        name: 1,
        allergens: 2,
        price: 3
    }
};

// Fallback menu data
const fallbackMenuData = {
    soup: {
        weight: "300ml",
        name: "Polévka dne",
        allergens: "1;3;7",
        price: "50 Kč"
    },
    menu1: {
        weight: "350g",
        name: "Hlavní jídlo 1",
        allergens: "1;3;7",
        price: "150 Kč"
    },
    menu2: {
        weight: "400g",
        name: "Hlavní jídlo 2",
        allergens: "1;3",
        price: "165 Kč"
    },
    menu3: {
        weight: "380g",
        name: "Hlavní jídlo 3",
        allergens: "7;9",
        price: "180 Kč"
    },
    dessert: {
        weight: "150g",
        name: "Dezert dne",
        allergens: "1;3;7",
        price: "65 Kč"
    }
};

// Načtení dat z Google Sheets CSV
async function loadMenuFromGoogleSheets() {
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.CSV_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        const menuData = [];
        
        // Zpracování řádků CSV - pouze řádky s obsahem
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Rozdělení CSV řádku (respektuje uvozovky)
                const columns = [];
                let current = '';
                let inQuotes = false;
                
                for (let j = 0; j < line.length; j++) {
                    const char = line[j];
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        columns.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                columns.push(current.trim());
                
                // Vytvoření objektu menu položky
                if (columns.length >= 4) {
                    // Zkontrolujeme, zda má položka skutečný obsah v názvu jídla
                    const itemName = columns[GOOGLE_SHEETS_CONFIG.COLUMNS.name] || '';
                    if (itemName.trim() !== '') {
                        menuData.push({
                            weight: columns[GOOGLE_SHEETS_CONFIG.COLUMNS.weight] || '0g',
                            name: itemName,
                            allergens: columns[GOOGLE_SHEETS_CONFIG.COLUMNS.allergens] || '',
                            price: columns[GOOGLE_SHEETS_CONFIG.COLUMNS.price] || '0 Kč',
                            index: i
                        });
                    }
                }
            }
        }
        
        // Pokud nemáme žádná data, použijeme fallback
        if (menuData.length === 0) {
            return Object.values(fallbackMenuData);
        }
        
        return menuData;
        
    } catch (error) {
        console.error('Chyba při načítání z Google Sheets:', error);
        return Object.values(fallbackMenuData);
    }
}

// Mapování alergenů
const ALLERGEN_MAP = {
    1: "Obiloviny obsahující lepek",
    2: "Korýši", 
    3: "Vejce",
    4: "Ryby",
    5: "Arašídy",
    6: "Sójové boby",
    7: "Mléko a výrobky z něj",
    8: "Skořápkové plody",
    9: "Celer",
    10: "Hořčice",
    11: "Sezamová semena",
    12: "Oxid siřičitý a siřičitany",
    13: "Vlčí bob",
    14: "Měkkýši"
};

function formatAllergens(allergenNumbers) {
    if (!allergenNumbers || allergenNumbers.trim() === '') {
        return 'Bez uvedených alergenů';
    }
    
    // Změněno z čárek na středníky
    const numbers = allergenNumbers.split(';').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const allergenNames = numbers.map(num => ALLERGEN_MAP[num] || `Alergen ${num}`);
    
    return allergenNames.length > 0 ? allergenNames.join(', ') : 'Bez uvedených alergenů';
}

// Aktualizace HTML s daty z menu
function updateDailyMenuDisplay(menuData) {
    const menuContainer = document.querySelector('.daily-menu-custom .menu-category');
    
    if (!menuContainer) {
        console.error('Menu kontejner nenalezen');
        return;
    }
    
    let menuHTML = `<h4>Dnešní nabídka - <span id="current-date"></span></h4>`;
    
    // Dynamické generování menu položek podle počtu dat
    menuData.forEach((item, index) => {
        // První položka je polévka, zbytek jsou hlavní jídla
        const itemLabel = index === 0 ? 'Polévka' : `Jídlo ${index}`;
        
        menuHTML += `
        <div class="menu-item">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <span class="item-name">${itemLabel}: ${item.name}</span>
                    <span class="item-weight">${item.weight}</span>
                    <span class="item-price">${item.price}</span>
                </div>
                <div class="menu-item-allergens">
                    <small>Alergeny: ${formatAllergens(item.allergens)}</small>
                </div>
            </div>
        </div>`;
    });
    
    menuContainer.innerHTML = menuHTML;
    setCurrentDate();
}

// Hlavní funkce pro inicializaci denního menu
async function initializeDailyMenu() {
    try {
        const menuData = await loadMenuFromGoogleSheets();
        updateDailyMenuDisplay(menuData);
    } catch (error) {
        console.error('Chyba při inicializaci denního menu:', error);
        updateDailyMenuDisplay(fallbackMenuData);
    }
}

// Add click tracking for analytics (production ready)
function trackClick(elementName) {
    // Připraveno pro Google Analytics nebo jiný tracking systém
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'engagement',
            'event_label': elementName
        });
    }
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current date for daily menu
    setCurrentDate();
    
    // Initialize daily menu system with Google Sheets API
    initializeDailyMenu();
    
    // Track logo clicks
    document.querySelector('.nav-logo .logo-link')?.addEventListener('click', () => {
        trackClick('nav-logo');
    });
    
    // Track hero logo clicks
    document.querySelector('.hero-logo-svg')?.addEventListener('click', () => {
        trackClick('hero-logo');
    });
    
    // Track CTA button clicks
    document.querySelector('.cta-button')?.addEventListener('click', () => {
        trackClick('cta-button');
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            trackClick('phone-number');
        });
    });
    
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            trackClick('email');
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.footer-social a').forEach(link => {
        link.addEventListener('click', () => {
            trackClick('social-media');
        });
    });
});

// Handle side-link clicks for smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    
    // Add event listeners to side-links
    function setupSideLinks() {
        const sideLinks = document.querySelectorAll('.side-link[href="#prilohy"]');
        
        sideLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                scrollToSection('prilohy');
            });
        });
    }
    
    // Set up immediately and after delay for dynamic content
    setupSideLinks();
    setTimeout(setupSideLinks, 2000);
});

// Production ready - Selský dvůr restaurant website
// Optimized for performance and user experience
