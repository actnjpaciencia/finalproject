let allProducts = []; // Store the fetched product data for global access

// Fetch product data from JSON file
fetch("adminjson.json")
    .then(response => response.json())
    .then(products => {
        allProducts = products; // Save the product list
        renderProducts(products); // Render the initial list
    })
    .catch(error => {
        console.error("Error loading products:", error);
        alert("Failed to load products. Please try again later.");
    });

// Function to render products in cards
const renderProducts = (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                data-id="${product.id}" 
                data-name="${product.name}" 
                data-price="${product.price}" 
                data-inventory="${product.inventory}" 
                data-details="${product.details}" 
                data-image="${product.image}">
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">Price: $${product.price}</p>
                <p class="product-inventory">Stock: ${product.inventory}</p>
                <button class="add-to-cart-btn" 
                    data-id="${product.id}" 
                    data-image="${product.image}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-inventory="${product.inventory}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Attach event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const { id, image, name, price, inventory } = event.target.dataset;
            addToCart({ id, image, name, price, inventory });
        });
    });

    // Attach event listeners to product images for modal
    document.querySelectorAll(".product-image").forEach(image => {
        image.addEventListener("click", (event) => {
            const { id, name, price, inventory, details, image: productImage } = event.target.dataset;
            openModal({ id, name, price, inventory, details, image: productImage });
        });
    });
};

const openModal = ({ id, name, price, inventory, details, image }) => {
    document.getElementById("modal-product-name").textContent = name;
    document.getElementById("modal-product-price").textContent = `Price: $${price}`;
    document.getElementById("modal-product-inventory").textContent = `Stock: ${inventory}`;
    
    // Add a new element for product details
    const detailsElement = document.getElementById("modal-product-details");
    if (detailsElement) {
        detailsElement.textContent = details;
    } else {
        // If the details element doesn't exist, create it
        const modalContent = document.querySelector(".modal-content");
        const newDetailsElement = document.createElement("p");
        newDetailsElement.id = "modal-product-details";
        newDetailsElement.textContent = details;
        modalContent.insertBefore(newDetailsElement, document.getElementById("modal-product-inventory").nextSibling);
    }

    document.getElementById("modal-product-image").src = image;

    const modal = document.getElementById("product-modal");
    modal.style.display = "block";
    modal.scrollTo({ top: 175, behavior: "smooth" });
};

// Close modal when clicking the close button
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("product-modal").style.display = "none";
});

// Close the modal if clicked outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("product-modal")) {
        document.getElementById("product-modal").style.display = "none";
    }
});