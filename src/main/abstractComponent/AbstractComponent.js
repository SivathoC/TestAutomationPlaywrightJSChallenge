import {ShoppingCartPage} from '../ui/pages/ShoppingCartPage.js';
class AbstractComponent {
    constructor(page) {
        this.page = page;
        this.cartLink = this.page.locator('.shopping_cart_link');
    }

    async navigateToShoppingCart() {
        await this.cartLink.click();
        return new ShoppingCartPage(this.page);
    }
}