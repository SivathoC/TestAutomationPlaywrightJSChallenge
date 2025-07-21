import { page, expect } from '@playwright/test';
import { InventoryPage } from './InventoryPage.js';
const { getLoginCredentials } = require('../../../main/utils/testdataUtil.js');

export class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('[data-test="error"]');
    }
    // Navigate to the login page
    async navigateToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    // Get user credentials from the test data utility
    async getUserCredentials() {
        return await getLoginCredentials(this.page);
    }
    // Login to the application with provided username and passwordv
    async loginApplication(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new InventoryPage(this.page);
    } 
    // Expect the error message to contain specific text
    async expectErrorMessageToContain(expectedText) {
        await expect(this.errorMessage).toContainText(expectedText);
    }
}