const confirmAccountEmail = (confirmationLink) => {
        return `<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Confirm Your Account</title>
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
                        <img src='${process.env.CLOUDFRONT_URL}/meditating.png' style='filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); width: 55px; height: 55px;'/>
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
                            <img src='${process.env.CLOUDFRONT_URL}/social_media/instagram.png' alt='Instagram' style='width: 40px; margin-right: 10px;' />
                        </a>
                        <a href="https://www.facebook.com/mantraseeds" style="outline: none;">
                            <img src='${process.env.CLOUDFRONT_URL}/social_media/facebook.png' alt='Facebook' style='width: 40px; margin-right: 10px;' />
                        </a>
                        <a href="https://www.twitter.com/mantraseeds" style="outline: none;">
                            <img src='${process.env.CLOUDFRONT_URL}/social_media/twitter.png' alt='Twitter' style='width: 40px;' />
                        </a>
                    </td>
                </tr>
                <tr>
                <td style='margin-top: 12px; font-size: 16px;'>© 2023 Mantra Seeds</td>
            </tr>
        </table>
    </body>
    </html>`
        }

module.exports = confirmAccountEmail;