// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
setInterval(nextSlide, 5000);

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(index);
    });
});

function openLightbox(index) {
    const item = galleryItems[index];
    const overlay = item.querySelector('.gallery-overlay p');
    const caption = overlay ? overlay.textContent : 'Фотография';
    
    lightboxImage.src = item.querySelector('.gallery-image').style.backgroundImage || '';
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    openLightbox(currentImageIndex);
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    openLightbox(currentImageIndex);
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxNext.click();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
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
            navMenu.classList.remove('active');
        }
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

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Спасибо за вашу заявку! Я свяжусь с вами в ближайшее время.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Parallax effect for gallery items
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.1 + (index % 3) * 0.05;
            item.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// Animate stats on scroll
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = entry.target.textContent.replace(/\D/g, '');
            animateCounter(entry.target, parseInt(target));
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

