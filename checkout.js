// Checkout button functionality
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before checkout.");
    } else {
        const totalCost = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const cartItems = encodeURIComponent(JSON.stringify(cart));
        window.location.href = `checkoutpage.html?cartItems=${cartItems}&totalCost=${totalCost}`;
    }
});
