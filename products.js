document.addEventListener('DOMContentLoaded', function () {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartPopup = document.getElementById('cart-popup');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartItems = {};
    let totalPrice = 0;

    function showPopUp(message, isError = false) {
        const popUp = document.createElement('div');
        popUp.className = `pop-up ${isError ? 'error' : ''}`;
        popUp.innerText = message;
        document.body.appendChild(popUp);

        setTimeout(() => {
            popUp.style.display = 'none';
            document.body.removeChild(popUp);
        }, 3000);
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        totalPrice = 0;
        Object.keys(cartItems).forEach(key => {
            const item = cartItems[key];
            totalPrice += item.price * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = parseFloat(productCard.querySelector('.price').innerText.replace('$', ''));
            const productKey = productName.replace(/\s+/g, '-').toLowerCase();

            if (!cartItems[productKey]) {
                cartItems[productKey] = { name: productName, price: productPrice, quantity: 0 };
            }
            cartItems[productKey].quantity++;
            cartCountElement.innerText = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
            showPopUp('Item added to cart!');
            updateCartDisplay();
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productKey = productName.replace(/\s+/g, '-').toLowerCase();

            if (cartItems[productKey]) {
                cartItems[productKey].quantity--;
                if (cartItems[productKey].quantity <= 0) {
                    delete cartItems[productKey];
                }
                cartCountElement.innerText = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
                showPopUp('Item removed from cart!');
            }
            updateCartDisplay();
        });
    });

    cartIcon.addEventListener('click', () => {
        cartPopup.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartPopup) {
            cartPopup.style.display = 'none';
        }
    });

    // Animation
    function animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 500);
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            animateCartIcon();
        });
    });
});
