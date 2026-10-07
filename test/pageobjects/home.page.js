// =====================================================================
// HomePage - Page Object untuk homepage app 99 (com.urbanindo.android)
// CommonJS
//
// Locator diambil langsung dari Appium Inspector (accessibility id / content-desc).
// Tanda '~' pada selector = accessibility id (content-desc di Android).
// =====================================================================

const BasePage = require('./base.page');

class HomePage extends BasePage {
  // ---- LOCATORS (dari Appium Inspector) ----

  // Search bar di bagian atas homepage
  get searchBar() {
    return $('~Lokasi, area, project');
  }

  // Tombol Filter di samping search bar
  get filterButton() {
    return $('~Filter');
  }

  // Bottom navigation tabs (content-desc diakhiri "\nTab X of 5")
  get tabCari() {
    return $('~Cari\nTab 1 of 5');
  }

  get tabHunianBaru() {
    return $('~Hunian Baru\nTab 2 of 5');
  }

  get tabIklanSaya() {
    return $('~Iklan Saya\nTab 3 of 5');
  }

  get tabBuatIklan() {
    return $('~Buat Iklan\nTab 4 of 5');
  }

  get tabAkunSaya() {
    return $('~Akun Saya\nTab 5 of 5');
  }

  // Penanda halaman homepage sudah terbuka:
  // search bar + tab "Cari" aktif adalah indikator kuat kita di homepage.
  async isHomePageDisplayed() {
    const searchVisible = await this.isDisplayed(this.searchBar);
    const tabVisible = await this.isDisplayed(this.tabCari);
    return searchVisible && tabVisible;
  }

  // Kembali ke homepage kalau sedang berada di tab lain.
  // Dipakai agar tiap skenario independen meski app tidak di-reset (noReset=true).
  async ensureOnHomePage() {
    const onHome = await this.isDisplayed(this.searchBar, 3000);
    if (!onHome) {
      await this.click(this.tabCari);
    }
  }

  // ---- ACTIONS ----

  async tapSearchBar() {
    await this.click(this.searchBar);
  }

  /**
   * Pilih tab bottom nav berdasarkan nama.
   */
  async selectTab(tabName) {
    const map = {
      Cari: this.tabCari,
      'Hunian Baru': this.tabHunianBaru,
      'Iklan Saya': this.tabIklanSaya,
      'Buat Iklan': this.tabBuatIklan,
      'Akun Saya': this.tabAkunSaya,
    };
    const element = map[tabName];
    if (!element) {
      throw new Error(`Tab tidak dikenal: ${tabName}`);
    }
    await this.click(element);
  }
}

module.exports = new HomePage();
