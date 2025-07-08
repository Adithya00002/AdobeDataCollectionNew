// Responsive Navbar Toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Back to Top button functionality
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});


// Products Data (for Shop and Index pages)
const products = [
    {
        id: 'f1',
        img: 'img/products/f1.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f2',
        img: 'img/products/f2.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f3',
        img: 'img/products/f3.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f4',
        img: 'img/products/f4.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f5',
        img: 'img/products/f5.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f6',
        img: 'img/products/f6.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f7',
        img: 'img/products/f7.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'f8',
        img: 'img/products/f8.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n1',
        img: 'img/products/n1.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n2',
        img: 'img/products/n2.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n3',
        img: 'img/products/n3.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n4',
        img: 'img/products/n4.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n5',
        img: 'img/products/n5.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n6',
        img: 'img/products/n6.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n7',
        img: 'img/products/n7.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
    {
        id: 'n8',
        img: 'img/products/n8.jpg',
        brand: 'Adidas',
        name: 'Cartoon Astronaut T-Shirts',
        price: 78,
    },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let couponApplied = false; // Variable to track coupon status

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    // Re-render cart table if on the cart page to reflect changes immediately
    if (document.getElementById('cart-table-body')) {
        renderCartTable();
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector('#lg-bag a');
    if (cartIcon) {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.classList.add('cart-badge');
            cartIcon.appendChild(badge);
        }
        badge.textContent = totalItems;
        badge.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
        `;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Existing addToCart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            cart[productId] = { ...product, quantity: 1 };
        }
        saveCart();

        // --- ADD THIS SECTION FOR ADOBE ANALYTICS TRACKING ---
        // Populate digitalData for the product added event
        window.digitalData = window.digitalData || {};
        window.digitalData.product = window.digitalData.product || {};
        window.digitalData.product.id = product.id;
        window.digitalData.product.name = product.name;
        window.digitalData.product.brand = product.brand;
        window.digitalData.product.price = product.price;

        // Fire the custom event
        _satellite.track('productAdded'); // Make sure your Tags rule listens for 'productAdded'
        console.log("Adobe Analytics: _satellite.track('productAdded') fired!");
        // --- END ADOBE ANALYTICS TRACKING SECTION ---
    }
}

function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        saveCart();
        renderCartTable(); // Ensure the table is re-rendered after removal
    }
}

function updateCartQuantity(productId, quantity) {
    if (cart[productId]) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[productId].quantity = quantity;
            saveCart();
            renderCartTable(); // Ensure the table is re-rendered after quantity update
        }
    }
}

function renderCartTable() {
    const cartTableBody = document.querySelector('#cart-table-body');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartShippingElement = document.getElementById('cart-shipping');
    const cartTotalElement = document.getElementById('cart-grand-total');

    if (!cartTableBody || !cartSubtotalElement || !cartShippingElement || !cartTotalElement) return;

    cartTableBody.innerHTML = '';
    let subtotal = 0;

    for (const productId in cart) {
        const item = cart[productId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" class="remove-item-btn" data-product-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.img}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="cart-quantity-input" data-product-id="${item.id}"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
        subtotal += item.price * item.quantity;
    }

    const shipping = subtotal > 0 ? 15.00 : 0.00; // Example shipping cost
    let total = subtotal + shipping;

    // Apply coupon discount if active
    if (couponApplied) {
        total *= 0.50; // 50% off
    }

    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    cartShippingElement.textContent = `$${shipping.toFixed(2)}`;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.currentTarget.dataset.productId;
            removeFromCart(productId);
        });
    });

    // Add event listeners for quantity inputs
    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.currentTarget.dataset.productId;
            const newQuantity = parseInt(event.currentTarget.value);
            updateCartQuantity(productId, newQuantity);
        });
    });
}

// Function to apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input'); // Ensure your HTML has an element with ID 'coupon-input'
    if (!couponInput) return;

    const couponCode = couponInput.value.trim().toUpperCase();

    // --- ADD THIS SECTION FOR ADOBE ANALYTICS TRACKING ---
    // Populate digitalData for coupon attempt
    window.digitalData = window.digitalData || {};
    window.digitalData.transaction = window.digitalData.transaction || {};
    window.digitalData.transaction.couponCode = couponCode;
    window.digitalData.transaction.couponStatus = (couponCode === 'CODE50') ? 'Applied' : 'Invalid'; // Based on your JS logic

    // Fire the custom event
    _satellite.track('couponAttempt'); // Make sure your Tags rule listens for 'couponAttempt'
    console.log("Adobe Analytics: _satellite.track('couponAttempt') fired for code: " + couponCode);
    // --- END ADOBE ANALYTICS TRACKING SECTION ---

    if (couponCode === 'CODE50') {
        couponApplied = true;
        alert('Coupon "CODE50" applied! You get 50% off.');
    } else {
        couponApplied = false;
        alert('Invalid coupon code. Please try again.');
    }
    saveCart();
}
// Function to render products on index and shop pages
function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    productList.forEach(product => {
        const proDiv = document.createElement('div');
        proDiv.classList.add('pro');
        proDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>$${product.price.toFixed(2)}</h4>
            </div>
            <a href="#" class="add-to-cart-btn" data-product-id="${product.id}"><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>
        `;
        container.appendChild(proDiv);
    });

    // Add event listeners for "add to cart" buttons
    document.querySelectorAll(`#${containerId} .add-to-cart-btn`).forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = event.currentTarget.dataset.productId;
            addToCart(productId);
        });
    });
}

