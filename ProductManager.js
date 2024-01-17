import crypto from 'crypto'

class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct(producto){
        //VALIDAR QUE TODOS LOS DATOS SE HAYAN INGRESADO

        const index = this.products.findIndex(prod = prod.code === producto.code)
        const existe = this.products.includes(prod => prod.code === producto.code)
        //existe el producto en el array
        if(index != -1){
            return console.log("Producto ya existente");
        }else{
            producto.id = crypto.randomBytes(10).toString('hex')
            this.products.push(producto)
        }
    }
}