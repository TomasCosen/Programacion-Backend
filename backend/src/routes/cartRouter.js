import { Router } from "express";
import { createCart, getCart, insertProductCart, createTicket } from "../controllers/cartController";

const cartRouter = Router();

cartRouter.post("/", createCart)

cartRouter.get("/:cid", getCart)

cartRouter.post("/:cid/:pid", insertProductCart)

cartRouter.post('/:cid/purchase', createTicket)

export default cartRouter;
