import crypto from 'crypto'

class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct(producto){
        //VALIDAR QUE TODOS LOS DATOS SE HAYAN INGRESADO
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock']
        const missingFields = requiredFields.filter(field => !producto[field])

        if(missingFields.length > 0) {
            return console.log(`Faltan campos obligatorios: ${missingFields.join(', ')}`)
        }
        //validar que no se repita el campo "code"
        const existe = this.products.some(prod => prod.code === producto.code)

        //existe el producto en el array
        if(existe){
            return console.log("Producto ya existente");
        }else{
            producto.id = crypto.randomBytes(10).toString('hex')
            this.products.push(producto)
            console.log("Producto agregado satisfactoriamente: ", producto)
        }
    }
    getProducts(){
        //devolver arreglo con productos
        return this.products
    }
    getProductById(id){
        //buscar en el arreglo el producto que coincida con el id
        const existe = this.products.find(prod => prod.code === id)

        if(existe){
            console.log("Producto Encontrado: ", existe)
        }else{
            console.log("Not Found")
        }

    }
}

const manager = new ProductManager();

//Test 1
console.log("Test 1:")
console.log(manager.getProducts());

//Test 2
console.log("Test 2:")
manager.addProduct({
    title: "producto prueba",
    description: "este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,
});

//Test 3 
console.log("Test 3:")
console.log(manager.getProducts());

//Test 4
console.log("Test 4:")
manager.addProduct({
    title: "producto prueba",
    description: "este es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,
});

//Test 5 
console.log("Test 5:")
manager.getProductById("producto_no_existente");

//Test 6
console.log("Test 6:")
manager.getProductById("abc123")