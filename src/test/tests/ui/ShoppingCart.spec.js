import {test} from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';

test.describe('Shopping Cart Tests', () => {
    let inventoryPage;
    let inventoryItems;
    let shoppingCartPage;
    let itemToAdd;
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        let credentials = await loginPage.getUserCredentials();
        const standardUser = credentials[0];
        inventoryPage = await loginPage.loginApplication(standardUser.getUsername(), standardUser.getPassword());
        inventoryItems = await inventoryPage.getInventoryItems();
        const itemNames = inventoryItems.map(item => item.getName());
         itemToAdd = itemNames[0];
        await inventoryPage.addItemToCart(itemToAdd);
        shoppingCartPage = await inventoryPage.navigateToShoppingCart();
    });
    
    test('User can navigate to shopping cart', async ({ page }) => {
        await shoppingCartPage.verifyItemInCart(itemToAdd);
        let totalPrice = await shoppingCartPage.getTotalPriceOfItemsInCart();
        await shoppingCartPage.proceedToCheckout();
    });
});
