import { page } from '@playwright/test';

export class InventoryPage {
    constructor(page) {
        this.page = page;
    }
    
    async getInventoryList() {
        return await this.page.locator('.inventory_list');
    }

    async validateInventoryItemsCountGreaterThanOrEqualTo() {
        const itemsCount = await this.page.locator('.inventory_item').count();
       return itemsCount;
    }
}