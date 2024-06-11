import express from "express";
import { getAllProducts } from "../controllers/productsController.js";

const demoRoutes = express.Router();
demoRoutes.get("/demo", getAllProducts);

export default demoRoutes;
