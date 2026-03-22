function renderProducts(products) {
    const tbody = document.getElementById("container");
    tbody.innerHTML = "";
 
    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><input id="title_${p.id}" value="${p.title}" class="form-control form-control-sm"></td>
                <td><input id="price_${p.id}" value="${p.price}" type="number" class="form-control form-control-sm"></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="updateProduct('${p.id}')">Guardar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
 