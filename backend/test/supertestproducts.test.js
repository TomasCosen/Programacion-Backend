import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import { __dirname } from "../src/path.js";

const expect = chai.expect;

await mongoose.connect(
  `mongodb+srv://tomascosentino123:vFB3E6yt554v8CUN@cluster0.we7yzrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const requester = supertest("http://localhost:8080");

describe("Test CRUD de Productos en la runa api/products", function () {
  it("Ruta: api/products metodo GET", async () => {
    const { ok } = await requester.get("/api/products");
    expect(ok).to.be.ok;
  });

  it("Ruta: api/products metodo POST", async () => {
    const newProduct = {
      title: "Queso muzzarella",
      stock: 25,
      code: "Q1",
      price: "9500",
      category: "comida",
      description: "Rico pero no tan saludable",
    };
    const { statusCode, _body, ok } = await requester
      .post("/api/products")
      .send(newProduct);
    //expect(ok).to.be.ok;
    expect(statusCode).to.be.equal(201);
    //expect(_body.status).to.be.equal('success')
  });

  it("Ruta: api/products metodo PUT", async () => {
    const id = "65ea8714a7f0b8549e4514ea";
    const updateProduct = {
      price: 2400,
    };
    const { statusCode } = await requester
      .put(`/api/products/${id}`)
      .send(updateProduct);
    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/products metodo DELETE", async () => {
    const id = "65ea8714a7f0b8549e4514ea";
    const { statusCode } = await requester.delete(`/api/products/${id}`);
    expect(statusCode).to.be.equal(200);
  });
});
