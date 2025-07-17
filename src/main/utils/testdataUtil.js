const UserCredential = require('../../test/models/UserCredential.js');

async function getLoginCredentials(page) {
  const usernameText = await page.locator('#login_credentials').innerText();
  const passwordText = await page.locator('.login_password').textContent();

  // Extract password using RegEx
  const match = passwordText.match(/Password for all users:\s*(\S+)/);
  const password = match ? match[1] : null;

  // Parse usernames
  const usernames = usernameText.split(/\r?\n/).slice(1); // skip header
  const credentials = [];
  for (const username of usernames) {
    let loginUsername = username.trim();
    if (loginUsername) {
      credentials.push(new UserCredential(loginUsername, password));
    }
}

  return credentials;
}   
module.exports = { getLoginCredentials };
