const { until } = require('selenium-webdriver');

class BaseActions {
    constructor(driver) {
        this.driver = driver;
    }

    // Wrapper untuk membuka URL
    async open(url) {
        await this.driver.get(url);
    }

    // Wrapper untuk mencari elemen dengan menunggu (Explicit Wait)
    async find(locator) {
        // Tunggu sampai elemen ada (timeout 10 detik) sebelum dicari
        await this.driver.wait(until.elementLocated(locator), 10000);
        return await this.driver.findElement(locator);
    }

    // Wrapper untuk klik
    async click(locator) {
        const element = await this.find(locator);
        await element.click();
    }

    // Wrapper untuk ketik teks
    async type(locator, text) {
        const element = await this.find(locator);
        await element.sendKeys(text);
    }

    // Wrapper untuk ambil teks
    async getText(locator) {
        const element = await this.find(locator);
        return await element.getText();
    }
}

module.exports = BaseActions;