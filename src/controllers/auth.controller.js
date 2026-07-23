const userModel = require("../models/users.model.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// user registration controller
const UserRegisterController = async (req, res) => {
    const { email, name, password } = req.body;
    const existingUser = await userModel.findOne({ 
        email:email
    });
    if (existingUser) {
        return res.status(422).json({ message: "User already exists" , status:"failed"});
    }
    const newUser = new userModel({
        email,
        name,
        password
    });
    const token=jwt.sign({userID:newUser._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)
    res.status(201).json({ 
        user: {
            email: newUser.email,
            name: newUser.name,
            _id: newUser._id
        },
        message: "User registered successfully", status:"success",token:token });
    // Handle register logic here
}

module.exports = { UserRegisterController }
