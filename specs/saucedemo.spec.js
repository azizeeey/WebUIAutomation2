const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pageobjects/LoginPage');
const InventoryPage = require('../pageobjects/InventoryPage');

describe('Tugas Web Automation with POM', function() {
    this.timeout(30000);
    let driver;
    let loginPage;
    let inventoryPage;

    // --- SETUP ---
    before(async function() {
        // Inisialisasi Driver
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        // Inisialisasi Page Objects
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
    });

    // --- TEST SCENARIOS ---
    
    it('Harus sukses login ke aplikasi', async function() {
        // Action sangat simple: Buka -> Login
        await loginPage.openPage();
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion
        const title = await inventoryPage.getPageTitle();
        assert.strictEqual(title, 'Products');
    });

    it('Harus sukses sort produk Z-A', async function() {
        // Action: Sortir
        await inventoryPage.sortProductBy('za');

        // Assertion
        const firstItem = await inventoryPage.getFirstItemText();
        console.log(`Item teratas ditemukan: ${firstItem}`);
        assert.strictEqual(firstItem, 'Test.allTheThings() T-Shirt (Red)');
    });

    // --- TEARDOWN ---
    after(async function() {
        await driver.sleep(2000); // Jeda sebentar biar kelihatan hasilnya
        await driver.quit();
    });
});