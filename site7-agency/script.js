// Custom Cursor
const cursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.line');
    lines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
}

// Portfolio items 3D effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Service items animation
const serviceItems = document.querySelectorAll('.service-item');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.5s ease';
    serviceObserver.observe(item);
});

// Team members flip effect
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('click', () => {
        member.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            member.style.transform = 'rotateY(0deg)';
        }, 600);
    });
});

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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
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

// Portfolio filter (if needed)
const portfolioItemsAll = document.querySelectorAll('.portfolio-item');
// Add filter functionality if needed

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.portfolio-item, .service-item, .team-member');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

