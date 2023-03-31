const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

// aws
const { sendEmail } = require('../helpers/ses-helper');

const createToken = (_id, email, role) => {
    return jwt.sign({_id, email, role}, process.env.SECRET, { expiresIn: '7d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password, localStorageCartId } = req.body;
  
    try {
      const user = await User.login(email, password);
  
      if (!user.cart && localStorageCartId) {
        const localStorageCart = await Cart.findById(localStorageCartId);
        if (localStorageCart) {
          user.cart = localStorageCart._id;
          await user.save();
        }
      }
      else if (user.cart && localStorageCartId) {
        const userCart = await Cart.findById(user.cart);
        const localStorageCart = await Cart.findById(localStorageCartId);
        if (userCart && localStorageCart) {
          const mergedCart = await mergeCarts(userCart, localStorageCart);
          user.cart = mergedCart._id;
          await user.save();
        }
      }
  
      // create a token
      const token = createToken(user._id, user.email, user.role);
  
      const role = user.role;
  
      const id = user._id;
  
      const cart = user.cart;
  
      const emailConfirmed = user.emailConfirmed;
  
      if (role) {
        res.status(200).json({ id, email, token, cart, role, emailConfirmed });
      } else {
        res.status(200).json({ id, email, cart, token, emailConfirmed });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const mergeCarts = async (userCart, localStorageCart) => {
    const mergedCartItems = [...userCart.cartItems];
  
    for (const localStorageItem of localStorageCart.cartItems) {
      const existingItem = mergedCartItems.find(
        (item) => item.product.toString() === localStorageItem.product.toString()
      );
  
      if (existingItem) {
        existingItem.quantity += localStorageItem.quantity;
      } else {
        mergedCartItems.push(localStorageItem);
      }
    }
  
    userCart.cartItems = mergedCartItems;
  
    userCart.subtotal = mergedCartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  
    await userCart.save();
  
    await Cart.findByIdAndDelete(localStorageCart._id);
  
    return userCart;
  };
  

// signup user
const signupUser = async (req, res) => {
    const {email, password, localStorageCartId} = req.body

    try {
        // Generate a unique token
        const confirmationToken = crypto.randomBytes(32).toString('hex');
        const user = await User.signup(email, password, confirmationToken);

        if(localStorageCartId) {
            const localStorageCart = await Cart.findById(localStorageCartId);
            if (localStorageCart) {
                user.cart = localStorageCart._id;
                await user.save();
            }
        }

        const confirmationLink = `http://localhost:3000/confirm-account/${confirmationToken}`;
        
        const emailParams = {
            from: process.env.USER_SIGNUP_CONFIRMATION_EMAIL,
            to: user.email,
            subject: 'Confirm Your Account',
            html: `<p>Welcome to Mantra Seeds!</p><p>Please click on the following link, or paste it into your browser to confirm your account:</p><p><a href="${confirmationLink}">${confirmationLink}</a></p>`
        };

        await sendEmail(emailParams);

        // create a token
        const token = createToken(user._id, user.email);

        const id = user._id;
        const emailConfirmed = user.emailConfirmed;

        res.status(200).json({id, email, token, emailConfirmed});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
  
const fetchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('email role cart order emailConfirmed');;
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


const requestResetPassword = async (req, res) => {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email" });
    }
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Generate a unique token
        const token = crypto.randomBytes(32).toString('hex');

        // Save the token and its expiration time (1 hour) in the user's document
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Create a password reset link containing the token
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Send the password reset link to the user's email
        const emailParams = {
            from: process.env.PASSWORD_RESET_EMAIL,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p>Please click on the following link, or paste it into your browser to complete the process:</p><p><a href="${resetLink}">${resetLink}</a></p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        };

        await sendEmail(emailParams);
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};

const checkResetPasswordToken = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }
        return res.status(200).json({ message: 'Valid token' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ error: 'Password not strong enough' });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const isMatch = await bcrypt.compare(newPassword, user.password);
        if (isMatch) {
            return res.status(400).json({ error: 'New password cannot be the same as old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};

const confirmAccount = async (req, res) => {
    const { token } = req.params;
  
    try {
    const user = await User.findOne({ confirmationToken: { $exists: true, $ne: null, $eq: token } });

    if (!user) {
        return res.status(400).json(error);
    }
  
      user.emailConfirmed = true;
      user.confirmationToken = null;
      await user.save();

      const emailConfirmed = user.emailConfirmed;
      res.status(200).json({ emailConfirmed}); 
    } catch (error) {
      res.status(500).json(error);
    }
  };

module.exports = { 
    loginUser, 
    signupUser, 
    fetchUser, 
    fetchUsers, 
    changePassword, 
    requestResetPassword, 
    resetPassword, 
    checkResetPasswordToken,
    confirmAccount, 
};