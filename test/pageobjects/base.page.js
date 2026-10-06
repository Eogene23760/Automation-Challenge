// =====================================================================
// BasePage - helper umum yang dipakai semua page (Page Object Model)
// CommonJS
// =====================================================================

class BasePage {
  /**
   * Tunggu elemen tampil, lalu klik.
   * @param {WebdriverIO.Element} element
   * @param {number} timeout
   */
  async click(element, timeout = 15000) {
    await element.waitForDisplayed({ timeout });
    await element.click();
  }

  /**
   * Tunggu elemen tampil, lalu isi teks.
   */
  async setValue(element, value, timeout = 15000) {
    await element.waitForDisplayed({ timeout });
    await element.setValue(value);
  }

  /**
   * Cek apakah elemen tampil (tanpa throw error).
   * @returns {Promise<boolean>}
   */
  async isDisplayed(element, timeout = 15000) {
    try {
      await element.waitForDisplayed({ timeout });
      return await element.isDisplayed();
    } catch (e) {
      return false;
    }
  }

  /**
   * Tunggu sampai elemen tampil.
   */
  async waitForDisplayed(element, timeout = 15000) {
    await element.waitForDisplayed({ timeout });
  }
}

module.exports = BasePage;
