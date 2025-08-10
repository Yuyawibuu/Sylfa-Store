// script.js

const products = [
    {
        id: 1,
        name: "Netflix Premium - 1 Bulan",
        price: 150000,
        image: "https://via.placeholder.com/250x150/e50914/ffffff?text=Netflix+Premium",
        features: ["Ultra HD (4K)", "4 Perangkat", "Akun Pribadi"]
    },
    {
        id: 2,
        name: "Netflix Standar - 1 Bulan",
        price: 100000,
        image: "https://via.placeholder.com/250x150/e50914/ffffff?text=Netflix+Standar",
        features: ["Full HD (1080p)", "2 Perangkat", "Akun Sharing"]
    },
    {
        id: 3,
        name: "WeTV VIP - 1 Tahun",
        price: 50000,
        image: "https://via.placeholder.com/250x150/ffb800/000000?text=WeTV+VIP",
        features: ["Semua Konten VIP", "1 Perangkat", "Tanpa Iklan"]
    },
    {
        id: 4,
        name: "Disney+ Hotstar - 1 Bulan",
        price: 39000,
        image: "https://via.placeholder.com/250x150/0f246b/ffffff?text=Disney+Hotstar",
        features: ["Semua konten", "1 Perangkat", "Kualitas HD"]
    },
    {
        id: 5,
        name: "YouTube Premium - 3 Bulan",
        price: 75000,
        image: "https://via.placeholder.com/250x150/ff0000/ffffff?text=YouTube+Premium",
        features: ["Bebas Iklan", "Download Video", "YouTube Music"]
    },
    {
        id: 6,
        name: "Viu Premium - 6 Bulan",
        price: 90000,
        image: "https://via.placeholder.com/250x150/0f1c2c/ffffff?text=Viu+Premium",
        features: ["Download episode", "Tonton di Smart TV", "Akses Konten Eksklusif"]
    },
    {
        id: 7,
        name: "CapCut Pro - 1 Tahun",
        price: 120000,
        image: "https://via.placeholder.com/250x150/00d3a5/ffffff?text=CapCut+Pro",
        features: ["Fitur Editing Lengkap", "Efek dan Transisi Premium", "Ekspor Tanpa Watermark"]
    },
    {
        id: 8,
        name: "Canva Premium - 1 Tahun",
        price: 250000,
        image: "https://via.placeholder.com/250x150/8a2be2/ffffff?text=Canva+Premium",
        features: ["Akses 100 Juta+ Template", "Penghapus Latar Belakang", "100 GB Penyimpanan Cloud"]
    },
    {
        id: 9,
        name: "Spotify Premium Family - 1 Bulan",
        price: 65000,
        image: "https://via.placeholder.com/250x150/1db954/ffffff?text=Spotify+Premium",
        features: ["Bebas Iklan", "Dengarkan Offline", "Kualitas Audio Tinggi"]
    },
    {
        id: 10,
        name: "Bstation Premium - 1 Tahun",
        price: 70000,
        image: "https://via.placeholder.com/250x150/00a1d6/ffffff?text=Bstation+Premium",
        features: ["Tonton Anime Terbaru", "Kualitas HD", "Tanpa Iklan"]
    },
    {
        id: 11,
        name: "Alight Motion Pro - 1 Tahun",
        price: 150000,
        image: "https://via.placeholder.com/250x150/663399/ffffff?text=Alight+Motion+Pro",
        features: ["Fitur Animasi Lengkap", "Motion Graphic", "Ekspor Tanpa Watermark"]
    },
    {
        id: 12,
        name: "Suntik 1000 Views YouTube",
        price: 25000,
        image: "https://via.placeholder.com/250x150/ff0000/ffffff?text=YouTube+Views",
        features: ["1000 Views Realistis", "Proses Cepat", "Jaminan Aman"]
    },
    {
        id: 13,
        name: "Suntik 1000 Followers TikTok",
        price: 35000,
        image: "https://via.placeholder.com/250x150/000000/ffffff?text=TikTok+Followers",
        features: ["1000 Followers Pasif", "Proses Cepat", "Jaminan Aman"]
    },
    {
        id: 14,
        name: "Suntik 1000 Followers Instagram",
        price: 30000,
        image: "https://via.placeholder.com/250x150/c13584/ffffff?text=IG+Followers",
        features: ["1000 Followers Pasif", "Proses Cepat", "Jaminan Aman"]
    }
];

let cart = [];

const header = document.querySelector('.main-header');
const productList = document.getElementById('product-list');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeBtn = document.querySelector('#checkout-modal .close-btn');
const checkoutForm = document.getElementById('checkout-form');
const summaryItemsContainer = document.getElementById('summary-items');
const finalTotalElement = document.getElementById('final-total');

// Efek scroll header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Render produk ke halaman
function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
            <ul class="features">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
        </div>
    `).join('');
}

// Tambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Hapus produk dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update tampilan keranjang
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = '';
    
    if (cart.length > 0) {
        emptyCartMessage.style.display = 'none';
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Harga: Rp ${item.price.toLocaleString('id-ID')}</p>
                        <p>Jumlah: ${item.quantity}</p>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">&times;</button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    } else {
        emptyCartMessage.style.display = 'block';
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;

    checkoutBtn.disabled = cart.length === 0;
}

// Buka/tutup sidebar keranjang
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
});

// Tutup sidebar saat klik di luar
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Event listener untuk tombol "Tambah ke Keranjang"
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Event listener untuk tombol "Hapus" di keranjang
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

// Buka modal checkout
checkoutBtn.addEventListener('click', () => {
    summaryItemsContainer.innerHTML = cart.map(item => `
        <p>${item.name} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
    `).join('');
    
    const finalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    finalTotalElement.textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;
    
    checkoutModal.style.display = 'block';
});

// Tutup modal checkout
closeBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

// Handle form checkout (SEKARANG MENGARAH KE WHATSAPP)
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerPhone = document.getElementById('customer-phone').value;
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Membuat pesan WhatsApp yang terisi otomatis
    let whatsappMessage = `Halo SylfaStore, saya ingin memesan akun premium.\n\n`;
    whatsappMessage += `*Nama:* ${customerName}\n`;
    whatsappMessage += `*Email:* ${customerEmail}\n`;
    whatsappMessage += `*Nomor WA:* ${customerPhone}\n\n`;
    whatsappMessage += `*Rincian Pesanan:*\n`;
    cart.forEach(item => {
        whatsappMessage += `- ${item.name} (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    whatsappMessage += `\n*Total Akhir:* Rp ${total.toLocaleString('id-ID')}\n\n`;
    whatsappMessage += `Mohon info cara pembayarannya. Terima kasih! 😊`;
    
    // Encode pesan agar aman untuk URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Nomor WhatsApp tujuan
    const phoneNumber = '0895386863049';
    
    // Membuat link WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Mengarahkan pengguna ke link WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Tutup modal setelah mengarahkan ke WhatsApp (opsional)
    checkoutModal.style.display = 'none';
    
    // Membersihkan keranjang setelah pesanan
    cart = [];
    updateCart();
    checkoutForm.reset();
});

// Inisialisasi
renderProducts();
updateCart();