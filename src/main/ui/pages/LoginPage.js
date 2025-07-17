import { page } from '@playwright/test';
const { getLoginCredentials } = require('../../../main/utils/testdataUtil.js');

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async getUserCredentials() {
        return await getLoginCredentials(this.page);
    }

    async login(username, password) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.locator('#login-button').click();
    } 
    getErrorLocator() {
        return this.page.locator('[data-test="error"]');
    }
    async lockedOutUserError() {
        const errorMessage = await this.page.locator('[data-test="error"]').textContent();
        return errorMessage;
    }
}