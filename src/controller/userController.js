const { userModel, userRegisterValidation, userLoginValidation } = require('../model/userModel');
const { generateJWToken } = require("../middeleware/auth")

const response = require('../utils/response');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    const { fname, lname, email, mobile, password, gender, profilePhoto } = req.body;
    console.log("BODY:", req.body);
    const { error } = userRegisterValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists?.email) {
            return response.error(res, 409, 'User Alredy Register', {});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const createNewUser = new userModel({
            ...req.body,
            profilePhoto: req.file?.filename,
            password: hashedPassword
        });
        await createNewUser.save();
        const token = await generateJWToken({ _id: createNewUser._id });
        return response.success(res, 200, 'User Register Successfully', { _id: createNewUser._id, token: token });
    } catch (error) {
        console.error(error);
        return response.error(res, 500, 'Oops! Something went wrong. Our team is looking into it.', {});
    };
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = userLoginValidation.validate(req.body);
    if (error) {
        return response.error(res, 400, error.details[0].message);
    };
    try {
        const user = await userModel.findOne({ email, isActive: true });
        if (!user) {
            return response.error(res, 403, 'Account not found. Please check the email entered.');
        };
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return response.error(res, 401, 'Incorrect password. Please try again.');
        };
        const token = await generateJWToken({ id: user._id });
        return response.success(res, 200, 'You have successfully logged in', { _id: user._id, token: token });

    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};

module.exports.profile = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user.id }).select('-password');
        if (!user) {
            return response.error(res, 403, 'User not found.');
        };
        return response.success(res, 200, 'Retrieve user profile successful', { user });
    } catch (err) {
        console.error(err);
        return response.error(res, 500, 'Something went wrong. Please try again later.');
    };
};

