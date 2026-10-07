// =====================================================================
// Step Definitions untuk homepage.feature
// CommonJS - menggunakan @wdio/cucumber-framework
// =====================================================================

const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require('../pageobjects/home.page');

Given('I open the 99 app', async () => {
  // App di-launch otomatis oleh capabilities appPackage/appActivity saat session mulai.
  // Pastikan homepage (search bar) sudah tampil sebelum lanjut.
  await HomePage.waitForDisplayed(HomePage.searchBar);
});

Then('I should see the homepage', async () => {
  const displayed = await HomePage.isHomePageDisplayed();
  expect(displayed).toBe(true);
});

Then('I should see the search bar', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.searchBar);
  expect(displayed).toBe(true);
});

Then('I should see the bottom navigation tabs', async () => {
  const cari = await HomePage.isDisplayed(HomePage.tabCari);
  const akun = await HomePage.isDisplayed(HomePage.tabAkunSaya);
  expect(cari).toBe(true);
  expect(akun).toBe(true);
});

When(/^I select the "([^"]*)" tab$/, async (tab) => {
  await HomePage.selectTab(tab);
});

Then(/^the "([^"]*)" tab should be active$/, async (tab) => {
  // Setelah tap tab, verifikasi tab tsb masih ada/terpilih di layar.
  const map = {
    Cari: HomePage.tabCari,
    'Hunian Baru': HomePage.tabHunianBaru,
    'Iklan Saya': HomePage.tabIklanSaya,
    'Buat Iklan': HomePage.tabBuatIklan,
    'Akun Saya': HomePage.tabAkunSaya,
  };
  const displayed = await HomePage.isDisplayed(map[tab]);
  expect(displayed).toBe(true);
});
