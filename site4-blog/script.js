// Articles data
const articles = [
    { id: 1, title: 'Искусственный интеллект в медицине', category: 'tech', excerpt: 'Новые технологии ИИ помогают врачам ставить более точные диагнозы...', author: 'Анна Смирнова', date: '10 января 2025' },
    { id: 2, title: 'Тренды в стартап-индустрии 2025', category: 'business', excerpt: 'Какие направления будут наиболее перспективными для новых компаний...', author: 'Дмитрий Иванов', date: '12 января 2025' },
    { id: 3, title: 'Квантовые компьютеры: прорыв года', category: 'science', excerpt: 'Ученые достигли нового уровня в разработке квантовых вычислительных систем...', author: 'Мария Петрова', date: '14 января 2025' },
    { id: 4, title: 'Здоровый образ жизни: новые подходы', category: 'lifestyle', excerpt: 'Современные методы поддержания здоровья и активности...', author: 'Олег Сидоров', date: '13 января 2025' },
    { id: 5, title: 'Блокчейн меняет финансовую индустрию', category: 'tech', excerpt: 'Как технология блокчейн трансформирует банковский сектор...', author: 'Елена Козлова', date: '11 января 2025' },
    { id: 6, title: 'Удаленная работа: будущее офисов', category: 'business', excerpt: 'Тренды в организации удаленной работы и их влияние на бизнес...', author: 'Игорь Волков', date: '9 января 2025' },
    { id: 7, title: 'Климатические изменения: новые данные', category: 'science', excerpt: 'Последние исследования в области климатологии и их значение...', author: 'Татьяна Новикова', date: '8 января 2025' },
    { id: 8, title: 'Медитация и ментальное здоровье', category: 'lifestyle', excerpt: 'Как практики осознанности помогают улучшить качество жизни...', author: 'Сергей Морозов', date: '7 января 2025' },
    { id: 9, title: '5G сети: что это значит для нас', category: 'tech', excerpt: 'Внедрение сетей пятого поколения и их влияние на повседневную жизнь...', author: 'Наталья Федорова', date: '6 января 2025' },
    { id: 10, title: 'Экономика будущего', category: 'business', excerpt: 'Как меняется мировая экономика под влиянием новых технологий...', author: 'Алексей Соколов', date: '5 января 2025' }
];

let displayedArticles = 6;
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    setupEventListeners();
    setupReadingProgress();
});

// Render articles
function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    const filtered = currentFilter === 'all' 
        ? articles 
        : articles.filter(a => a.category === currentFilter);
    
    grid.innerHTML = filtered.slice(0, displayedArticles).map(article => `
        <div class="article-card" data-id="${article.id}">
            <div class="article-image"></div>
            <div class="article-content">
                <span class="article-category">${getCategoryName(article.category)}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.author}</span>
                    <span>${article.date}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMore');
    if (displayedArticles >= filtered.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function getCategoryName(category) {
    const names = {
        'tech': 'Технологии',
        'business': 'Бизнес',
        'science': 'Наука',
        'lifestyle': 'Стиль жизни'
    };
    return names[category] || category;
}

// Load more articles
document.getElementById('loadMore').addEventListener('click', () => {
    displayedArticles += 3;
    renderArticles();
});

// Category filter
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        currentFilter = category;
        displayedArticles = 6;
        renderArticles();
        document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = articles.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query)
    );
    
    const grid = document.getElementById('articlesGrid');
    grid.innerHTML = filtered.map(article => `
        <div class="article-card" data-id="${article.id}">
            <div class="article-image"></div>
            <div class="article-content">
                <span class="article-category">${getCategoryName(article.category)}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.author}</span>
                    <span>${article.date}</span>
                </div>
            </div>
        </div>
    `).join('');
});

// Dark theme toggle
const themeToggle = document.getElementById('themeToggle');
const isDark = localStorage.getItem('theme') === 'dark';

if (isDark) {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkNow = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkNow 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Reading progress
function setupReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Subscribe form
document.getElementById('subscribeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Спасибо за подписку! Мы отправили письмо на ${email}`);
    e.target.reset();
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
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

// Article card click
document.addEventListener('click', (e) => {
    const card = e.target.closest('.article-card');
    if (card) {
        const id = card.getAttribute('data-id');
        // In real app, would navigate to article page
        console.log('Opening article', id);
    }
});

// Infinite scroll (optional)
let isLoading = false;
window.addEventListener('scroll', () => {
    if (isLoading) return;
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        isLoading = true;
        setTimeout(() => {
            displayedArticles += 3;
            renderArticles();
            isLoading = false;
        }, 500);
    }
});

