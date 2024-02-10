import { promises as fs } from "fs";
import crypto from "crypto";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async addProduct(producto) {
    //VALIDAR QUE TODOS LOS DATOS SE HAYAN INGRESADO
    const requiredFields = ["title", "description", "price", "code", "stock", "category"];
    const missingFields = requiredFields.filter((field) => !producto[field]);

    if (missingFields.length > 0) {
      return console.log(
        `Faltan campos obligatorios: ${missingFields.join(", ")}`
      );
    }
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existe = productos.findIndex((prod) => prod.id == producto.id);
    //existe el producto en el array
    if (existe != -1) {
      productos[existe].stock += producto.stock;
      return `Productos agregados al stock existente, stock:  ${productos[existe].stock}`;
    } else {
      producto.id = crypto.randomBytes(10).toString("hex");
      producto.status = true;
      producto.thumbnail = [];
      productos.push(producto);
      await fs.writeFile(this.path, JSON.stringify(productos));
      return "Producto agregado satisfactoriamente";
    }
  }
  async getProducts() {
    //devolver arreglo con productos
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return productos;
  }
  async getProductById(id) {
    //buscar en el arreglo el producto que coincida con el id
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const existe = productos.find((prod) => prod.id === id);
    return existe;
  }
  async updateProduct(id, campo) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = productos.findIndex((prod) => prod.id === id);

    if (indice != -1) {
      productos[indice] = {
        ...productos[indice],
        ...campo,
      };
      await fs.writeFile(this.path, JSON.stringify(productos));
      return `Producto actualizado correctamente`;
    } else {
      return "Producto no existente";
    }
  }
  async deleteProduct(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = productos.findIndex((prod) => prod.id === id);
    if (indice != -1) {
      productos.splice(indice, 1);
      await fs.writeFile(this.path, JSON.stringify(productos));
      return "Producto eliminado correctamente";
    } else {
      return "Producto no existente";
    }
  }
}
