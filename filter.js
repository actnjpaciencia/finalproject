// Sorting functionality
document.getElementById("sort-select").addEventListener("change", (event) => {
    const sortValue = event.target.value;
    let sortedProducts = [...allProducts];

    switch (sortValue) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "productCode-asc":
            sortedProducts.sort((a, b) => a.productCode.localeCompare(b.productCode));
            break;
        case "productCode-desc":
            sortedProducts.sort((a, b) => b.productCode.localeCompare(a.productCode));
            break;
        default:
            break;
    }

    renderProducts(sortedProducts);
});

// Search functionality
document.getElementById("search-input").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.productCode.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
});
