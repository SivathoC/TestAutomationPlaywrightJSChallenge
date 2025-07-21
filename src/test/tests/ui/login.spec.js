import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../main/ui/pages/LoginPage.js';

test.describe('Login Tests', () => {
  let loginPage;
  let credentials;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    credentials = await loginPage.getUserCredentials();
  });
  test('User can log in with valid credentials', async ({ page }) => {    

    const standardUser = credentials[0];
    await loginPage.loginApplication(standardUser.getUsername(), standardUser.getPassword());
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('User cannot log in with locked out user credentials', async ({ page }) => {
    const lockedOutUser = credentials[1];
    await loginPage.loginApplication(lockedOutUser.getUsername(), lockedOutUser.getPassword());
    await loginPage.expectErrorMessageToContain('Epic sadface: Sorry, this user has been locked out.');
    //expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
