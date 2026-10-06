// =====================================================================
// HomePage - Page Object untuk homepage app 99 (bagian revamp)
// CommonJS
//
// PENTING: Locator di bawah adalah PLACEHOLDER.
// Gunakan Appium Inspector untuk scan locator ASLI dari app 99,
// lalu ganti nilai selector-nya. Prioritas selector (paling stabil
// ke paling rapuh):
//   1. accessibility id  -> '~someAccessibilityId'
//   2. resource-id        -> 'android=new UiSelector().resourceId("com.app:id/xxx")'
//   3. text               -> 'android=new UiSelector().text("Buy")'
//   4. xpath (hindari jika bisa)
// =====================================================================

const BasePage = require('./base.page');

class HomePage extends BasePage {
  // ---- LOCATORS (TODO: ganti dengan locator asli dari Appium Inspector) ----

  // Container utama homepage (penanda halaman sudah terbuka)
  get homeContainer() {
    return $('~home_container'); // TODO
  }

  // Search bar di bagian atas homepage
  get searchBar() {
    return $('~home_search_bar'); // TODO
  }

  // Tab/segment hasil revamp (contoh: Buy / Rent / New Launch)
  get tabBuy() {
    return $('android=new UiSelector().text("Buy")'); // TODO
  }

  get tabRent() {
    return $('android=new UiSelector().text("Rent")'); // TODO
  }

  get tabNewLaunch() {
    return $('android=new UiSelector().text("New Launch")'); // TODO
  }

  // Banner / carousel promosi di homepage
  get promoBanner() {
    return $('~home_promo_banner'); // TODO
  }

  // Bottom navigation
  get bottomNavHome() {
    return $('~nav_home'); // TODO
  }

  // ---- ACTIONS ----

  /**
   * Memastikan homepage sudah terbuka (dipakai di step "once it's open you will see the homepage").
   */
  async isHomePageDisplayed() {
    return this.isDisplayed(this.homeContainer);
  }

  async tapSearchBar() {
    await this.click(this.searchBar);
  }

  async selectTab(tabName) {
    const map = {
      Buy: this.tabBuy,
      Rent: this.tabRent,
      'New Launch': this.tabNewLaunch,
    };
    const element = map[tabName];
    if (!element) {
      throw new Error(`Tab tidak dikenal: ${tabName}`);
    }
    await this.click(element);
  }
}

module.exports = new HomePage();
