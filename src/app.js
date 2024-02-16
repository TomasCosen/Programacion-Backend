import express from "express";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";
import upload from "./config/multer.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";

//declaraciones
const app = express();
const PORT = 8080;

//server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

//Middlewares
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const io = new Server(server);
//Routes
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/products", productsRouter, express.static(__dirname + "/public"));
app.use("/api/cart", cartRouter);

app.post("/upload", upload.single("product"), (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send("imagen cargada correctamente");
  } catch (e) {
    res.status(500).send("Error al cargar imagen");
  }
});
