import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';

test.describe('Login Tests', () => {
  
  test('User can log in with valid credentials', async ({ page }) => {    
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    let credentials = await loginPage.getUserCredentials();
    const standardUser = credentials[0];

    await loginPage.login(standardUser.getUsername(), standardUser.getPassword());
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('User cannot log in with locked out user credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    let credentials = await loginPage.getUserCredentials();
    const lockedOutUser = credentials[1];

    await loginPage.login(lockedOutUser.getUsername(), lockedOutUser.getPassword());
    const errorLocator = loginPage.getErrorLocator();
    await expect(errorLocator).toBeVisible();

    const errorText = await loginPage.lockedOutUserError();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
