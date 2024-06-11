import express from "express";
import upload from "../config/multerConfig.js";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productsController.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import { validateProductInput } from "../schemas/productSchema.js";

const productRoutes = express.Router();
productRoutes.post(
  "/product",
  validateProductInput,
  upload.array("image"),
  createProduct
);
productRoutes.get("/products", authenticateToken, getAllProducts);
productRoutes.get("/product/:id", getProductById);
productRoutes.put("/product/:id", upload.array("image"), updateProductById);
productRoutes.delete("/product/:id", deleteProductById);

export default productRoutes;
