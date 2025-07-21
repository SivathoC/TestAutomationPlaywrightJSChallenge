import { page, expect } from '@playwright/test';
const { getInventoryDetails } = require('../../../main/utils/testdataUtil.js');

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.inventoryItem = this.page.locator('.inventory_item');
    }
    //get inventory items from the test data utility
    async getInventoryItems() {
        const inventoryItems = await getInventoryDetails(this.page);
        return inventoryItems;
    }

    // get the number of inventory items
    async getNumberOfInventoryItems() {
        const numOfInventoryItems = await this.inventoryItem.count();
        return numOfInventoryItems;
    }
    // validate that the number of inventory items is greater than or equal to the expected count
    // this is used to ensure that the inventory page has items displayed
    async validateInventoryItemsCountGreaterThanOrEqualTo(expectedCount) {
        const actualCount = await this.getNumberOfInventoryItems();
        expect(actualCount).toBeGreaterThanOrEqual(expectedCount);
    }
    // verify if an item is in the inventory
    async isItemInInventory(itemName) {
        const itemLocator = await this.getInventoryItemLocatorByName(itemName);
        return await itemLocator.isVisible();
    }
    //get a specific inventory item by name
    async getInventoryItemLocatorByName(itemName) {
        return this.inventoryItem.filter({
            has: this.page.locator('.inventory_item_name', { hasText: itemName }),
        });
    }
    // click the "Add to Cart" button for a specific inventory item
    async addItemToCart(itemName) {
        const itemLocator = await this.getInventoryItemLocatorByName(itemName);
        const addToCartButton = itemLocator.locator('.btn_inventory:has-text("Add to cart")');
        await addToCartButton.click();
    }
    // click the "Remove" button for a specific inventory item
    async removeItemFromCart(itemName) {
        const itemLocator = await this.getInventoryItemLocatorByName(itemName);
        const removeButton = itemLocator.locator('.btn_inventory:has-text("Remove")');
        await removeButton.click();
    }
    // Add multiple items to the cart
    async addItemsToCart(itemNames) {
        for (const itemName of itemNames) {
            await this.addItemToCart(itemName);
        }
        return itemNames.length;
    }    
}