// Blog Posts Data
const blogPosts = [
    {
        id: 'blog1',
        img: 'img/blog/b1.jpg',
        title: 'The Cotton-Blend Sweatshirt',
        snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dignissimos exercitationem voluptatem quod earum dicta provident nam iure libero odit!',
        date: '13/01',
        link: 'sblog.html?blogId=blog1'
    },
    {
        id: 'blog2',
        img: 'img/blog/b2.jpg',
        title: 'How To Style a Quiff',
        snippet: 'Discover the secrets to styling a perfect quiff, from product selection to technique, for a timeless look.',
        date: '15/02',
        link: 'sblog.html?blogId=blog2'
    },
    {
        id: 'blog3',
        img: 'img/blog/b3.jpg',
        title: 'Must-Have Accessories for Every Man',
        snippet: 'Elevate your style with these essential accessories that every man should own, from watches to belts.',
        date: '20/03',
        link: 'sblog.html?blogId=blog3'
    },
    {
        id: 'blog4',
        img: 'img/blog/b4.jpg',
        title: 'A Guide to Picking the Right Jeans',
        snippet: 'From slim fit to relaxed, find out how to choose the perfect pair of jeans that flatter your body type.',
        date: '01/04',
        link: 'sblog.html?blogId=blog4'
    },
    {
        id: 'blog5',
        img: 'img/blog/b5.jpg',
        title: 'The Ultimate Sneaker Care Guide',
        snippet: 'Keep your sneakers looking fresh and new with these simple tips for cleaning and maintenance.',
        date: '10/05',
        link: 'sblog.html?blogId=blog5'
    },
    {
        id: 'blog6',
        img: 'img/blog/b6.jpg',
        title: 'Spring Fashion Trends 2023',
        snippet: 'Stay ahead of the curve with our breakdown of the hottest spring fashion trends for the upcoming season.',
        date: '25/05',
        link: 'sblog.html?blogId=blog6'
    }
];

// Function to render blog posts on the blog page
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    blogContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const blogBox = document.createElement('div');
        blogBox.classList.add('blog-box');
        blogBox.innerHTML = `
            <div class="blog-img">
                <img src="${post.img}" alt="${post.title}">
            </div>
            <div class="blog-details">
                <h4>${post.title}</h4>
                <p>${post.snippet}</p>
                <a href="${post.link || '#'}">CONTINUE READING</a>
            </div>
            <h1>${post.date}</h1>
        `;
        blogContainer.appendChild(blogBox);
    });
}

