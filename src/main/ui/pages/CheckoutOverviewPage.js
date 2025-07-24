import {expect} from '@playwright/test';
class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.itemName = this.page.locator('.inventory_item_name');
        this.itemDescription = this.page.locator('.inventory_item_desc');
        this.itemPrice = this.page.locator('.inventory_item_price');
        this.tax = this.page.locator('.summary_tax_label');
        this.total = this.page.locator('.summary_total_label');
        this.finishButton = this.page.locator('#finish');
        this.checkoutCompleteText = this.page.locator('[data-test="complete-header"]');
    }

    async validateItemDetails(expectedName, expectedDescription, expectedPrice) {
        const name = await this.itemName.textContent();
        const description = await this.itemDescription.textContent();
        const price = await this.itemPrice.textContent();
        expect(name).toBe(expectedName, 'Item name does not match');
        expect(description).toBe(expectedDescription, 'Item description does not match');   
        expect(price).toBe(expectedPrice, 'Item price does not match');
    }
    async validateTotal(price) {
        let taxText = await this.tax.textContent();
        let totalText = await this.total.textContent();
        const taxAmount = taxText.replace('Tax: $', '');
        const expectedTotal = parseFloat(price) + parseFloat(taxAmount);
        const actualTotal = await totalText.replace('Total: $', '');
        expect(parseFloat(actualTotal)).toBeCloseTo(expectedTotal, 2, 'Total price does not match');
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
    async verifyCheckoutCompletion(thankYouMessage) {
        const completionMessage = await this.checkoutCompleteText.textContent();
        expect(completionMessage).toBe(thankYouMessage, 'Checkout completion message does not match');
    }
}
module.exports = { CheckoutOverviewPage };