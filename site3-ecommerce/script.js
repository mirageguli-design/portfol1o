// Products data
const products = [
    { id: 1, name: 'Классическая рубашка', category: 'men', price: 2999, image: 'shirt1' },
    { id: 2, name: 'Элегантное платье', category: 'women', price: 4999, image: 'dress1' },
    { id: 3, name: 'Кожаный ремень', category: 'accessories', price: 1999, image: 'belt1' },
    { id: 4, name: 'Спортивные кроссовки', category: 'shoes', price: 5999, image: 'shoes1' },
    { id: 5, name: 'Джинсы', category: 'men', price: 3999, image: 'jeans1' },
    { id: 6, name: 'Сумка', category: 'accessories', price: 3499, image: 'bag1' },
    { id: 7, name: 'Блузка', category: 'women', price: 2499, image: 'blouse1' },
    { id: 8, name: 'Туфли', category: 'shoes', price: 6999, image: 'heels1' },
    { id: 9, name: 'Пиджак', category: 'men', price: 7999, image: 'jacket1' },
    { id: 10, name: 'Юбка', category: 'women', price: 2999, image: 'skirt1' },
    { id: 11, name: 'Часы', category: 'accessories', price: 8999, image: 'watch1' },
    { id: 12, name: 'Ботинки', category: 'shoes', price: 5499, image: 'boots1' }
];

let cart = [];
let filteredProducts = [...products];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <div class="product-badge">Новинка</div>
            <div class="product-actions">
                <button class="action-btn quick-view-btn" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="addToWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price.toLocaleString()} ₽</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> В корзину
            </button>
        </div>
    `;
    return card;
}

function getCategoryName(category) {
    const names = {
        'men': 'Мужское',
        'women': 'Женское',
        'accessories': 'Аксессуары',
        'shoes': 'Обувь'
    };
    return names[category] || category;
}

// Filter products
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(p => p.category === filter);
        }
        renderProducts();
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query)
    );
    renderProducts();
});

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} ₽ x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toLocaleString() + ' ₽';
}

function showCartNotification() {
    const count = document.getElementById('cartCount');
    count.style.animation = 'none';
    setTimeout(() => {
        count.style.animation = 'bounce 0.5s';
    }, 10);
}

// Cart sidebar
document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
});

document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
}

// Quick view
document.addEventListener('click', (e) => {
    if (e.target.closest('.quick-view-btn')) {
        const productId = parseInt(e.target.closest('.quick-view-btn').getAttribute('data-id'));
        openQuickView(productId);
    }
});

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('quickViewModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div class="product-image" style="height: 400px; border-radius: 10px;"></div>
            <div>
                <h2 style="font-family: 'Poppins', sans-serif; margin-bottom: 1rem;">${product.name}</h2>
                <div style="font-size: 2rem; color: var(--primary-color); font-weight: 700; margin-bottom: 1rem;">
                    ${product.price.toLocaleString()} ₽
                </div>
                <p style="margin-bottom: 2rem; color: var(--text-light);">
                    Высококачественный товар из нашей коллекции. Идеальное сочетание стиля и комфорта.
                </p>
                <div style="margin-bottom: 1rem;">
                    <label>Размер:</label>
                    <select style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; border: 2px solid #e0e0e0; border-radius: 5px;">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </div>
                <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${product.id}); closeQuickView();">
                    Добавить в корзину
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

document.getElementById('modalClose').addEventListener('click', closeQuickView);
document.getElementById('quickViewModal').addEventListener('click', (e) => {
    if (e.target.id === 'quickViewModal') {
        closeQuickView();
    }
});

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    cart = [];
    updateCartUI();
    closeCart();
});

// Category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        document.querySelector(`[data-filter="${category}"]`).click();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

