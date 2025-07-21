const { CheckoutOverviewPage } = require('../../../main/ui/pages/CheckoutOverviewPage.js');
export class CheckoutProcessPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = this.page.locator('#first-name');
        this.lastNameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('.btn_primary.cart_button');
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
        return new CheckoutOverviewPage(this.page);
    }
}