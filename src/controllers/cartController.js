const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { NotFoundError } = require("../utils/errors");

exports.getAllCarts = async (req, res, nex) => {
  const carts = await Cart.find();
  const totalCartsInDatabase = await Cart.countDocuments();

  return res.json({
    data: carts,
    meta: {
      total: totalCartsInDatabase,
      count: carts.length,
    },
  });
};

exports.createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create({});

    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
      )
      .status(201)
      .json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("☠️ Something went wrong! ☠️");
  }
};

exports.addItemToCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);
  if (!cart) throw new NotFoundError("☠️ This cart does not exist!");

  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("☠️ This product does not exist!");
  const items = cart.items;

  const productInfo = {
    productId: productId,
    articleNumber: product.articleNumber,
    name: product.name,
    description: product.description,
    quantity: quantity,
    price: product.price,
    total: product.price * quantity,
  };

  const foundItem = items.find((item) => item.productId == productId);

  if (items.length >= 1) {
    if (foundItem) {
      foundItem.quantity += quantity;
      foundItem.total = foundItem.price * foundItem.quantity;
    } else {
      items.push(productInfo);
    }
  } else {
    items.push(productInfo);
  }

  cart.totalAmount += productInfo.total * quantity;

  const updatedCart = await cart.save();

  return res.status(201).json(updatedCart);
};

exports.deleteItemFromCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);
  if (!cart) throw new NotFoundError("☠️ This cart does not exist!");

  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("☠️ This product does not exist!");
  const items = cart.items;

  const foundItem = items.find((item) => item.productId == productId);
  if (foundItem) {
    if (foundItem.quantity > 1) {
      foundItem.quantity -= quantity;
      foundItem.total = foundItem.price * foundItem.quantity;
    } else {
      items.splice(foundItem, 1);
    }
  } else {
    throw new NotFoundError("☠️ This product does not exist in this cart!");
  }

  cart.totalAmount -= foundItem.price / quantity;

  const updatedCart = await cart.save();

  return res.status(201).json(updatedCart);
};

exports.deleteCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cartToDelete = await Cart.findById(cartId);
  if (!cartToDelete) throw new NotFoundError("☠️ This cart does not exist!");

  await cartToDelete.delete();

  return res.sendStatus(204);
};
