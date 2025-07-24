import { expect } from '@playwright/test';
import { CheckoutProcessPage } from './CheckoutProcessPage.js';
export class ShoppingCartPage{
    constructor(page) {
        this.page = page; 
        this.cartItems = this.page.locator('[data-test="inventory-item"]');
        this.checkoutButton = this.page.locator('.checkout_button');
    }

    async verifyItemInCart(expectedItemName) {
        const cartItemNames = await this.cartItems.locator('.inventory_item_name').allTextContents();
        const itemExists = cartItemNames.some(name => name.includes(expectedItemName));
        if (!itemExists) {
            throw new Error(`Expected item "${expectedItemName}" not found in the shopping cart.`);
        }
        await expect(itemExists).toBeTruthy();
    }
    async getTotalPriceOfItemsInCart() {
        const cartItems = this.page.locator('.cart_item');
        let totalPrice = 0;
        for (let i = 0; i < await cartItems.count(); i++) {
            const priceText = await cartItems.nth(i).locator('.inventory_item_price').textContent();
            const price = parseFloat(priceText.replace('$', ''));
            totalPrice += price;
        }
        return totalPrice;
    }
    async proceedToCheckout() {
        await this.checkoutButton.click();
        return new CheckoutProcessPage(this.page);
    }
}