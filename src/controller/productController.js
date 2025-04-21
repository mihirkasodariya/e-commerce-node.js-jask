const response = require('../utils/response');
const { categoryMastersModel, categoryValidation, productModel, productValidation, updateProductValidation } = require('../model/productModel')

module.exports.addCategory = async (req, res) => {
    const { name, description } = req.body;
    const { error } = categoryValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const categoryExists = await categoryMastersModel.findOne({ name: name });
        if (categoryExists) {
            return response.error(res, 409, 'Category already exists', {});
        };
        const createNewCategory = new categoryMastersModel({
            ...req.body,
        });
        await createNewCategory.save();
        return response.success(res, 200, 'Category created successfully', { createNewCategory });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.updateCategoryById = async (req, res) => {
    const { name, description, isActive } = req.body;
    const { id } = req.params
    const { error } = categoryValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const categoryExists = await categoryMastersModel.findById({ _id: id });
        if (!categoryExists) {
            return response.error(res, 403, 'Category not found', {});
        };
        const updatedData = {
            name,
            description,
            isActive
        };

        const updatedCategory = await categoryMastersModel.findByIdAndUpdate(id, updatedData, { new: true });
        return response.success(res, 200, 'Category Updated successfully', { updatedCategory });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.categoriesList = async (req, res) => {
    try {
        const categories = await categoryMastersModel.find({});

        if (!categories || categories.length === 0) {
            return response.error(res, 404, 'No categories found.');
        };
        return response.success(res, 200, 'Categories fetched successfully', { categories });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.getCategorieById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryMastersModel.findById({_id : id});

        if (!category) {
            return response.error(res, 404, 'Category not found.');
        };
        return response.success(res, 200, 'Category fetched successfully.', { category });
    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};

module.exports.productsList = async (req, res) => {
    try {
        const products = await productModel.find({ isDelete : false});
        console.log('products', products)
        if (!products) {
            return response.error(res, 403, 'No products available at the moment.');
        };
        return response.success(res, 200, 'Product list fetched successfully', { products });
    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};

module.exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById({ _id: id });
        if (!product) {
            return response.error(res, 403, 'No product available at the moment.');
        };
        return response.success(res, 200, 'Product fetched successfully.', { product });
    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};

module.exports.addProducts = async (req, res) => {
    const { name, description, price, categoryId, image, sku, stock, quantity, rating } = req.body;

    const { error } = productValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const existingProduct = await productModel.findOne({ sku: sku });
        if (existingProduct) {
            return response.error(res, 409, 'Product with this SKU already exists');
        };
        const fileNames = req?.files?.image?.map(file => file.filename);
        console.log(fileNames);
        const createnewProduct = new productModel({
            ...req.body,
            image: fileNames
        });
        await createnewProduct.save();
        return response.success(res, 200, 'Product added successfully', { createnewProduct });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};


module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name, description, price, categoryId, image, stock, quantity, isActive } = req.body;

    const { error } = updateProductValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const productToUpdate = await productModel.findOne({ _id: id });
        if (!productToUpdate) {
            return response.error(res, 403, 'Product not found');
        };

        const { sku, rating } = productToUpdate;
        const updatedData = {
            name,
            description,
            price,
            categoryId,
            stock,
            quantity,
            image: req?.files?.image ? req?.files?.image.map(file => file.filename) : productToUpdate.image,
            isActive
        };

        updatedData.sku = sku;
        updatedData.rating = rating;

        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
        return response.success(res, 200, 'Product updated successfully', { updatedProduct });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.deleteProductById = async (req, res) => {
    const { isDelete } = req.body;
    const {id} = req.params;
    try {
        const user = await productModel.findById({ _id : id });
        if (!user) {
            return response.error(res, 403, 'Product not found.');
        };
        const updatedData = {
            isDelete
        };
        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
        return response.success(res, 200, 'Product has been deleted successfully.', { updatedProduct });
    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};


