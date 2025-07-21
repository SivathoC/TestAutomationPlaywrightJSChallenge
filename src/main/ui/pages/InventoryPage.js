import { page, expect } from '@playwright/test';
import { AbstractComponent } from '../../abstractComponent/AbstractComponent.js';
const { getInventoryDetails } = require('../../../main/utils/testdataUtil.js');

export class InventoryPage extends AbstractComponent {
    constructor(page) {
        super(page);
        this.page = page;
        this.inventoryItem = this.page.locator('.inventory_item');
        this.addToCartButton = '.btn_inventory:has-text("Add to cart")';
        this.removeButton = '.btn_inventory:has-text("Remove")';
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
        const product = this.page.locator('.inventory_item').filter({
            has: this.page.locator(`.inventory_item_name:text-is("${itemName}")`)
        });
        return product;
    }
    // click the "Add to Cart" button for a specific inventory item
    async addItemToCart(itemName) {
        const product = await this.getInventoryItemLocatorByName(itemName);
        await product.locator(this.addToCartButton).click();
    }

    // click the "Remove" button for a specific inventory item
    async removeItemFromCart(itemName) {
        const product = await this.getInventoryItemLocatorByName(itemName);
        await product.locator(this.removeButton).click();
    }
    // Add multiple items to the cart
    async addItemsToCart(itemNames) {
        for (const itemName of itemNames) {
            await this.addItemToCart(itemName);
        }
        return itemNames.length;
    }    
}