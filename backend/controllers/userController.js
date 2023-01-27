const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id, email, role) => {
    return jwt.sign({_id, email, role}, process.env.SECRET, { expiresIn: '7d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id, user.email, user.role)

        const role = user.role

        const id = user._id

        const cart = user.cart

        if(role) {
            res.status(200).json({id, email, token, cart, role})
        } else {
            res.status(200).json({id, email, cart, token})  
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id, user.email)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const fetchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('email role cart order');;
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = { loginUser, signupUser, fetchUser }