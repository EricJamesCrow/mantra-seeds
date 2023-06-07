const deliveryStatusEmail = (status, updatedOrderWithTransaction, itemsHtml, decryptedAddress) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delivery Status Update - ${status} for #${updatedOrderWithTransaction.orderNumber}</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Arial', sans-serif;
            }
            h1 {
                margin: 0;
                padding: 0;
                text-align: left;
                margin: 6px;
                margin-left: 24px;
            }
            .centered-title {
                text-align: center;
                margin-top: 24px;
            }
        </style>
    </head>
    <body>
        <table width="100%" style="background: #637748; padding: 0 12px; height: 78px;">
            <tr>
                <td>
                    <h2 style="font-size: 24px; color: #FAFAFA;">MANTRA SEEDS</h2>
                </td>
                <td align="right">
                    <img src="${process.env.CLOUDFRONT_URL}/meditating.svg" style="filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); width: 55px; height: 55px;" />
                </td>
            </tr>
        </table>
        <div style="margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="text-align: center; background: #C2C5A2; font-family: 'Roboto'; padding: 24px 12px 12px 12px;">
                    <td colspan="2">
                        <h1 class="centered-title">Delivery Status Update - Order #${updatedOrderWithTransaction.orderNumber} has been ${status}!</h1>
                        <p style="padding: 12px 24px; word-wrap: break-word; font-weight: 400; font-size: 20px;">Your order #${updatedOrderWithTransaction.orderNumber} hsa been ${status.toLowerCase()}!</p>
                        <h1>Order: #${updatedOrderWithTransaction.orderNumber}</h1>
                        <h1>Items</h1>
                        <!-- Item -->
                         ${itemsHtml}
                        <h1>Shipping Details</h1>
                        <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                            <tr>
                                <td>${decryptedAddress.firstName} ${decryptedAddress.lastName}</td>
                            </tr>
                            <tr>
                                <td>${decryptedAddress.street}</td>
                            </tr>
                            <tr>
                                <td>${decryptedAddress.city}, ${decryptedAddress.state} ${decryptedAddress.zip}</td>
                            </tr>
                            <tr>
                                <td>United States</td>
                            </tr>
                        </table>
                        <h1>Shipping Method</h1>
                        <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                            <tr>
                                <td>${updatedOrderWithTransaction.shipping.delivery}</td>
                            </tr>
                        </table>
                        <h1>Payment Method</h1>
                        <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                            <tr>
                                <td>${updatedOrderWithTransaction.transaction.paymentMethod}</td>
                            </tr>
                        </table>
                        <h1>Order Total</h1>
                        <table style="text-align: left; padding: 0; margin: 12px 0; display: inline-block; font-size: 20px;">
                            <tr>
                                <td>$${(updatedOrderWithTransaction.total / 100).toFixed(2)}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table width="100%" style="background: #456649; padding: 24px; text-align: center; color: #fff;">
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
                            <img src='${process.env.CLOUDFRONT_URL}/social_media/facebook.svg' alt='Facebook' style='width: 40px; margin-right: 10px ' />
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
        </div>
    </body>
    </html>
    `
}

module.exports = deliveryStatusEmail;