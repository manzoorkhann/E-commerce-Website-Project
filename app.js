let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');

const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.querySelector('h3').innerText;
    const productPrice = productElement.querySelector('p').innerText;

 
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


function updateCartUI() {
    cartCount.innerText = cart.length;
    
    
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


    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}


function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    cart = cart.filter(product => product.id !== productId);
    updateCartUI();
}
