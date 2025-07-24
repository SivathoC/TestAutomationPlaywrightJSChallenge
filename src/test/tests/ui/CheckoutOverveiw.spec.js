import{test} from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';

test.describe('Checkout Your Information Page Tests', () => {
        let inventoryPage;
    let inventoryItems;
    let shoppingCartPage;
    let itemName, itemDescription, itemPrice;
    let checkoutProcessPage,checkoutOverviewPage;
    let totalPrice;
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        let credentials = await loginPage.getUserCredentials();
        const standardUser = credentials[0];
        inventoryPage = await loginPage.loginApplication(standardUser.getUsername(), standardUser.getPassword());
        inventoryItems = await inventoryPage.getInventoryItems();
        const firstItem = inventoryItems[0];
        itemName = await firstItem.getName();
        itemDescription = await firstItem.getDescription();
        itemPrice = await firstItem.getPrice();;
        await inventoryPage.addItemToCart(itemName);
        shoppingCartPage = await inventoryPage.navigateToShoppingCart();
        await shoppingCartPage.verifyItemInCart(itemName);
        totalPrice = await shoppingCartPage.getTotalPriceOfItemsInCart();
        checkoutProcessPage = await shoppingCartPage.proceedToCheckout();
        await checkoutProcessPage.fillCheckoutInformation('John', 'Doe','12345');
        checkoutOverviewPage = await checkoutProcessPage.continueCheckout();
    });
    test('validate checkout overview page', async ({ page }) => {
        await checkoutOverviewPage.validateItemDetails(itemName, itemDescription, itemPrice);
        await checkoutOverviewPage.validateTotal(totalPrice);
        await checkoutOverviewPage.finishCheckout();
        await checkoutOverviewPage.verifyCheckoutCompletion('Thank you for your order!');
    });

});