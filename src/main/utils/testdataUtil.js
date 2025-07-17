async function getLoginCredentials(page) {
	let usernameText = await page.locator('#login_credentials').innerText();
	let passwordText = await page.locator('.login_password').textContent();

	let match = passwordText.match(/Password for all users:\s*(\S+)/);
	let password = match ? match[1] : null;

  	let usernames = usernameText.split(/\r?\n/).slice(1);
	let loginCredentials = [];
	
	for (let output of usernames) {
		let username = output.trim();
		if (username) {
			loginCredentials.push({
				username: username,
				password: password
			});
		}
	}
	return loginCredentials;
}