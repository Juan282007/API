const fs = require("fs");

const products = JSON.parse(fs.readFileSync("../../Backend/js/products.json"));
const users = JSON.parse(fs.readFileSync("../../Backend/js/users.json"));
const posts = JSON.parse(fs.readFileSync("../../Backend/js/posts.json"));
const carts = JSON.parse(fs.readFileSync("../../Backend/js/carts.json"));

const db = {
  products: products.products || products,
  users: users.users || users,
  posts: posts.posts || posts,
  carts: carts.carts || carts
};

fs.writeFileSync("../../Backend/db/db.json", JSON.stringify(db, null, 2));

console.log("db.json creado correctamente");