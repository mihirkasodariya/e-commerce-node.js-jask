const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    userId: {  type: Schema.Types.ObjectId, ref: 'users', required: true  },
    name: { type: String, required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }], 
    paymentMethod: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String,  required: true},
    billingAddress: { type: String },
    totalAmount: { type: Number,  required: true, min: 1},
    status: { type: String,default: 'Processing', required: true},
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const orderModel = mongoose.model('orders', orderSchema);
const itemValidation = Joi.object({
    productId: Joi.string().length(24).required().messages({
      'string.base': 'Product ID must be a string',
      'string.length': 'Product ID must be a valid 24-character ObjectId',
      'any.required': 'Product ID is required'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required'
    }),
    price: Joi.number().min(0).required().messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),
  });
  
  const orderValidation = Joi.object({
   name: Joi.string().min(1).required().messages({
        'string.base': 'fullname must be a string',
        'string.empty': 'fullname is required',
        'string.min': 'fullname must be at least 1 characters long',
        'any.required': 'fullname is required'
      }),
      cartItems: Joi.array().items(itemValidation).min(1).required().messages({
      'array.base': 'cartItems must be an array',
      'array.min': 'At least one item is required',
      'any.required': 'cartItems are required'
    }),
    paymentMethod: Joi.string().valid('Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery').required().messages({
      'string.base': 'Payment Method must be a string',
      'any.only': 'Payment Method must be one of: Credit Card, Debit Card, PayPal, or Cash on Delivery',
      'any.required': 'Payment Method is required'
    }),
    shippingAddress: Joi.string().min(5).required().messages({
      'string.base': 'Shipping Address must be a string',
      'string.empty': 'Shipping Address is required',
      'string.min': 'Shipping Address must be at least 5 characters long',
      'any.required': 'Shipping Address is required'
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Please provide a valid 10-digit mobile number',
      'any.required': 'Mobile number is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    billingAddress: Joi.string().min(5).required().messages({
      'string.base': 'Billing Address must be a string',
      'string.min': 'Billing Address must be at least 5 characters',
      'any.required': 'Billing Address is required'
    }),
    status: Joi.string().valid('Processing', 'Shipped', 'Delivered', 'Cancelled').default('Processing'),
    isActive: Joi.boolean().default(true)
  });



  const getOrderValidation = Joi.object({
    id: Joi.string().length(24).required().messages({
        'string.base': 'Order ID must be a string',
        'string.empty': 'Order ID is required',
        'string.min': 'Order ID must be at least 1 characters long',
        'any.required': 'Order ID is required'
      })
  });
module.exports = {
    orderModel,
    orderValidation,
    getOrderValidation
};
