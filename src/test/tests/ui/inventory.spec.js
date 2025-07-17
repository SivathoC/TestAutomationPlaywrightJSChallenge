import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';
import { InventoryPage } from '../../../main/ui/pages/InventoryPage.js';

test.describe('Inventory Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        let credentials = await loginPage.getUserCredentials();
        const standardUser = credentials[0];        
        await loginPage.login(standardUser.getUsername(), standardUser.getPassword());
    });
  test('User can navigate to inventory page and see items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const inventoryList = await inventoryPage.getInventoryList();
    await expect(inventoryList).toBeVisible();
    
    // Validate that there are more than 1 inventory items
    const itemsCount = await inventoryPage.validateInventoryItemsCountGreaterThanOrEqualTo();
    expect(itemsCount).toBeGreaterThanOrEqual(1);
  });
});