import crypto from "crypto";
import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async addProduct(producto) {
    //VALIDAR QUE TODOS LOS DATOS SE HAYAN INGRESADO
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    const missingFields = requiredFields.filter((field) => !producto[field]);

    if (missingFields.length > 0) {
      return console.log(
        `Faltan campos obligatorios: ${missingFields.join(", ")}`
      );
    }
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existe = productos.findIndex((prod) => prod.code == producto.code);
    //existe el producto en el array
    if (existe != -1) {
      productos[existe].stock += producto.stock;
      console.log(
        "Productos agregados al stock existente, stock: ",
        productos[existe].stock
      );
    } else {
      producto.id = crypto.randomBytes(10).toString("hex");
      productos.push(producto);
      console.log("Producto agregado satisfactoriamente: \n", producto);
    }
    await fs.writeFile(this.path, JSON.stringify(productos));
  }
  async getProducts() {
    //devolver arreglo con productos
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return productos;
  }
  async getProductById(id) {
    //buscar en el arreglo el producto que coincida con el id
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existe = productos.find((prod) => prod.code === id);

    if (existe) {
      console.log("Producto Encontrado: ", existe);
    } else {
      console.log("Not Found");
    }
  }
  async updateProduct(id, campo) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = productos.findIndex((prod) => prod.code === id);

    if (indice != -1) {
      productos[indice] = {
        ...productos[indice],
        ...campo,
      };
      await fs.writeFile(this.path, JSON.stringify(productos));
      console.log("Producto actualizado: ", productos[indice]);
    } else {
      console.log("Not Found");
    }
  }
  async deleteProduct(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = productos.findIndex((prod) => prod.code === id);

    if (indice != -1) {
      productos.splice(indice, 1);
      await fs.writeFile(this.path, JSON.stringify(productos));
      console.log("Producto Eliminado");
    } else {
      console.log("Not Found");
    }
  }
}

const manager = new ProductManager("./productos.json");

/* //Test 1
console.log("Test 1:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
});

//Test 2
console.log("Test 2:");
manager.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 10,
});

//Test 3
console.log("Test 3:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
});

//Test 4
console.log("Test 4:");
manager.addProduct({
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

//Test 5
console.log("Test 5:");
manager.getProductById("producto_no_existente");

//Test 6
console.log("Test 6:");
manager.getProductById("abc123");

//Test 7
console.log("Test 7:");
manager.updateProduct("abc123", { price: 250 });

//Test 8
console.log("Test 8:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
});

//Test 9
console.log("Test 9:");
manager.deleteProduct("abc123");

//Test 10
console.log("Test 10:");
manager.getProducts().then((productos) => {
  console.log("Productos: ", productos);
});
*/