// Initial calls based on the current page
document.addEventListener('DOMContentLoaded', () => {
    // For index.html
    if (document.getElementById('product-container-featured')) {
        renderProducts('product-container-featured', products.slice(0, 8));
    }
    if (document.getElementById('product-container-new-arrivals')) {
        renderProducts('product-container-new-arrivals', products.slice(8, 16));
    }

    // For shop.html
    if (document.getElementById('shop-product-container')) {
        renderProducts('shop-product-container', products);
    }

    // For cart.html - This block contains logic ONLY relevant to the cart page
    if (document.getElementById('cart-table-body')) {
        renderCartTable(); // Renders the cart table on cart.html

        // Add event listener for coupon button only on the cart page
        const applyCouponBtn = document.querySelector('#coupon button');
        if (applyCouponBtn) {
            const couponInput = document.querySelector('#coupon input');
            if (couponInput) {
                couponInput.id = 'coupon-input';
            }
            applyCouponBtn.addEventListener('click', applyCoupon);
        }

        // --- Checkout Purchase Tracking Code --- (Specific to cart.html where the checkout button is)
        const checkoutButton = document.querySelector('#subtotal .checkout-btn');

        if (checkoutButton) {
            checkoutButton.addEventListener('click', function(event) {
                if (typeof cart === 'undefined' || Object.keys(cart).length === 0) {
                    console.warn("Cart is empty or not available. Cannot send purchase event.");
                    alert('Cart is empty!');
                    return;
                }

                let purchaseItems = [];
                for (const productId in cart) {
                    const item = cart[productId];
                    purchaseItems.push({
                        item_id: item.id,
                        item_name: item.name,
                        item_brand: item.brand,
                        price: item.price,
                        quantity: item.quantity
                    });
                }

                const subtotalElement = document.getElementById('cart-subtotal');
                const shippingElement = document.getElementById('cart-shipping');
                const grandTotalElement = document.getElementById('cart-grand-total');

                const subtotal = parseFloat(subtotalElement ? subtotalElement.textContent.replace('$', '') : 0);
                const shipping = parseFloat(shippingElement ? shippingElement.textContent.replace('$', '') : 0);
                const grandTotal = parseFloat(grandTotalElement ? grandTotalElement.textContent.replace('$', '') : 0);

                // Send purchase event to Google Analytics
                gtag('event', 'purchase', {
                    transaction_id: 'T_' + Date.now() + Math.floor(Math.random() * 1000),
                    value: grandTotal,
                    currency: 'INR',
                    tax: (grandTotal - subtotal - shipping),
                    shipping: shipping,
                    items: purchaseItems
                });

                cart = {}; // Clear cart after purchase
                saveCart(); // Update local storage
                alert('Thanks for shopping with us!');
            });
        }
        // --- End Checkout Purchase Tracking Code ---
    } // End of cart.html specific block


    // New code for tracking cart icon clicks (these apply to any page with the cart icon)
    const cartIconLink = document.querySelector('#lg-bag a');
    const mobileCartIconLink = document.querySelector('#mobile a'); // Also track the mobile cart icon

    function trackCartClick(event) {
        // event.preventDefault(); // Uncomment if you want to delay navigation for tracking

        // Calculate total items at the moment of click
        const currentCartTotalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        const currentCartSubtotalValue = calculateCartSubtotal(); // Added for value tracking

        dataLayer.push({
            'event': 'cart_icon_click',
            'cart_items_count': currentCartTotalItems,
            'cart_total_value': currentCartSubtotalValue
        });

        // If you prevented default above, you'd re-direct here:
        // window.location.href = event.currentTarget.href;
    }

    if (cartIconLink) {
        cartIconLink.addEventListener('click', trackCartClick);
    }
    if (mobileCartIconLink) {
        mobileCartIconLink.addEventListener('click', trackCartClick);
    }

    // Helper function to calculate subtotal (if you want to send total value too)
    function calculateCartSubtotal() {
        return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    updateCartIcon(); // Ensure this is called initially to set up the badge


    // For blog.html
    if (document.getElementById('blog-container')) {
        loadBlogPosts();
    }

}); // This is the final closing brace for the main DOMContentLoaded event listener


// --- Contact Form Tracking Code ---
document.addEventListener('DOMContentLoaded', function() {
    // Get values AFTER the DOM is ready and elements are available
    let Nameval = document.getElementById('name');
    let Emailval = document.getElementById('email');
    let Subjectval = document.getElementById('subject'); // Corrected from Inq_cat based on contact.html
    let Messageval = document.getElementById('message');

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // For Adobe Analytics, we typically let the form submit naturally
            // unless you have an AJAX submission. If the page reloads, the beacon will be sent before the reload.

            // Populate digitalData for contact form submission
            window.digitalData = window.digitalData || {};
            window.digitalData.form = window.digitalData.form || {};
            window.digitalData.form.name = 'Contact Us Form';
            window.digitalData.form.id = 'contactForm';
            window.digitalData.form.inquiryCategory = Subjectval ? Subjectval.value : 'N/A'; // Using 'subject' as inquiry category
            window.digitalData.form.messageLength = Messageval ? Messageval.value.length : 0;
            window.digitalData.form.customerEmail = Emailval ? Emailval.value : 'N/A';

            // Fire the custom event
            _satellite.track('contactFormSubmit'); // Make sure your Tags rule listens for 'contactFormSubmit'
            console.log("Adobe Analytics: _satellite.track('contactFormSubmit') fired!");

            // Optional: If you want to prevent default form submission for debugging or AJAX
            // e.preventDefault();
        });
    }
});

