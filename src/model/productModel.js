const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const categoryMastersSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: ""},
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const categoryMastersModel = mongoose.model('categorymasters ', categoryMastersSchema);

const categoryValidation = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'Product Name must be a string',
        'string.empty': 'Product Name is required',
        'string.min': 'Product Name must be at least 2 characters',
        'string.max': 'Product Name must be at most 50 characters'
    }),
    description: Joi.string().min(1).max(50).optional().messages({
        'string.base': 'Product Description must be a string',
        'string.empty': 'Product Description cannot be empty',
        'string.min': 'Product Description must be at least 1 character',
        'string.max': 'Product Description must be at most 50 characters'
    }),
    isActive: Joi.boolean().default(true)
});


const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categorymasters' },
    image: [{ type: String }],
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, { timestamps: true });

const productModel = mongoose.model('products', productSchema);

const productValidation = Joi.object({
    name: Joi.string().min(3).max(200).required().messages({
        'string.base': 'Product Name must be a string',
        'string.empty': 'Product Name is required',
        'string.min': 'Product Name must be at least 3 characters',
        'string.max': 'Product Name must be at most 200 characters'
    }),
    description: Joi.string().max(2000).optional().allow("").messages({
        'string.base': 'Product Description must be a string',
        'string.max': 'Product Description must be at most 2000 characters'
    }),
    price: Joi.number().precision(2).positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    categoryId: Joi.string().required().messages({
        'string.base': 'Category ID must be a string',
        'any.required': 'Category ID is required'
    }),
    image: Joi.array().items(Joi.string()).optional(),
    sku: Joi.string().required().messages({
        'string.base': 'SKU must be a string',
        'any.required': 'SKU is required'
    }),
    stock: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Stock must be a number',
        'number.min': 'Stock cannot be negative'
    }),
    quantity: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1'
    }),
    rating: Joi.number().min(0).max(5).default(0).messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating cannot be less than 0',
        'number.max': 'Rating cannot be more than 5'
    }),
    isActive: Joi.boolean().optional(),
    idDelete: Joi.boolean().optional()

});

const updateProductValidation = Joi.object({
    name: Joi.string().min(3).max(200).required().messages({
        'string.base': 'Product Name must be a string',
        'string.empty': 'Product Name is required',
        'string.min': 'Product Name must be at least 3 characters',
        'string.max': 'Product Name must be at most 200 characters'
    }),
    description: Joi.string().max(2000).optional().allow("").messages({
        'string.base': 'Product Description must be a string',
        'string.max': 'Product Description must be at most 2000 characters'
    }),
    price: Joi.number().precision(2).positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    categoryId: Joi.string().required().messages({
        'string.base': 'Category ID must be a string',
        'any.required': 'Category ID is required'
    }),
    image: Joi.array().items(Joi.string()).optional(),
    stock: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Stock must be a number',
        'number.min': 'Stock cannot be negative'
    }),
    quantity: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1'
    }),
    rating: Joi.number().min(0).max(5).default(0).messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating cannot be less than 0',
        'number.max': 'Rating cannot be more than 5'
    }),
    isActive: Joi.boolean().optional()
});
module.exports = {
    categoryMastersModel,
    categoryValidation,
    productModel, 
    productValidation,
    updateProductValidation
};
