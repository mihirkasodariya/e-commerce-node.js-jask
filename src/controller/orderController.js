const { orderModel, orderValidation, getOrderValidation } = require('../model/orderModel');
const response = require('../utils/response');

module.exports.placeOrder = async (req, res) => { 
    const { name, cartItems, paymentMethod, shippingAddress, mobile, email, billingAddress } = req.body;  

    const { error } = orderValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        let totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const order = await orderModel.create({
            userId: req.user.id, 
            name,
            items: cartItems,
            paymentMethod,
            shippingAddress,
            mobile,
            email,
            billingAddress,
            totalAmount,
          });

        return response.success(res, 201, 'Order placed successfully', { order });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.getAllUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; 
        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

        if(!orders || orders?.length === 0) {
            return response.error(res, 403, 'No orders found');
        };

        return response.success(res, 200, 'Orders retrieved successfully', { orders });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.getOrderById = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { error } = getOrderValidation.validate(req.params);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const order = await orderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return response.error(res, 403, 'Order not found.');
        };

        return response.success(res, 200, 'Order retrieved successfully', { order });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};



