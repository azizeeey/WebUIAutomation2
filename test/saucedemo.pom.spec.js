const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs'); // Import File System bawaan NodeJS untuk simpan gambar
const path = require('path');

// Import Page Objects
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Tugas Sesi 9 - POM & Visual Testing Implementation', function() {
  this.timeout(30000);
  let driver;
  let loginPage;
  let inventoryPage;

  // --- SETUP ---
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();

    // Inisialisasi Page Object
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  beforeEach(async function() {
    console.log(`\n>>> Start: "${this.currentTest.title}"`);
  });

  // --- TEST CASES ---

  // 1. Login menggunakan POM
  it('TC1: Harus sukses login (Menggunakan POM)', async function() {
    await loginPage.openPage();
    await loginPage.loginProcess('standard_user', 'secret_sauce');

    const title = await inventoryPage.getPageTitle();
    assert.strictEqual(title, 'Products');
  });

  // 2. Sorting menggunakan POM
  it('TC2: Harus sukses sort Z-A (Menggunakan POM)', async function() {
    // Panggil method sort dari InventoryPage
    await inventoryPage.sortProductBy('za');

    const firstItem = await inventoryPage.getFirstItemText();
    console.log(`    (Info: Item teratas adalah '${firstItem}')`);
    assert.strictEqual(firstItem, 'Test.allTheThings() T-Shirt (Red)');
  });

  // 3. Visual Testing (Screenshot Capture)
  it('TC3: Visual Test - Capture Screenshot Halaman Inventory', async function() {
    // Nama file screenshot
    const screenshotName = 'visual_test_inventory.png';
    const filePath = path.join(__dirname, '..', screenshotName);

    // Ambil Screenshot (outputnya base64 string)
    let image = await driver.takeScreenshot();

    // Simpan ke file fisik
    fs.writeFileSync(filePath, image, 'base64');
    
    console.log(`    (Info: Screenshot disimpan di ${filePath})`);

    // Assertion: Pastikan file berhasil dibuat/ada
    assert.ok(fs.existsSync(filePath), 'File screenshot seharusnya berhasil dibuat');
  });

  // --- TEARDOWN ---
  afterEach(async function() {
    await driver.sleep(1000);
    console.log(`<<< End: "${this.currentTest.title}"`);
  });

  after(async function() {
    await driver.quit();
  });
});