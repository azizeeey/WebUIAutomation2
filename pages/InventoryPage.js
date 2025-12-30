const { By } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        // Locators
        this.titleElement = By.className('title');
        this.sortDropdown = By.className('product_sort_container');
        this.firstItemName = By.css('.inventory_item_name');
    }

    async getPageTitle() {
        return await this.driver.findElement(this.titleElement).getText();
    }

    async sortProductBy(optionValue) {
        // Klik dropdown
        await this.driver.findElement(this.sortDropdown).click();
        // Klik opsi berdasarkan value (contoh: 'za' atau 'az')
        await this.driver.findElement(By.css(`option[value="${optionValue}"]`)).click();
    }

    async getFirstItemText() {
        return await this.driver.findElement(this.firstItemName).getText();
    }
}

module.exports = InventoryPage;