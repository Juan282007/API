async function getAllCarts() {
    const carts = await fetchData(`${BASE_URL}/carts`);
    renderCarts(carts);
}

async function getFindByIdCart() {
    const id = document.getElementById("idFilter").value;
    if (!id) return getAllCarts();
    const cart = await fetchData(`${BASE_URL}/carts/${id}`);
    renderCarts([cart]);
}

async function createCart() {
    const carts = await fetchData(`${BASE_URL}/carts`);
    const numericIds = carts.map(c => parseInt(c.id)).filter(id => !isNaN(id));
    const lastId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const body = {
        id: lastId + 1,
        userId: parseInt(document.getElementById("new_userId").value),
        total: parseFloat(document.getElementById("new_total").value),
    };
    await fetchData(`${BASE_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllCarts();
}

async function updateCart(id) {
    const body = {
        userId: parseInt(document.getElementById(`userId_${id}`).value),
        total: parseFloat(document.getElementById(`total_${id}`).value),
    };
    await fetchData(`${BASE_URL}/carts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllCarts();
}

async function deleteCart(id) {
    if (!confirm("¿Eliminar?")) return;
    await fetchData(`${BASE_URL}/carts/${id}`, { method: "DELETE" });
    getAllCarts();
}

function renderCarts(carts) {
    document.getElementById("container").innerHTML = carts.map(c => `
        <tr>
            <td>${c.id}</td>
            <td><input id="userId_${c.id}" value="${c.userId}" type="number" class="form-control form-control-sm"></td>
            <td><input id="total_${c.id}" value="${c.total}" type="number" class="form-control form-control-sm"></td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="updateCart('${c.id}')">Guardar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCart('${c.id}')">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

getAllCarts();