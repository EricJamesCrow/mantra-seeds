const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
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

const fetchUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(404).json({ error: "Users not found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// change password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    if (oldPassword === newPassword) {
        return res.status(400).json({ error: "New password cannot be the same as old password" });
    }

    if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ error: 'Password not strong enough' });
    }

    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
          };

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        
        // create a new jwt token
        const id = user._id;
        const cart = user.cart;
        const email = user.email;
        const role = user.role;
        const token = createToken(id, email, role);
        
        if(role) {
            return res.status(200).json({message: 'Password changed successfully', user: {id, email, cart, token, role}});
        } else {
            return res.status(200).json({message: 'Password changed successfully', user: {id, email, cart, token}});
        }
    } catch (error) {
        res.status(400).json({error: 'Server error'});
    }
};

module.exports = { loginUser, signupUser, fetchUser, fetchUsers, changePassword };