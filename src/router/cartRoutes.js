const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const {validateAccessToken} = require("../middeleware/auth")

router.post('/addToCart', validateAccessToken, cartController.addToCart);
router.get('/getUserCart', validateAccessToken, cartController.getUserCart);
router.put('/updateCartByProductId/:productId', validateAccessToken, cartController.updateCartByProductId);
router.delete('/deleteCartById/:productId', validateAccessToken, cartController.deleteCartById);

module.exports = router;