# API Assignment 1

This was the second assignemnt on the course _API-Development_ at _Medieinstitutet_. The mission was to create a shopping cart api, where you can create a cart, add items to the cart, remove or decrease an item in the cart and delete the cart.

### Technologies

- REST API
- NodeJS
- MongoDB
- ExpressJS

### Routes

**Products**

- GET "/api/v1/products/", getAllProducts
- GET "/api/v1/products/:productId", getProductById

**Carts**

- GET "/api/v1/carts/", getAllCarts
- POST "/api/v1/carts/", createCart
- POST "/api/v1/carts/:cartId", addItemToCart, (req.body = productId & quantity)
- PUT "/api/v1/carts/:cartId", deleteItemFromCart, (req.body = productId & quantity)
- DELETE "/api/v1/carts/:cartId", deleteCartById
