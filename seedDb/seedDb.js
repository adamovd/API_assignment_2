require("dotenv").config();
const mongoose = require("mongoose");
const Cart = require("../src/models/Cart");
const Product = require("../src/models/Product");
const { mockProductData } = require("./products");

const populateDbWithMockData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`🎇 MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    const productRes = await Product.create(mockProductData);

    console.log("Database succesfully populated with products");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGO_CONNECTION_STRING);
