import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in fetching the products: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ succes: false, message: "Pease provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating a product: ", error.message);
    console.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Product CANNOT BE Deleted: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const delProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      // If no product is found with the given ID
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Successfully deleted the product
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
