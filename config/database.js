import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cruddb.sjtnhpv.mongodb.net/CrudDB?retryWrites=true&w=majority&appName=CrudDB"
    );
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
