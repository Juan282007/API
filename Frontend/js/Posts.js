async function getAllPosts() {
    const posts = await fetchData(`${BASE_URL}/posts`);
    renderPosts(posts);
}

async function getFindByIdPost() {
    const id = document.getElementById("idFilter").value;
    if (!id) return getAllPosts();
    const post = await fetchData(`${BASE_URL}/posts/${id}`);
    renderPosts([post]);
}

async function createPost() {
    const body = {
        title: document.getElementById("new_title").value,
        body: document.getElementById("new_body").value,
    };
    await fetchData(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllPosts();
}

async function updatePost(id) {
    const body = {
        title: document.getElementById(`title_${id}`).value,
        body: document.getElementById(`body_${id}`).value,
    };
    await fetchData(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    getAllPosts();
}

async function deletePost(id) {
    if (!confirm("¿Eliminar?")) return;
    await fetchData(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
    getAllPosts();
}

function renderPosts(posts) {
    document.getElementById("container").innerHTML = posts.map(p => `
        <tr>
            <td>${p.id}</td>
            <td><input id="title_${p.id}" value="${p.title}" class="form-control form-control-sm"></td>
            <td><input id="body_${p.id}" value="${p.body}" class="form-control form-control-sm"></td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="updatePost('${p.id}')">Guardar</button>
                <button class="btn btn-sm btn-danger" onclick="deletePost('${p.id}')">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

getAllPosts();