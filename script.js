// --- 1. Global Variables & Initialization ---
let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
    
    injectHeader();
    injectFooter();
    injectOverlays(); // Injects the left-menu, modal, and floating button
});

// --- 2. Inject Primary Sections ---
function injectHeader() {
    document.getElementById('header-placeholder').innerHTML = `
    <nav class="absolute top-0 w-full z-50 p-6 flex justify-between items-center border-b border-white/10 bg-brand-dark/90 backdrop-blur-md">
        <div class="text-3xl font-bold text-brand-pink z-50" style="font-family: cursive;">Sprinkles</div>
        
        <div class="hidden md:flex space-x-6 text-sm font-bold tracking-wider items-center">
            <a href="#" class="hover:text-brand-pink transition">HOME</a>
            <a href="#about" class="hover:text-brand-pink transition">ABOUT US</a>
            <a href="#services" class="hover:text-brand-pink transition">SERVICES</a>
            <a href="#menu" class="hover:text-brand-pink transition">MENU</a>
            <a href="#gallery" class="hover:text-brand-pink transition">GALLERY</a>
        </div>

        <div class="flex items-center gap-4 z-50">
            <button onclick="toggleCart()" class="hidden md:flex relative items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-brand-pink transition">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span id="cart-count" class="bg-brand-pink text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2 shadow-lg">0</span>
            </button>
            <button onclick="toggleMobileMenu()" class="md:hidden text-white hover:text-brand-pink transition p-2">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
    </nav>

    <header id="hero" class="relative text-center py-24 md:py-32 px-4 border-b border-brand-pink/20 bg-cover bg-center transition-all duration-1000">
        <div class="absolute inset-0 bg-brand-dark/80"></div>
        <div class="relative z-10 pt-16 md:pt-20">
            <h1 class="text-5xl md:text-7xl font-bold text-brand-pink mb-4 drop-shadow-lg" style="font-family: cursive;">Sprinkles</h1>
            <p class="text-lg md:text-xl tracking-widest text-gray-300 mb-8 uppercase font-bold">Confectioners</p>
            <h2 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">Freshly Baked <br class="md:hidden"> on Order.</h2>
            <a href="#menu" class="inline-block bg-brand-pink text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition shadow-lg mt-6">Shop Our Menu</a>
        </div>
    </header>`;
    
    // Start slider
    const heroSection = document.getElementById('hero');
    const bgImages = [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80',
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1920&q=80'
    ];
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % bgImages.length;
        heroSection.style.backgroundImage = `url('${bgImages[currentIndex]}')`;
    }, 5000);
}

function injectFooter() {
    document.getElementById('footer-placeholder').innerHTML = `
    <footer id="footer" class="bg-black py-16 border-t border-brand-pink/20 mt-20">
        <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
                <h4 class="text-brand-pink text-3xl font-bold mb-4" style="font-family: cursive;">Sprinkles</h4>
                <p class="text-gray-400 text-sm leading-relaxed">Premium custom cakes, event catering, and signature treats in Lusaka. Baked fresh, just for you.</p>
                <div class="mt-6 flex justify-center md:justify-start gap-4">
                    <a href="#" class="text-gray-400 hover:text-brand-pink transition">Instagram</a>
                    <a href="#" class="text-gray-400 hover:text-brand-pink transition">Facebook</a>
                </div>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
                <ul class="space-y-3 text-gray-400 text-sm">
                    <li><a href="#menu" class="hover:text-brand-pink transition">Order Online</a></li>
                    <li><a href="#custom-order" class="hover:text-brand-pink transition">Custom Cake Quotes</a></li>
                    <li><a href="#services" class="hover:text-brand-pink transition">Catering Services</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
                <p class="text-gray-400 text-sm mb-2">WhatsApp: +260 977 828 035</p>
                <p class="text-gray-400 text-sm">Location: Ibex Hill, Lusaka, Zambia</p>
            </div>
        </div>
        
        <div class="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-900 text-center md:flex md:justify-between items-center text-xs text-gray-600">
            <p>&copy; 2026 Sprinkles Confectioners. All rights reserved.</p>
            <p class="mt-4 md:mt-0 tracking-widest uppercase">Digital Experience Designed by <span class="text-brand-pink font-bold">Purple Worth Studio</span></p>
        </div>
    </footer>`;
}

