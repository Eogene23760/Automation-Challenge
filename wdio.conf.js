// =====================================================================
// WebdriverIO config - CommonJS
// Framework: Cucumber (Gherkin) | Driver: Appium UiAutomator2 (Android)
//
// NOTE: Ganti `app` path & deviceName/platformVersion sesuai device/emulator
// kamu. App 99 (bukan Pro) harus kamu download sendiri (.apk) ke folder ./apps
// =====================================================================

const path = require('path');

exports.config = {
  runner: 'local',

  // ---------------------------------------------------------------
  // Appium service akan otomatis start/stop Appium server saat test jalan
  // ---------------------------------------------------------------
  services: [
    [
      'appium',
      {
        args: {
          // address: '127.0.0.1',
          // port: 4723,
          relaxedSecurity: true,
        },
        logPath: './logs',
      },
    ],
  ],

  port: 4723,
  path: '/',

  // ---------------------------------------------------------------
  // Test files (Gherkin feature files)
  // ---------------------------------------------------------------
  specs: ['./test/features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

  // ---------------------------------------------------------------
  // Capabilities - Android device/emulator
  // ---------------------------------------------------------------
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator', // ganti dgn nama device: `adb devices`
      // 'appium:platformVersion': '13',        // sesuaikan versi Android device
      // --- OPSI A: app di-install dari Google Play (sudah terpasang di emulator) ---
      // Isi dengan hasil: adb shell dumpsys window | findstr "mCurrentFocus"
      'appium:appPackage': 'com.urbanindo.android', // app 99 (99 Group / 99.co)
      'appium:appActivity': 'app.nine_nine.MainActivity', // homepage activity
      // --- (OPSI B pakai file apk) kalau pakai apk, hapus 2 baris di atas & aktifkan baris ini: ---
      // 'appium:app': path.join(process.cwd(), 'apps', '99.apk'),
      'appium:noReset': true, // true = app tidak di-reset tiap run (cocok utk app dari Play Store)
      'appium:newCommandTimeout': 240,
      'appium:autoGrantPermissions': true,
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // ---------------------------------------------------------------
  // Framework: Cucumber (Gherkin)
  // ---------------------------------------------------------------
  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require: ['./test/step-definitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
