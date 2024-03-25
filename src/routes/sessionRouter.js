import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Usuario o contraseña no validos");
      }
      req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
      };
      res.status(200).send("Usuario logueado correctamente");
    } catch (e) {
      res.status(500).send("error al loguearse", e);
    }
  }
);

sessionRouter.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      res.status(400).send("Ya existe un usuario con este mail");
    } else {
      await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password),
      });
      res.status(200).send("Usuario creado correctamente");
    }
  } catch (e) {
    res.status(500).send("Error al crear usuarios: ", e);
  }
});

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    if (e) {
      console.log(e);
    } else {
      res.status(200).redirect("/");
    }
  });
});

export default sessionRouter;
