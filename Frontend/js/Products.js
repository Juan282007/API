// GET ALL
async function getAllProducts() {
    const products = await fetchData(`${BASE_URL}/products`);
    renderProducts(products);
}

// GET BY ID
async function getFindByIdProduct() {
    const id = document.getElementById("idFilter").value;
    if (!id) return getAllProducts();
    const product = await fetchData(`${BASE_URL}/products/${id}`);
    renderProducts([product]);
}

// CREATE
async function createProduct() {
    const body = {
        title: document.getElementById("new_title").value,
        price: parseFloat(document.getElementById("new_price").value),
    };
    await fetchData(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllProducts();
}

// UPDATE
async function updateProduct(id) {
    const body = {
        title: document.getElementById(`title_${id}`).value,
        price: parseFloat(document.getElementById(`price_${id}`).value),
    };
    await fetchData(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllProducts();
}

// DELETE
async function deleteProduct(id) {
    if (!confirm("¿Eliminar?")) return;
    await fetchData(`${BASE_URL}/products/${id}`, { method: "DELETE" });
    getAllProducts();
}

getAllProducts();