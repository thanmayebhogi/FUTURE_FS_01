// Product Data
const products = [
    {
        id: 1,
        name: "Giant Cuddly Teddy",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Teddy"
    },
    {
        id: 2,
        name: "Premium Rose Bouquet",
        price: 35.50,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Flowers"
    },
    {
        id: 3,
        name: "Luxury Dark Trouffles",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Chocolates"
    },
    {
        id: 4,
        name: "Forever Rose in Glass",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&q=80&w=800", // "Forever Rose" replacement
        category: "Decor"
    },
    {
        id: 5,
        name: "Heart Pendant Necklace",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Jewelry"
    },
    {
        id: 6,
        name: "Romantic Candle Set",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Home"
    },
    {
        id: 7,
        name: "Customized Photo Frame",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Decor"
    },
    {
        id: 8,
        name: "Couples' Watch Set",
        price: 159.00,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Jewelry"
    },
    {
        id: 9,
        name: "Cute Plush Penguin",
        price: 22.00,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Teddy"
    },
    {
        id: 10,
        name: "Love Letters Book",
        price: 18.50,
        image: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?auto=format&fit=crop&q=80&w=800", // "Love Letters" replacement
        category: "Stationery"
    },
    {
        id: 11,
        name: "Golden Heart Balloon",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800", // "Gift" replacement for Balloon
        category: "Decor"
    },
    {
        id: 12,
        name: "Bath Bomb Gift Set",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1547049082-1a12c3bf2366?auto=format&fit=crop&q=80&w=800", // "Bath Bomb" replacement
        category: "Beauty"
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const modal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartTotal = document.getElementById('cart-total');
const paymentTotal = document.getElementById('payment-total');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartView = document.getElementById('cart-view');
const paymentView = document.getElementById('payment-view');
const proceedBtn = document.getElementById('proceed-btn');
const backToCartBtn = document.getElementById('back-to-cart-btn');


// State
let cartItems = [];
let totalAmount = 0;

// Initialize
function init() {
    renderProducts();
    setupEventListeners();
}

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart Logic
window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cartItems.push(product);
        totalAmount += product.price;
        updateCartUI();

        // Animation feedback
        const btn = event.target.closest('.add-to-cart');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Added! <i class="fa-solid fa-check"></i>';
        btn.style.background = '#4CAF50';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; // Revert to CSS default
        }, 1500);
    }
}

function updateCartUI() {
    cartCount.textContent = cartItems.length;
    // Bounce animation for badge
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function renderCartItems() {
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Add some love!</p>';
        proceedBtn.style.display = 'none';
    } else {
        proceedBtn.style.display = 'inline-block';
        cartItemsContainer.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    }
    cartTotal.textContent = '$' + totalAmount.toFixed(2);
}

window.removeItem = function (index) {
    const item = cartItems[index];
    totalAmount -= item.price;
    cartItems.splice(index, 1);
    updateCartUI();
    renderCartItems();
}

// Modal Logic
cartBtn.addEventListener('click', () => {
    openCart();
});

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openCart() {
    // Reset views
    cartView.style.display = 'block';
    paymentView.style.display = 'none';

    renderCartItems();
    modal.style.display = "flex";
}

proceedBtn.addEventListener('click', () => {
    if (cartItems.length === 0) return;

    // Switch to Payment View
    cartView.style.display = 'none';
    paymentView.style.display = 'block';
    paymentTotal.textContent = '$' + totalAmount.toFixed(2);
});

backToCartBtn.addEventListener('click', () => {
    cartView.style.display = 'block';
    paymentView.style.display = 'none';
});


window.finishPayment = function () {
    alert("Payment Successful! Thank you for spreading the love.");
    modal.style.display = "none";
    cartItems = [];
    totalAmount = 0;
    updateCartUI();
}


function setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu (Simple toggle)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // For now simple display toggle, ideally would add a class
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
});

// Login Modal Logic
const loginLink = document.getElementById('login-link');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.querySelector('.close-login');
const loginForm = document.getElementById('login-form');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if we are in "Logout" mode
    if (loginLink.innerHTML.includes('Logout')) {
        const doLogout = confirm("Do you want to log out?");
        if (doLogout) {
            loginLink.innerHTML = "Login"; // Reset text
            alert("Logged out successfully.");
        }
        return;
    }
    loginModal.style.display = "flex";
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate Login
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (email && password) {
        // Find the submit button to animate it
        const submitBtn = loginForm.querySelector('button');
        const originalText = submitBtn.textContent;

        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

        setTimeout(() => {
            loginModal.style.display = "none";
            // Change button to Logout
            loginLink.innerHTML = 'Logout <i class="fa-solid fa-right-from-bracket"></i>';

            // Reset button
            submitBtn.textContent = originalText;

            // Show welcome message
            alert("Welcome back! You have successfully logged in.");

            // Clear form
            loginForm.reset();
        }, 1500);
    }
});

// Run
init();
