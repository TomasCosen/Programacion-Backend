import crypto from "crypto";

import { promises as fs } from "fs";

export class ProductManager {
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
      return(
        "Productos agregados al stock existente, stock: ",
        productos[existe].stock
      );
    } else {
      producto.id = crypto.randomBytes(10).toString("hex");
      productos.push(producto);
      await fs.writeFile(this.path, JSON.stringify(productos));
      return("Producto agregado satisfactoriamente: \n", producto);
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
    const existe = productos.find((prod) => prod.code === id);

    if (existe) {
      return existe
    } else {
      return "Producto no existe"
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
      return("Producto actualizado: ", productos[indice]);
    } else {
      return("Not Found");
    }
  }
  async deleteProduct(id) {
    const productos = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = productos.findIndex((prod) => prod.code === id);

    if (indice != -1) {
      productos.splice(indice, 1);
      await fs.writeFile(this.path, JSON.stringify(productos));
      return("Producto Eliminado");
    } else {
      return("Not Found");
    }
  }
}