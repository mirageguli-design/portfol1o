// Menu tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Reservation form
document.getElementById('reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Бронирование...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Спасибо! Ваш стол забронирован. Мы свяжемся с вами для подтверждения.');
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
});

// Set minimum date to today
const dateInput = document.querySelector('input[type="date"]');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(139, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(139, 0, 0, 0.95)';
    }
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gallery items animation
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Menu items animation on scroll
const menuItems = document.querySelectorAll('.menu-item');
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

menuItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    menuObserver.observe(item);
});

