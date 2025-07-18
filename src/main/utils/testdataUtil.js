const UserCredential = require('../../test/models/UserCredential.js');
const InventoryDetails = require('../../test/models/InventoryDetails.js');

async function getLoginCredentials(page) {
  const usernameText = await page.locator('#login_credentials').innerText();
  const passwordText = await page.locator('.login_password').textContent();

  // Extract password using RegEx
  const match = passwordText.match(/Password for all users:\s*(\S+)/);
  const password = match ? match[1] : null;

  // Parse usernames
  const usernames = usernameText.split(/\r?\n/).slice(1); // skip header
  const credentials = [];
  for (const username of usernames) {
    let loginUsername = username.trim();
    if (loginUsername) {
      credentials.push(new UserCredential(loginUsername, password));
    }
}

  return credentials;
}   
module.exports = { getLoginCredentials };

async function getInventoryDetails(page) {
  const items = await page.$$('[data-test="inventory-item"]');
  const inventoryDetails = [];

  for (const item of items) {
    const title = await item.locator('.inventory_item_name').textContent();
    const price = await item.locator('.inventory_item_price').textContent();
    const description = await item.locator('.inventory_item_desc').textContent();
    const imgLocator = page.locator('img[data-test="inventory-item-sauce-labs-backpack-img"]');
    const imageSrc = await imgLocator.getAttribute('src');
    inventoryDetails.push(new InventoryDetails(title, price, description, imageSrc));
  }
  return inventoryDetails;
}
module.exports = { getLoginCredentials };