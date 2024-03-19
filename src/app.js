import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import messageModel from "./models/messages.js";
import indexRouter from "./routes/indexRouter.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import session from "express-session";

//declaraciones
const app = express();
const PORT = 8080;

//server
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const io = new Server(server);

//conexion db
//vFB3E6yt554v8CUN
mongoose
  .connect(
    "mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log(e));

//Middlewares

app.use(express.json());
app.use(
  session({
    secret: "coderSecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("claveSecreta"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", indexRouter);

//Routes Cookies
app.get("/setCookie", (req, res) => {
  res
    .cookie("CookieCookie", "Esto es una cookie :)", {
      maxAge: 3000000,
      signed: true,
    })
    .send("Cookie creada");
});
app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("CookieCookie").send("Cookie eliminada");
  //res.cookie('CookieCokie', '', { expires: new Date(0) })
});

//sesion Routes

app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.counter) {
    req.session.counter++;
    req.send(
      `Sos el usuario N° ${req.session.counter} en ingresar a la página`
    );
  } else {
    req.session.counter = 1;
    req.send("Sos el primer usuario que ingresa a la pagina");
  }
});

app.get("/login", (req, res) => {
  const { email, password } = req.body;
  if (email == "admin@admin.com" && password == "1234") {
    req.session.email = email;
    req.session.password = password;
  }
  console.log(req.session);
  res.send("Login");
});

io.on("connection", (socket) => {
  console.log("Conexión con Socket.io");

  socket.on("mensaje", async (mensaje) => {
    try {
      await messageModel.create(mensaje);
      const mensajes = await messageModel.find();
      io.emit("mensajeLogs", mensajes);
    } catch (e) {
      io.emit("mensajeLogs", e);
    }
  });
});
