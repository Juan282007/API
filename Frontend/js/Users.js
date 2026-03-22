async function getAllUsers() {
    const users = await fetchData(`${BASE_URL}/users`);
    renderUsers(users);
}

async function getFindByIdUser() {
    const id = document.getElementById("idFilter").value;
    if (!id) return getAllUsers();
    const user = await fetchData(`${BASE_URL}/users/${id}`);
    renderUsers([user]);
}

async function createUser() {
    const body = {
        firstName: document.getElementById("new_firstName").value,
        lastName: document.getElementById("new_lastName").value,
        email: document.getElementById("new_email").value,
    };
    await fetchData(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllUsers();
}

async function updateUser(id) {
    const body = {
        firstName: document.getElementById(`firstName_${id}`).value,
        lastName: document.getElementById(`lastName_${id}`).value,
        email: document.getElementById(`email_${id}`).value,
    };
    await fetchData(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllUsers();
}

async function deleteUser(id) {
    if (!confirm("¿Eliminar?")) return;
    await fetchData(`${BASE_URL}/users/${id}`, { method: "DELETE" });
    getAllUsers();
}

function renderUsers(users) {
    document.getElementById("container").innerHTML = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td><input id="firstName_${u.id}" value="${u.firstName}" class="form-control form-control-sm"></td>
            <td><input id="lastName_${u.id}" value="${u.lastName}" class="form-control form-control-sm"></td>
            <td><input id="email_${u.id}" value="${u.email}" class="form-control form-control-sm"></td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="updateUser('${u.id}')">Guardar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${u.id}')">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

getAllUsers();