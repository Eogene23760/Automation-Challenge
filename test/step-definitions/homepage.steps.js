// =====================================================================
// Step Definitions untuk homepage.feature
// CommonJS - menggunakan @wdio/cucumber-framework
// =====================================================================

const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require('../pageobjects/home.page');

Given('I open the 99 app', async () => {
  // App di-launch otomatis oleh capabilities 'appium:app' saat session mulai.
  // Jika app pakai noReset:true & sudah terinstall, bisa aktifkan baris berikut:
  // await driver.activateApp('com.ninetyNine.property'); // TODO: package asli
  await HomePage.waitForDisplayed(HomePage.homeContainer);
});

Then('I should see the homepage', async () => {
  const displayed = await HomePage.isHomePageDisplayed();
  expect(displayed).toBe(true);
});

Then('I should see the search bar', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.searchBar);
  expect(displayed).toBe(true);
});

Then('I should see the promo banner', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.promoBanner);
  expect(displayed).toBe(true);
});

When('I select the {string} tab', async (tab) => {
  await HomePage.selectTab(tab);
});

Then('the {string} tab content should be displayed', async (tab) => {
  // TODO: ganti dengan assertion konten tiap tab setelah locator asli diketahui.
  // Sementara verifikasi homepage masih tampil setelah pindah tab.
  const displayed = await HomePage.isHomePageDisplayed();
  expect(displayed).toBe(true);
});
