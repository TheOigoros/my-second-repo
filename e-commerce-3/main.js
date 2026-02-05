// Navbar loader
function loadNavbar() {
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
        updateCartCount();
    });
}

// Sample products
const products = [
    {id: 1, name: "TV", price: 499, image: "assets/images/tv.jpg", description: "Smart LED TV", category: "electronics"},
    {id: 2, name: "Headphones", price: 199, image: "assets/images/headphones.jpg", description: "Noise Cancelling Headphones", category: "electronics"},
    {id: 3, name: "Sofa", price: 799, image: "assets/images/sofa.jpg", description: "Comfortable 3-seater Sofa", category: "furniture"},
    {id: 4, name: "T-Shirt", price: 25, image: "assets/images/tshirt.jpg", description: "Cotton T-Shirt", category: "clothing"},
    {id: 5, name: "Laptop", price: 1200, image: "assets/images/laptop.jpg", description: "Gaming Laptop", category: "electronics"},
    {id: 6, name: "Dining Table", price: 350, image: "assets/images/dining-table.jpg", description: "Wooden Dining Table", category: "furniture"},
    {id: 7, name: "Jacket", price: 60, image: "assets/images/jacket.jpg", description: "Winter Jacket", category: "clothing"},
    {id: 8, name: "Smartphone", price: 999, image: "assets/images/smartphone.jpg", description: "Latest Smartphone", category: "electronics"},
    {id: 9, name: "Bookshelf", price: 120, image: "assets/images/bookshelf.jpg", description: "5-tier Bookshelf", category: "furniture"},
    {id: 10, name: "Sneakers", price: 80, image: "assets/images/sneakers.jpg", description: "Running Shoes", category: "clothing"},
];








// Category filter buttons
function setupCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');
            // Filter products
            displayProducts(btn.dataset.category);
        });
    });
}



// Display products
function displayProducts(filterCategory = "all") {
    currentCategory = filterCategory;

    const container = document.getElementById('products-container');
    container.innerHTML = ""; // clear previous content

    const filteredProducts = filterCategory === "all" ? products : products.filter(p => p.category === filterCategory);

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}" class="product-image">
            <h3>${p.name}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <div class="product-buttons">
                <button onclick="addToCart(${p.id})" class="add-cart-btn">Add to Cart</button>
                <button onclick="viewProduct(${p.id})" class="view-more-btn">View </button>
            </div>
        `;
        container.appendChild(div);
    });

    renderPagination(filteredProducts.length);
}



//paginations
let currentPage = 1;
const productsPerPage = 4; // Number of products per page
let currentCategory = "all";

//paginations byttons
function renderPagination(totalProducts) {
    const container = document.getElementById('pagination-container') || document.createElement('div');
    container.id = 'pagination-container';
    container.className = 'pagination';
    container.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'page-btn active' : 'page-btn';
        btn.addEventListener('click', () => {
            currentPage = i;
            displayProducts(currentCategory);
        });
        container.appendChild(btn);
    }

    if (!document.getElementById('pagination-container')) {
        document.getElementById('products-container').after(container);
    }
}





function viewProduct(productId) {
    const product = products.find(p => p.id === Number(productId));
    if (!product) return;

    const container = document.getElementById('products-container');
    container.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button onclick="addToCart(${product.id})" class="add-cart-btn">Add to Cart</button>
                <button onclick="displayProducts()" class="back-btn">Back to Products</button>
            </div>
        </div>
    `;
}




// Cart functions
function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.map(item => ({
        id: Number(item.id),
        quantity: Number(item.quantity) || 1
    }));
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === Number(productId));
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({id: Number(productId), quantity: 1});
    }
    saveCart(cart);
    alert("Added to cart!");
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) cartCountElem.textContent = count;
}






// Display cart with update/remove buttons
function displayCart() {
    const container = document.getElementById('cart-container');
    container.innerHTML = "<h1>Your Cart</h1>";

    const cart = getCart();
    if (cart.length === 0) {
        container.innerHTML += "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === Number(item.id));
        if (!product) return;

        const subtotal = product.price * item.quantity;
        total += subtotal;

        const div = document.createElement('div');
        div.innerHTML = `
            <p>
                ${product.name} x 
                <button onclick="changeQuantity(${product.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${product.id}, 1)">+</button>
                = $${subtotal}
                <button onclick="removeItem(${product.id})">Remove</button>
            </p>
        `;
        container.appendChild(div);
    });

    container.innerHTML += `<h3>Total: $${total}</h3>`;
    container.innerHTML += `<button onclick="checkout()">Checkout</button>`;
}



// Change quantity
function changeQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        // Remove item if quantity <= 0
        const index = cart.findIndex(i => i.id === productId);
        cart.splice(index, 1);
    }
    saveCart(cart);
    displayCart();
}

// Remove item
function removeItem(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    displayCart();
}

// Checkout - show simple form
function checkout() {
    const container = document.getElementById('cart-container');
    container.innerHTML = `
        <h2>Checkout</h2>
        <form id="checkout-form">
            <label>Name: <input type="text" name="name" required></label><br><br>
            <label>Email: <input type="email" name="email" required></label><br><br>
            <label>Address: <input type="text" name="address" required></label><br><br>
            <button type="submit">Place Order</button>
        </form>
    `;
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateReceipt(new FormData(form));
    });
}

// Generate receipt
// Generate styled receipt
function generateReceipt(formData) {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let total = 0;

    // Build receipt HTML
    let receipt = `
    <div id="receipt" style="
        max-width: 500px; 
        margin: 20px auto; 
        padding: 20px; 
        border: 1px solid #333; 
        font-family: 'Courier New', monospace; 
        background: #f9f9f9;
    ">
        <h2 style="text-align:center;">MyStore Receipt</h2>
        <p><strong>Name:</strong> ${formData.get('name')}</p>
        <p><strong>Email:</strong> ${formData.get('email')}</p>
        <p><strong>Address:</strong> ${formData.get('address')}</p>
        <hr>
        <table style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border-bottom:1px solid #333; text-align:left;">Product</th>
                    <th style="border-bottom:1px solid #333; text-align:right;">Qty</th>
                    <th style="border-bottom:1px solid #333; text-align:right;">Price</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        const product = products.find(p => p.id === Number(item.id));
        if (!product) return;
        const subtotal = product.price * item.quantity;
        total += subtotal;

        receipt += `
            <tr>
                <td>${product.name}</td>
                <td style="text-align:right;">${item.quantity}</td>
                <td style="text-align:right;">$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    receipt += `
            </tbody>
        </table>
        <hr>
        <h3 style="text-align:right;">Total: $${total.toFixed(2)}</h3>
        <p style="text-align:center;">Thank you for your purchase!</p>
        <div style="text-align:center; margin-top: 20px;">
            <button onclick="window.print()" style="
                padding: 10px 20px; 
                background: #28a745; 
                color: white; 
                border: none; 
                cursor: pointer;
            ">Print Receipt</button>
        </div>
    </div>
    `;

    const container = document.getElementById('cart-container');
    container.innerHTML = receipt;

    // Clear cart
    saveCart([]);
}








// Add test items manually
//localStorage.setItem('cart', JSON.stringify([{id: 1, quantity: 2},{id:2,quantity:1}]));

// Refresh cart.html