/*============================================
  GROPTIMA – COLLEGE
  Colleges Page - Complete Module
  ============================================*/

const collegesData = [
    {
        id: 1,
        name: "Uttaranchal University",
        type: "Private University",
        courses: ["B.Tech (CSE)", "MBA", "LL.B", "BCA", "B.Sc Nursing"],
        feeRange: "₹1,20,000 - ₹1,80,000",
        location: "Dehradun",
        approval: "UGC Approved | A+ NAAC",
        image: "assets/images/colleges/uttaranchal.jpg",
        description: "A+ NAAC accredited university in Dehradun, recognized for excellence in Engineering, Law, and Management.",
        facilities: ["Library", "Hostel", "Placement Cell", "Sports", "Labs"],
        featured: true
    },
    {
        id: 2,
        name: "Maya Devi University",
        type: "Private University",
        courses: ["B.Tech", "B.Sc Nursing", "B.Pharma", "BBA", "BPT"],
        feeRange: "₹80,000 - ₹2,50,000",
        location: "Dehradun",
        approval: "UGC Approved | A+ NAAC",
        image: "assets/images/colleges/maya-devi.jpg",
        description: "A premier institution offering 171+ courses with state-of-the-art infrastructure and A+ NAAC accreditation.",
        facilities: ["Modern Labs", "Hostel", "Sports", "Library", "Cafeteria"],
        featured: true
    },
    {
        id: 3,
        name: "Dev Bhoomi Uttarakhand University",
        type: "Private University",
        courses: ["B.Tech (CSE, AI & ML)", "BCA", "B.Pharm", "MBA", "MCA"],
        feeRange: "₹1,00,000 - ₹2,20,000",
        location: "Dehradun",
        approval: "UGC Approved | NAAC",
        image: "assets/images/colleges/dev-bhoomi.jpg",
        description: "Leading university providing 210+ courses with a focus on industry-integrated learning and placement excellence.",
        facilities: ["Incubation Centre", "Hostel", "Labs", "Sports Complex"],
        featured: true
    },
    {
        id: 4,
        name: "Graphic Era Hill University",
        type: "Private University",
        courses: ["B.Tech", "BBA", "BCA", "MBA", "B.Des"],
        feeRange: "₹1,80,000 - ₹3,00,000",
        location: "Dehradun",
        approval: "UGC Approved | A+ NAAC",
        image: "assets/images/colleges/gehu.jpg",
        description: "Ranked among top universities, known for its focus on innovation, industry partnerships, and excellent placements.",
        facilities: ["Innovation Lab", "Hostel", "Sports", "Library"],
        featured: true
    },
    {
        id: 5,
        name: "Ras Bihari Bose Subharti University",
        type: "Private University",
        courses: ["MBBS", "B.Sc Nursing", "BPT", "B.Tech", "B.Pharm"],
        feeRange: "₹40,000 - ₹21,00,000",
        location: "Dehradun",
        approval: "UGC Approved | NAAC",
        image: "assets/images/colleges/subharti.jpg",
        description: "A prominent institution in Dehradun offering a wide range of medical, paramedical, and technical programs.",
        facilities: ["Medical Hospital", "Hostel", "Library", "Labs"],
        featured: false
    },
    {
        id: 6,
        name: "Galgotias University",
        type: "Private University",
        courses: ["B.Tech", "MBA", "BCA", "B.Sc Nursing", "LLB"],
        feeRange: "₹1,00,000 - ₹6,99,000",
        location: "Greater Noida",
        approval: "UGC Approved | A+ NAAC",
        image: "assets/images/colleges/galgotias.jpg",
        description: "Top-ranked university in Greater Noida, known for its academic rigor and global exposure.",
        facilities: ["Campus-wide WiFi", "Hostel", "Sports", "Research Hub"],
        featured: false
    },
    {
        id: 7,
        name: "Lovely Professional University (LPU)",
        type: "Private University",
        courses: ["B.Tech", "MBA", "B.Design", "B.Arch", "BCA"],
        feeRange: "₹1,50,000 - ₹5,40,000",
        location: "Phagwara, Punjab",
        approval: "UGC Approved | NAAC A++",
        image: "assets/images/colleges/lpu.jpg",
        description: "One of India's largest private universities, offering diverse programs with a massive campus and global placement records.",
        facilities: ["Uni-Mall", "Hostel", "Indoor Stadium", "Library"],
        featured: false
    }
];

// Filter colleges function
function filterColleges({ search, course, type }) {
    return collegesData.filter(college => {
        const matchesSearch = college.name.toLowerCase().includes(search.toLowerCase()) ||
            college.description.toLowerCase().includes(search.toLowerCase());
        const matchesCourse = course === 'all' || college.courses.some(c => c.toLowerCase().includes(course.toLowerCase()));
        const matchesType = type === 'all' || college.type.toLowerCase() === type.toLowerCase();

        return matchesSearch && matchesCourse && matchesType;
    });
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Render colleges
function renderColleges(colleges) {
    const container = document.getElementById('colleges-container');
    const noResults = document.getElementById('no-results');

    if (colleges.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    }

    container.style.display = 'grid';
    noResults.style.display = 'none';

    container.innerHTML = colleges.map(college => `
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
                    <span class="info-value" style="color: var(--primary)">${college.feeRange}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Accreditation</span>
                    <span class="info-value">${college.approval}</span>
                </div>
            </div>
            <div class="college-actions">
                <button onclick="window.location.href='counselling.html'" class="btn btn-primary btn-apply">Apply Now</button>
                <button onclick="window.location.href='${college.name.includes('Uttaranchal University') ? 'Collage-pages/uttaranchal-university.html' :
            college.name.includes('Maya Devi University') ? 'Collage-pages/maya-devi-university.html' :
                'counselling.html'
        }'" class="btn btn-outline">View Details</button>
            </div>
        </div>
    `).join('');

    // Re-initialize animations
    setTimeout(() => {
        initAOS();
    }, 100);
}

// Apply filters
function applyFilters() {
    const search = document.getElementById('search').value;
    const course = document.getElementById('course-filter').value;
    const type = document.getElementById('type-filter').value;

    const filtered = filterColleges({ search, course, type });
    renderColleges(filtered);
}

// Simple AOS-like animation
function initAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for filters
    document.getElementById('search').addEventListener('input', debounce(applyFilters, 300));
    document.getElementById('course-filter').addEventListener('change', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Initial render
    renderColleges(collegesData);
    initAOS();
});
