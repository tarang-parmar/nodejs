import fs from "fs";
import path from "path";
import Product from "../models/productsModels.js";
import { getFilePaths } from "../config/Utils.js";

const createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const image =
      req.files.length > 0
        ? req.files.map((item) => {
            return `${process.env.IMAGE_URI}${item?.filename}` || null;
          })
        : [];
    const product = await Product.create({
      name,
      quantity,
      price,
      image,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req?.files?.length > 0) {
      const newImage = req?.files?.map((item) => {
        return `${process.env.IMAGE_URI}${item?.filename}` || null;
      });
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Product not found",
          data: null,
        });
      }

      if (existingProduct?.image?.length > 0) {
        existingProduct?.image?.forEach((image) => {
          const oldImagePath = path.join(
            getFilePaths(import.meta.url),
            "../uploads/images",
            image?.split("/")?.pop()
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      }

      updateData.image = newImage;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