// --- 6. Custom Order Form Logic ---
function sendCustomOrder(e) {
    e.preventDefault();
    const name = document.getElementById('co-name').value;
    const phone = document.getElementById('co-phone').value;
    const date = document.getElementById('co-date').value;
    const guests = document.getElementById('co-guests').value;
    const details = document.getElementById('co-details').value;

    const message = `Hello Sprinkles! I would like to request a quote for a Custom Cake.\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Event Date:* ${date}\n` +
                    `*Number of Guests:* ${guests}\n\n` +
                    `*Cake Details & Theme:*\n${details}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/260977828035?text=${encodedMessage}`, '_blank');
}

// --- 3. Inject Overlays (Mobile Menu, Quantity Modal, Floating Cart) ---
function injectOverlays() {
    const overlays = `
    <button id="floating-cart-btn" onclick="toggleCart()" class="fixed bottom-6 left-6 z-[80] bg-brand-card border border-brand-pink text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,42,133,0.4)] hover:bg-brand-pink transition-transform duration-300 flex items-center justify-center">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        <span id="floating-cart-badge" class="absolute -top-2 -right-2 bg-brand-pink text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">0</span>
    </button>

    <div id="quantity-modal" class="fixed inset-0 bg-black/80 z-[110] hidden flex items-center justify-center backdrop-blur-sm px-4">
        <div class="bg-brand-card border border-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-1" id="q-modal-name">Item</h3>
            <p class="text-brand-pink font-bold mb-6 text-lg" id="q-modal-price">ZMW 0.00</p>
            
            <div class="flex items-center justify-between bg-black rounded-2xl p-2 mb-8 border border-gray-800">
                <button onclick="changeModalQty(-1)" class="w-12 h-12 flex items-center justify-center text-3xl text-gray-400 hover:text-white bg-gray-900 rounded-xl">-</button>
                <span id="q-modal-qty" class="text-2xl font-bold text-white">1</span>
                <button onclick="changeModalQty(1)" class="w-12 h-12 flex items-center justify-center text-3xl text-brand-pink hover:text-white bg-gray-900 rounded-xl">+</button>
            </div>
            
            <div class="flex gap-3">
                <button onclick="closeQuantityModal()" class="flex-1 py-3 text-gray-400 font-bold hover:text-white transition">Cancel</button>
                <button onclick="confirmAddToCart()" class="flex-[2] bg-brand-pink text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition shadow-lg">Add to Cart</button>
            </div>
        </div>
    </div>

    <div id="mobile-menu-overlay" onclick="toggleMobileMenu()" class="fixed inset-0 bg-black/60 z-[90] hidden backdrop-blur-sm transition-opacity"></div>
    <div id="mobile-menu" class="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-brand-card border-r border-brand-pink/30 shadow-2xl z-[100] transform -translate-x-full transition-transform duration-300 flex flex-col p-8">
        <div class="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
            <div class="text-3xl font-bold text-brand-pink" style="font-family: cursive;">Sprinkles</div>
            <button onclick="toggleMobileMenu()" class="text-gray-400 hover:text-white bg-gray-900 p-2 rounded-full">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="flex flex-col space-y-6 text-lg font-bold tracking-widest flex-1">
            <a href="#" onclick="toggleMobileMenu()" class="hover:text-brand-pink transition">HOME</a>
            <a href="#about" onclick="toggleMobileMenu()" class="hover:text-brand-pink transition">ABOUT US</a>
            <a href="#services" onclick="toggleMobileMenu()" class="hover:text-brand-pink transition">SERVICES</a>
            <a href="#menu" onclick="toggleMobileMenu()" class="hover:text-brand-pink transition">MENU</a>
        </div>
    </div>`;
    
    const div = document.createElement('div');
    div.innerHTML = overlays;
    document.body.appendChild(div);
}

// --- 4. Interactive Logic ---

// Mobile Menu (Slide from Left)
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('-translate-x-full');
    document.getElementById('mobile-menu-overlay').classList.toggle('hidden');
}

