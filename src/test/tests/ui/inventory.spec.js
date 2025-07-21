import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';

test.describe('Inventory Tests', () => {
  let inventoryPage;
  let inventoryItems;
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        let credentials = await loginPage.getUserCredentials();
        const standardUser = credentials[0];        
        inventoryPage = await loginPage.loginApplication(standardUser.getUsername(), standardUser.getPassword());
        inventoryItems = await inventoryPage.getInventoryItems();
    });
  test('User can navigate to inventory page and see items', async ({ page }) => {
    // Validate that there are more than 1 inventory items
    const itemsCount = await inventoryPage.validateInventoryItemsCountGreaterThanOrEqualTo(1);
  });
  test('User can add items to the cart', async ({ page }) => {
    const itemNames = inventoryItems.map(item => item.getName());
    let itemToAdd = itemNames[0];
    await inventoryPage.addItemToCart(itemToAdd);
  });
});