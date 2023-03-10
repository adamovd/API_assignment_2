const express = require("express");
const {
  createCart,
  getAllCarts,
  addItemToCart,
  deleteItemFromCart,
  deleteCartById,
} = require("../controllers/cartController");
const router = express.Router();

router.get("/", getAllCarts);
router.post("/", createCart);
router.post("/:cartId", addItemToCart);
router.put("/:cartId", deleteItemFromCart);
router.delete("/:cartId", deleteCartById);
module.exports = router;
