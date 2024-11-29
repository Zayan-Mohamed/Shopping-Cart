import express from "express";
import Product from "../models/product.model.js";
import {
  createProducts,
  delProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProducts);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", delProduct);

export default router;
