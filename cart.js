let cart = []; // Array to store products added to the cart

// Function to add product to cart
const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Display a temporary message
    showTemporaryMessage(`${product.name} has been added to your cart!`);
};

// Function to show a temporary message
const showTemporaryMessage = (message) => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.classList.add("notification");

    document.body.appendChild(notification);

    // Remove the notification after 0.5 seconds with a fade-out effect
    setTimeout(() => {
        notification.classList.add("notification-hidden");
        notification.addEventListener("transitionend", () => {
            document.body.removeChild(notification);
        });
    }, 500);
};

// Increment quantity
const incrementQuantity = (index) => {
    cart[index].quantity++;
    openCartModal();
};

// Decrement quantity
const decrementQuantity = (index) => {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    openCartModal();
};

// Remove item from cart
const removeFromCart = (index) => {
    cart.splice(index, 1);
    openCartModal();
};
