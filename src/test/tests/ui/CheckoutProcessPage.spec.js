import {test} from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';
test.describe('Checkout Your Information Page Tests', () => {
    let inventoryPage;
    let inventoryItems;
    let shoppingCartPage;
    let itemToAdd;
    let CheckoutProcessPage;
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
        await shoppingCartPage.verifyItemInCart(itemToAdd);
        let totalPrice = await shoppingCartPage.getTotalPriceOfItemsInCart();
        CheckoutProcessPage = await shoppingCartPage.proceedToCheckout();
    });
    test('User fills check out information and continue to checkout', async ({ page }) => {
        CheckoutProcessPage.fillCheckoutInformation('John', 'Doe','12345');
        await CheckoutProcessPage.continueCheckout();
    });
    
});