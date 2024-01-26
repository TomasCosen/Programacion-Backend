import { ProductManager } from "./ProductManager.js";


const manager = new ProductManager("./productos.json");
/* //Test 1
console.log("Test 1:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
}); */

/* //Test 2
console.log("Test 2:");
manager.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
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
