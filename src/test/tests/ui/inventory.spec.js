import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';
import { InventoryPage } from '../../../main/ui/pages/InventoryPage.js';

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
});