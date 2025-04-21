const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));
router.use('/admin/product', require('./productRoutes'));
router.use('/user/cart', require('./cartRoutes'));
router.use('/user/order', require('./orderRoutes'));
router.use('/user/wishlist', require('./wishlistRoutes'));

module.exports = router;