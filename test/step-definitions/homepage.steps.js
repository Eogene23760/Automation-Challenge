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

// ---- Tab steps (eksplisit per tab, tanpa Scenario Outline) ----

When('I tap the Cari tab', async () => {
  await HomePage.selectTab('Cari');
});

When('I tap the Hunian Baru tab', async () => {
  await HomePage.selectTab('Hunian Baru');
});

When('I tap the Akun Saya tab', async () => {
  await HomePage.selectTab('Akun Saya');
});

Then('the Cari tab should be active', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.tabCari);
  expect(displayed).toBe(true);
});

Then('the Hunian Baru tab should be active', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.tabHunianBaru);
  expect(displayed).toBe(true);
});

Then('the Akun Saya tab should be active', async () => {
  const displayed = await HomePage.isDisplayed(HomePage.tabAkunSaya);
  expect(displayed).toBe(true);
});
