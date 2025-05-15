const express = require("express");
const {
  getAllProducts,
  createProduct,
  UpdateProduct,
  deleteproduct,
} = require("../controllers/productControllers");
const authenticateJWT = require("../middlewares/tokenjwt");
const isAdmin = require("../middlewares/isAdmin");

const productRoute = express.Router();

//GetAllProducts=> Méthode GET
productRoute.get("/", authenticateJWT, isAdmin, getAllProducts);

//CreateProduct=> Méthode POST
productRoute.post("/createproduct", authenticateJWT, createProduct);
//UpdateProduct=> Méthode PUT
productRoute.put("/updateproduct/:id", UpdateProduct);
//DeleteProduct=> Méthode DELETE
productRoute.delete("/deleteproduct/:id", deleteproduct);

module.exports = productRoute;
