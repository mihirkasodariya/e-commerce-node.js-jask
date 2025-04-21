const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { productImage } = require('../utils/commonFunctions')
const { validateAccessToken, authorizeRoles } = require("../middeleware/auth")


router.post('/addCategory', validateAccessToken, authorizeRoles("admin"), productController.addCategory);
router.put('/updateCategoryById/:id', validateAccessToken, authorizeRoles("admin"), productController.updateCategoryById);
router.get('/categoriesList', validateAccessToken, authorizeRoles("admin"), productController.categoriesList);
router.get('/getCategorieById/:id', validateAccessToken, authorizeRoles("admin"), productController.getCategorieById);


router.post('/addProducts', productImage.fields([{ name: 'image' }]), validateAccessToken, authorizeRoles("admin"), productController.addProducts);
router.get('/products', validateAccessToken, productController.productsList);
router.get('/products/:id', validateAccessToken, productController.getProductById);
router.put('/products/:id', productImage.fields([{ name: 'image' }]), validateAccessToken, authorizeRoles("admin"), productController.updateProduct);
router.delete('/deleteProductById/:id', validateAccessToken, authorizeRoles("admin"), productController.deleteProductById);

module.exports = router;