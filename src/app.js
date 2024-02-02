import express from "express";
import { ProductManager } from "./config/ProductManager.js";

const app = express();
const PORT = 8000;
const productManager = new ProductManager("./src/data/productos.json");

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const prods = await productManager.getProducts();
  let limite = parseInt(limit) 
  if(!limite){
    limite = prods.length
  }
  const prodsLimit = prods.slice(0, limit)
  res.send(prodsLimit)
});
app.get('/products/:pid', async (req, res) => {
  const idProducto = req.params.pid;
  const prod = await productManager.getProductById(idProducto);
  res.send(prod);
  

});

app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`)
})
/* //Test 1
console.log("Test 1:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
}); */

/* //Test 2
console.log("Test 2:");
productManager.addProduct({
  title: "producto prueba3",
  description: "este es un producto prueba",
  price: 600,
  thumbnail: "sin imagen",
  code: "fgh234",
  stock: 10,
}); */

/* //Test 3
console.log("Test 3:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
}); */

/* //Test 4
console.log("Test 4:");
manager.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
}); */

/* //Test 5
console.log("Test 5:");
manager.getProductById("producto_no_existente"); */

/* //Test 6
console.log("Test 6:");
manager.getProductById("abc123"); */

/* //Test 7
console.log("Test 7:");
manager.updateProduct("abc123", { price: 250 }); */

/* //Test 8
console.log("Test 8:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
}); */

/* //Test 9
console.log("Test 9:");
manager.deleteProduct("abc123");  */

/* //Test 10
console.log("Test 10:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
}); */
