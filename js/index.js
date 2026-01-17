/*============================================
  GROPTIMA COLLEGE - MODERN LANDING PAGE JS
  Features: Smooth Scroll, AOS, Counter Animation
  ============================================*/

// ===== SAMPLE COLLEGE DATA (Standalone) =====
const colleges = [
    {
        name: "Uttaranchal University",
        type: "Private University",
        description: "A+ NAAC accredited university in Dehradun, recognized for excellence in Engineering, Law, and Management.",
        courses: ["B.Tech", "MBA", "LL.B", "BCA"],
        fees: "₹1,20,000 - ₹1,80,000",
        approval: "UGC Approved | A+ NAAC"
    },
    {
        name: "Maya Devi University",
        type: "Private University",
        description: "A premier institution offering 171+ courses with state-of-the-art infrastructure and A+ NAAC accreditation.",
        courses: ["B.Tech", "B.Sc Nursing", "B.Pharma", "BBA"],
        fees: "₹80,000 - ₹2,50,000",
        approval: "UGC Approved | A+ NAAC"
    },
    {
        name: "Dev Bhoomi Uttarakhand University",
        type: "Private University",
        description: "Leading university providing 210+ courses with a focus on industry-integrated learning and placement excellence.",
        courses: ["B.Tech", "BCA", "B.Pharm", "MBA"],
        fees: "₹1,00,000 - ₹2,20,000",
        approval: "UGC Approved | NAAC"
    }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initAOS();
    renderColleges();
    initCounterAnimation();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveLink(navLinks);
    });
}

function updateActiveLink(links) {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS (AOS Implementation) =====
function initAOS() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// ===== RENDER COLLEGES =====
function renderColleges() {
    const container = document.getElementById('collegesGrid');
    if (!container) return;

    const html = colleges.map(college => `
        <div class="college-card" data-aos="fade-up">
            <div class="college-header">
                <h3>${college.name}</h3>
                <span class="college-badge">${college.type}</span>
            </div>
            <p>${college.description}</p>
            <div class="college-info">
                <div class="info-row">
                    <span class="info-label">Popular Courses</span>
                    <span class="info-value">${college.courses.join(', ')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fee Range</span>
                    <span class="info-value" style="color: var(--primary)">${college.fees}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Accreditation</span>
                    <span class="info-value">${college.approval}</span>
                </div>
            </div>
            <div class="college-actions" style="margin-top: var(--space-md);">
                <button onclick="window.location.href='colleges.html'" class="btn btn-primary btn-block">View Details</button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // Re-initialize AOS for dynamically added elements
    setTimeout(() => {
        initAOS();
    }, 100);
}

// ===== PARALLAX EFFECT FOR GRADIENT ORBS =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INTERSECTION OBSERVER FOR CARDS =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all cards
document.querySelectorAll('.feature-card, .college-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(card);
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Skip on mobile

    cursorTrail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
    });

    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// ===== CONSOLE EASTER EGG =====
console.log('%cGroptima College 🎓', 'color: #10b981; font-size: 24px; font-weight: bold;');
console.log('%cDesigned with ❤️ using modern web technologies', 'color: #6b7280; font-size: 14px;');
console.log('%cInterested in joining our team? Contact us at info@groptima.com', 'color: #3b82f6; font-size: 12px;');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%cPage loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold;');
});
