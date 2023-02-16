const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  const totalProductsInDatabase = await Product.countDocuments();

  return res.json({
    data: products,
    meta: {
      total: totalProductsInDatabase,
      count: products.length,
    },
  });
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  if (!product) throw new NotFoundError("☠️ This product does not exist!");

  return res.json(product);
};
