const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

// aws
const { sendEmail } = require('../helpers/mailgun-helper');

const createToken = (_id, email, role) => {
    return jwt.sign({_id, email, role}, process.env.SECRET, { expiresIn: '7d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password, localStorageCartId } = req.body;
  
    try {
      const user = await User.login(email, password);

      if(user.isBanned) {
        return res.status(400).json({ error: 'Your account has been banned.' });
        }

      user.lastLoggedIn = new Date();
      await user.save();
  
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

        const confirmationLink = `${process.env.WEBSITE_URL}/confirm-account/${confirmationToken}`;
        
        const emailParams = {
            from: process.env.USER_SIGNUP_CONFIRMATION_EMAIL,
            to: user.email,
            subject: 'Confirm Your Account',
            html: `<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Password Reset</title>
                <style>
                    body, h1 {
                        margin: 0;
                        padding: 0;
                        font-family: 'Arial', sans-serif; /* Use a web-safe font as fallback */
                    }
                </style>
            </head>
            <body>
                <table width='100%' style='background: #637748; padding: 0 12px; height: 78px;'>
                    <tr>
                        <td>
                            <h1 style='font-size: 24px; color: #FAFAFA;'>MANTRA SEEDS</h1>
                        </td>
                        <td align='right'>
                            <img src='${process.env.CLOUDFRONT_URL}/meditating.svg' style='filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); width: 55px; height: 55px;'/>
                        </td>
                    </tr>
                </table>
                <table width='100%' style='text-align: center; background: #C2C5A2; padding: 24px 12px;'>
                    <tr>
                        <td>
                            <h1>Confirm Your Account</h1>
                            <p style='padding: 12px 24px; word-wrap: break-word; font-size: 20px;'>Welcome to Mantra Seeds!</p>
                            <a href='${confirmationLink}' style='color: #fff; background: #456649; border-radius: 8px; text-decoration: none; word-wrap: break-word; padding: 12px; margin: 4px; display: inline-block;'>Click here to confirm</a>
                            <p style='padding: 12px 24px; word-wrap: break-word; font-size: 20px;'>If you did not sign up for an account with Mantra Seeds, it's possible that someone else entered your email address by mistake. Please disregard this email or contact our support team if you have any concerns</p>
                        </td>
                    </tr>
                </table>
                <table width='100%' style='background: #456649; padding: 24px; text-align: center; color: #fff;'>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/about-us" style="color: #fff; text-decoration: none;">About Us</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/privacy-policy" style="color: #fff; text-decoration: none;">Privacy Policy</a>
                        </td>
                    </tr>                    
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://www.instagram.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/instagram.svg' alt='Instagram' style='width: 40px; margin-right: 10px;' />
                            </a>
                            <a href="https://www.facebook.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/facebook.svg' alt='Facebook' style='width: 40px; margin-right: 10px;' />
                            </a>
                            <a href="https://www.twitter.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/twitter.svg' alt='Twitter' style='width: 40px;' />
                            </a>
                        </td>
                    </tr>
                    <tr>
                    <td style='margin-top: 12px; font-size: 16px;'>© 2023 Mantra Seeds</td>
                </tr>
            </table>
        </body>
        </html>`
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

        const usersWithOrderCount = [];

        for (const user of users) {
            const orders = await Order.find({ user: user._id });
            const orderCount = orders.length;
            let mostRecentOrder = null;
            let totalSpent = 0;

            if (orderCount > 0) {
                orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                mostRecentOrder = orders[0]._id;
                
                totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
            }

            const userWithOrderCount = {
                ...user.toObject(),
                orderCount,
                mostRecentOrder,
                totalSpent
            };

            usersWithOrderCount.push(userWithOrderCount);
        }

        res.status(200).json(usersWithOrderCount);
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
        const resetLink = `${process.env.WEBSITE_URL}/reset-password/${token}`;

        // Send the password reset link to the user's email
        const emailParams = {
            from: process.env.PASSWORD_RESET_EMAIL,
            to: user.email,
            subject: 'Password Reset',
            html: `<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Password Reset</title>
                <style>
                    body, h1 {
                        margin: 0;
                        padding: 0;
                        font-family: 'Arial', sans-serif; /* Use a web-safe font as fallback */
                    }
                </style>
            </head>
            <body>
                <table width='100%' style='background: #637748; padding: 0 12px; height: 78px;'>
                    <tr>
                        <td>
                            <h1 style='font-size: 24px; color: #FAFAFA;'>MANTRA SEEDS</h1>
                        </td>
                        <td align='right'>
                            <img src='${process.env.CLOUDFRONT_URL}/meditating.svg' style='filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); width: 55px; height: 55px;'/>
                        </td>
                    </tr>
                </table>
                <table width='100%' style='text-align: center; background: #C2C5A2; padding: 24px 12px;'>
                    <tr>
                        <td>
                            <h1>Password Reset</h1>
                            <p style='padding: 12px 24px; word-wrap: break-word; font-size: 20px;'>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                            <a href='${resetLink}' style='color: #fff; background: #456649; border-radius: 8px; text-decoration: none; word-wrap: break-word; padding: 12px; margin: 4px; display: inline-block;'>Reset Password</a>
                            <p style='padding: 12px 24px; word-wrap: break-word; font-size: 20px;'>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                        </td>
                    </tr>
                </table>
                <table width='100%' style='background: #456649; padding: 24px; text-align: center; color: #fff;'>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/about-us" style="color: #fff; text-decoration: none;">About Us</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://mantra-seeds.com/privacy-policy" style="color: #fff; text-decoration: none;">Privacy Policy</a>
                        </td>
                    </tr>                    
                    <tr>
                        <td style="padding-bottom: 12px;">
                            <a href="https://www.instagram.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/instagram.svg' alt='Instagram' style='width: 40px; margin-right: 10px;' />
                            </a>
                            <a href="https://www.facebook.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/facebook.svg' alt='Facebook' style='width: 40px; margin-right: 10px;' />
                            </a>
                            <a href="https://www.twitter.com/mantraseeds" style="outline: none;">
                                <img src='${process.env.CLOUDFRONT_URL}/social_media/twitter.svg' alt='Twitter' style='width: 40px;' />
                            </a>
                        </td>
                    </tr>
                    <tr>
                    <td style='margin-top: 12px; font-size: 16px;'>© 2023 Mantra Seeds</td>
                </tr>
            </table>
        </body>
        </html>`
            
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

const banUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.role === 1) {
            return res.status(403).json({ error: "You cannot ban an admin" });
        }
        if (user.isBanned) {
            return res.status(200).json({ message: "User is already banned" });
        }
        user.isBanned = true;
        await user.save();
        res.status(200).json({ message: `User ${id} has been banned` });
    } catch (error) {
        res.status(500).json({ error: `An error occurred while processing the request to ban user: ${id}` });
    }
};

const promoteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.role === 1) {
            return res.status(403).json({ error: "User is already an admin" });
        }
        if (user.isBanned) {
            return res.status(403).json({ error: "You want to promote a banned user...?" });
        }
        user.role = 1;
        await user.save();
        res.status(200).json({ message: `User ${id} has been promoted to admin` });
    } catch (error) {
        res.status(500).json({ error: `An error occurred while processing the request to promote user: ${id}` });
    }
}




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
    banUser,
    promoteUser 
};