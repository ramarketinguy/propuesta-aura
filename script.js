// ═══════════════════════════════════════════
// AURA x RAMARKETING — Landing Page Scripts
// ═══════════════════════════════════════════

// --- Scroll Reveal Animation (IntersectionObserver) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counters when stats section becomes visible
            if (entry.target.closest('#diagnostico') || entry.target.classList.contains('stats-hero')) {
                startCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in-up').forEach(el => {
    observer.observe(el);
});

// --- Animated Counters with number formatting ---
let countersStarted = false;

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('es-UY');
    }
    return num.toString();
}

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const counters = document.querySelectorAll('.counter, .counter-decimal');
    const duration = 2000; // Total animation duration in ms
    const fps = 60;
    const totalFrames = Math.round(duration / (1000 / fps));

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = counter.classList.contains('counter-decimal');
        let frame = 0;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const animate = () => {
            frame++;
            const progress = easeOutQuart(frame / totalFrames);
            const currentVal = target * progress;

            if (isDecimal) {
                // For engagement rates etc - show 2 decimals
                if (target < 1) {
                    counter.innerText = currentVal.toFixed(2);
                } else {
                    counter.innerText = currentVal.toFixed(1);
                }
            } else {
                counter.innerText = formatNumber(Math.round(currentVal));
            }

            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final value is exact
                if (isDecimal) {
                    counter.innerText = target < 1 ? target.toFixed(2) : target.toFixed(1);
                } else {
                    counter.innerText = formatNumber(target);
                }
            }
        };

        requestAnimationFrame(animate);
    });
}

// --- Scoped Tab Functionality (Plans + Services) ---
document.querySelectorAll('.tabs-container').forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            container.querySelector('#' + tabId).classList.add('active');

            // Show/hide promo-reason box based on plan selection
            if (tabId === 'plan1' || tabId === 'plan2') {
                const promoBox = document.getElementById('promo-reason-box');
                if (promoBox) {
                    promoBox.style.display = tabId === 'plan2' ? '' : 'none';
                }
            }
        });
    });
});

// Initialize: hide promo-reason if Plan 1 is default active
(function () {
    const promoBox = document.getElementById('promo-reason-box');
    if (promoBox) {
        // Check which plan tab is active
        const activePlanTab = document.querySelector('.tabs-container .tab-btn.active[data-tab]');
        if (activePlanTab && activePlanTab.getAttribute('data-tab') !== 'plan2') {
            promoBox.style.display = 'none';
        }
    }
})();

// --- Guarantee Tabs Functionality ---
const guarTabBtns = document.querySelectorAll('.guar-tab-btn');
const guarTabContents = document.querySelectorAll('.guar-tab-content');

guarTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        guarTabBtns.forEach(b => b.classList.remove('active'));
        guarTabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-guar-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// --- Scroll Progress Bar ---
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// --- Smooth Scroll for Anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Navbar background on scroll ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 7, 0.95)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
        navbar.style.background = 'rgba(5, 5, 7, 0.85)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
    }
}, { passive: true });

// --- Floating Particles in Hero ---
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(139, 92, 246, ${Math.random() * 0.15 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 8 + 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * -10}s;
        `;
        container.appendChild(particle);
    }

    // Add the CSS animation if not already present
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                50% { transform: translateY(-80px) translateX(${Math.random() > 0.5 ? '' : '-'}30px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particles
createParticles();
