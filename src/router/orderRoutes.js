const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const {validateAccessToken} = require("../middeleware/auth")

router.post('/placeOrder', validateAccessToken, orderController.placeOrder);
router.get('/getAllUserOrders', validateAccessToken, orderController.getAllUserOrders);
router.get('/getOrderById/:id', validateAccessToken, orderController.getOrderById);

module.exports = router;