// We intercept the HTML addToCart to open the Modal instead
function addToCart(name, price) {
    document.getElementById('q-modal-name').innerText = name;
    document.getElementById('q-modal-price').innerText = `ZMW ${price.toFixed(2)}`;
    document.getElementById('q-modal-qty').innerText = "1";
    document.getElementById('quantity-modal').dataset.name = name;
    document.getElementById('quantity-modal').dataset.price = price;
    document.getElementById('quantity-modal').classList.remove('hidden');
}

function closeQuantityModal() {
    document.getElementById('quantity-modal').classList.add('hidden');
}

function changeModalQty(delta) {
    let qtyEl = document.getElementById('q-modal-qty');
    let newQty = parseInt(qtyEl.innerText) + delta;
    if (newQty >= 1) qtyEl.innerText = newQty;
}

// User confirms quantity in the modal
function confirmAddToCart() {
    let name = document.getElementById('quantity-modal').dataset.name;
    let price = parseFloat(document.getElementById('quantity-modal').dataset.price);
    let qty = parseInt(document.getElementById('q-modal-qty').innerText);

    // Add to cart array (check if already exists)
    let existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ name, price, quantity: qty });
    }

    closeQuantityModal();
    updateCartUI();

    // Make floating button "bounce" to show item was added
    const floater = document.getElementById('floating-cart-btn');
    floater.classList.add('scale-125');
    setTimeout(() => floater.classList.remove('scale-125'), 200);
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('translate-x-full');
    document.getElementById('cart-overlay').classList.toggle('hidden');
}

// Advanced Cart UI updating
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Badges
    const badge1 = document.getElementById('cart-count');
    const badge2 = document.getElementById('floating-cart-badge');
    if (badge1) badge1.textContent = totalItems;
    if (badge2) badge2.textContent = totalItems;

    // Update Totals & Lists
    const totalEl = document.getElementById('cart-total');
    const itemsEl = document.getElementById('cart-items');
    const checkoutFields = document.getElementById('checkout-fields');
    
    if (totalEl) totalEl.textContent = `ZMW ${cartTotal.toFixed(2)}`;

    if (cart.length === 0) {
        if (itemsEl) itemsEl.innerHTML = `<p class="text-gray-500 text-center mt-10">Your cart is empty.</p>`;
        if (checkoutFields) checkoutFields.classList.add('hidden');
    } else {
        if (itemsEl) {
            itemsEl.innerHTML = cart.map((item, i) => `
                <div class="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col gap-3">
                    <div class="flex justify-between items-start">
                        <span class="text-white font-bold">${item.name}</span>
                        <button onclick="updateItemQty(${i}, -${item.quantity})" class="text-gray-500 hover:text-red-500 transition">✕</button>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2 bg-black rounded-lg p-1 border border-gray-800">
                            <button onclick="updateItemQty(${i}, -1)" class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded">-</button>
                            <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                            <button onclick="updateItemQty(${i}, 1)" class="w-7 h-7 flex items-center justify-center text-brand-pink hover:text-white rounded">+</button>
                        </div>
                        <span class="text-brand-pink font-bold">ZMW ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
        }
        if (checkoutFields) checkoutFields.classList.remove('hidden');
    }
}

// Adjust quantity directly inside the cart
function updateItemQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// --- 5. Lenco Checkout ---
function getPaidWithLenco() {
    if (cartTotal === 0) return;
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const email = document.getElementById("customerEmail").value;
    
    if(!name || !email || !phone) {
        alert("Please fill in your contact details.");
        return;
    }

    const nameParts = name.split(" ");
    LencoPay.getPaid({
        key: 'pub-88dd921c0ecd73590459a1dd5a9343c77db0f3c344f222b9', 
        reference: 'sprinkles-' + Date.now(), 
        email: email, 
        amount: cartTotal,
        currency: "ZMW",
        channels: ["card", "mobile-money"],
        customer: { firstName: nameParts[0], lastName: nameParts.slice(1).join(" "), phone: phone },
        onSuccess: function (res) {
            alert("Payment Successful! Reference: " + res.reference);
            cart = [];
            updateCartUI();
            toggleCart();
        }
    });
}