const { By } = require('selenium-webdriver');
const BaseActions = require('../actions/BaseActions');

class LoginPage extends BaseActions {
    constructor(driver) {
        super(driver); // Panggil constructor BaseActions
        // Definisi Locator
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
    }

    async openPage() {
        await this.open('https://www.saucedemo.com');
    }

    async login(username, password) {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }
}

module.exports = LoginPage;