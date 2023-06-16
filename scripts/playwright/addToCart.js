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
  
  await page.goto('http://localhost:3000/shop/products/646a666a41e3f8889dad1c6a');
  
  await page.click('.add-to-cart-btn'); // Replace with the actual selector of your "Add to Cart" button
  
  await browser.close();
}

// Call the function
addToCart().catch(console.error);
