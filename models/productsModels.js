import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
    },
    image: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
