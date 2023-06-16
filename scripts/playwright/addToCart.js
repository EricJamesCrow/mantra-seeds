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
  
  await page.goto('https://test.mantra-seeds.com/shop/products/648a2eb430248cc08b9662e6');
  
  await page.click('.add-to-cart-btn'); // Replace with the actual selector of your "Add to Cart" button
  
  await browser.close();
}

// Call the function
addToCart().catch(console.error);
