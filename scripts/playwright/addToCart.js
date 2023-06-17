const { chromium } = require('playwright');

module.exports = {
  addToCart
};

async function addToCart() {
  const browser = await chromium.launch();
  const newContext = await browser.newContext();

  // Set userAgeConfirmed to true
  await newContext.addInitScript(() => {
    localStorage.setItem('userAgeConfirmed', 'true');
  });

  const page = await newContext.newPage();
  
  await page.goto('http://localhost:3000/shop/products/646a675c41e3f8889dad1c7d');
  
  await page.click('.add-to-cart-btn');

  await page.waitForTimeout(3000);

  await page.goto('http://localhost:3000/cart');

  const localStorageCart = await page.evaluate(() => localStorage.getItem('cart'));
  console.log(localStorageCart);

  // go to checkout
  await page.click('[aria-label="Proceed to Checkout"]');
  await page.waitForTimeout(1000);
  console.log(`Current URL: ${page.url()}`);

  // fill out address form
  await page.fill('[aria-label="First Name"]', 'Eric');
  await page.fill('[aria-label="Last Name"]', 'Crow');
  // fill out address form
  await page.fill('input[aria-label="Address"].chakra-input.css-1kp110w', '5095 Branciforte Drive');
  await page.fill('[aria-label="City"]', 'Santa Cruz');
  await page.fill('[aria-label="State"]', 'CA');
  await page.fill('[aria-label="Zip"]', '95065');
  await page.fill('[aria-label="Email"]', 'ecrow5@wgu.edu');

  // go to shipping
  await page.click('.alternative-link');
  console.log(`Current URL: ${page.url()}`);

  await page.waitForTimeout(1000);

  // go to payment
  await page.click('.alternative-link');
  console.log(`Current URL: ${page.url()}`);

  // Wait 3 seconds before clicking PayPal button
  await page.waitForTimeout(3000);

  // Handle PayPal popup window
  const paypalButtonSelector = ".paypal-button.paypal-button-number-0.paypal-button-layout-vertical.paypal-button-shape-rect.paypal-button-number-multiple.paypal-button-env-sandbox.paypal-button-color-gold.paypal-button-text-color-black.paypal-logo-color-blue";
  await page.waitForSelector(paypalButtonSelector);
  const [popup] = await Promise.all([
    newContext.waitForEvent('page'),
    page.click(paypalButtonSelector),  // click paypal button (this will trigger a popup window)
  ]);

  await popup.waitForTimeout(3000);
  // Fill in username and password
  await popup.fill('#email', 'guest-user@personal.example.com');
  await popup.fill('#password', 'K&8HRs6]');
  await page.waitForTimeout(3000);
  await popup.click('#payment-submit-btn');

  // Add code to submit form in popup

  await browser.close();
}

// Call the function
addToCart().catch(console.error);
