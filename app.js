// JavaScript for E-Commerce Website

// Cart array to store added items
let cart = [];

// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Select cart elements
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Add event listeners to each "Add to Cart" button
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to add products to the cart
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.querySelector('h3').innerText;
    const productPrice = productElement.querySelector('p').innerText;

    // Add product to cart
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.push(product);
    }

    updateCartUI();
}

// Function to update the cart display
function updateCartUI() {
    cartCount.innerText = cart.length;
    
    // Clear cart items display
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${product.name} - ${product.price} (Qty: ${product.quantity})</span>
                <button class="remove-from-cart" data-id="${product.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Add event listeners to Remove buttons
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Function to remove products from the cart
function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    cart = cart.filter(product => product.id !== productId);
    updateCartUI();
}
