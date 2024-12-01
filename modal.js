// Function to render the cart modal
const openCartModal = () => {
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='empty-cart-message'>Your cart is empty.</p>";
        checkoutBtn.style.display = "none";
    } else {
        cart.forEach((product, index) => {
            cartItems.innerHTML += `
                <div class="cart-item" style="position: relative;">
                    <button class="cart-item-remove" data-index="${index}">×</button>
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${product.name}</p>
                        <p class="cart-item-price">Price: $${(product.price * product.quantity).toFixed(2)}</p>
                        <div class="cart-item-quantity-controls">
                            <span>Quantity:</span>
                            <button class="decrement-btn" data-index="${index}">-</button>
                            <span class="cart-item-quantity">${product.quantity}</span>
                            <button class="increment-btn" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
            `;
        });
        checkoutBtn.style.display = "inline-block";
    }

    cartModal.style.display = "block";

    // Attach event listeners to cart item controls
    document.querySelectorAll(".increment-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            incrementQuantity(index);
        });
    });

    document.querySelectorAll(".decrement-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            decrementQuantity(index);
        });
    });

    document.querySelectorAll(".cart-item-remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            removeFromCart(index);
        });
    });
};

// Function to close cart modal
const closeCartModal = () => {
    document.getElementById("cart-modal").style.display = "none";
};

// Close cart modal on clicking outside or "×" button
window.onclick = function(event) {
    const modal = document.getElementById("cart-modal");
    if (event.target === modal) {
        closeCartModal();
    }
};

document.getElementById("close-cart-modal").addEventListener("click", closeCartModal);
document.getElementById("cart-btn").addEventListener("click", openCartModal);
