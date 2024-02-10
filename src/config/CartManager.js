import { promises as fs } from "fs";
export class CartManager {
  constructor(path) {
    this.products = path;
  }
  async getCart() {
    const cart = JSON.parse(await fs.readFile(this.products, "utf-8"));
    return cart;
  }
  async addProductByCart(idProducto, quantityParam) {
    const cart = JSON.parse(await fs.readFile(this.products, "utf-8"));

    const existe = cart.findIndex((product) => product.id == idProducto);
    if (existe != -1) {
      cart[existe].quantity += quantityParam;
    } else {
      const prod = { id: idProducto, quantity: quantityParam };
      cart.push(prod);
    }
    await fs.writeFile(this.products, JSON.stringify(cart));
    return "Producto cargado correctamente";
  }
}
