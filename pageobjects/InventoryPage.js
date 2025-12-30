const { By } = require('selenium-webdriver');
const BaseActions = require('../actions/BaseActions');

class InventoryPage extends BaseActions {
    constructor(driver) {
        super(driver);
        this.titleElement = By.className('title');
        this.sortDropdown = By.className('product_sort_container');
        this.firstItemName = By.css('.inventory_item_name');
    }

    async getPageTitle() {
        return await this.getText(this.titleElement);
    }

    async sortProductBy(value) {
        await this.click(this.sortDropdown);
        // Locator dinamis berdasarkan value ('az' atau 'za')
        const optionLocator = By.css(`option[value="${value}"]`);
        await this.click(optionLocator);
    }

    async getFirstItemText() {
        return await this.getText(this.firstItemName);
    }
}

module.exports = InventoryPage;