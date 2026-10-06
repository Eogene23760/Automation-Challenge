# 📱 Setup Guide — Appium + WebdriverIO Mobile Automation

Panduan ini membantu kamu meng-install Appium dan menjalankan automation untuk app **99** (Android).

> Catatan: automation ini **tidak bisa dijalankan di CI/sandbox tanpa layar** karena butuh emulator/device Android nyata. Jalankan di laptop/PC kamu (macOS / Windows / Linux).

---

## 1. Prasyarat (install dulu)

| Tool | Fungsi | Cara cek |
|------|--------|----------|
| **Node.js** (LTS ≥ 18) | menjalankan Appium & WebdriverIO | `node -v` |
| **Java JDK** (≥ 11) | dibutuhkan Android SDK & UiAutomator2 | `java -version` |
| **Android Studio** | menyediakan Android SDK + emulator (AVD) | — |

### 1.1 Install Java JDK
- Download OpenJDK (Temurin/Adoptium) lalu set `JAVA_HOME`.
- Verifikasi: `java -version`

### 1.2 Install Android Studio & SDK
1. Install [Android Studio](https://developer.android.com/studio).
2. Buka **SDK Manager** → install **Android SDK Platform-Tools** dan minimal satu **System Image** (mis. API 33).
3. Set environment variable (penting agar Appium menemukan SDK):

**macOS / Linux** (tambahkan ke `~/.zshrc` atau `~/.bashrc`):
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk      # macOS
# export ANDROID_HOME=$HOME/Android/Sdk            # Linux
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

**Windows** (System Environment Variables):
```
ANDROID_HOME = C:\Users\<user>\AppData\Local\Android\Sdk
Tambahkan ke PATH:
  %ANDROID_HOME%\platform-tools
  %ANDROID_HOME%\emulator
```

4. Verifikasi: `adb version`  dan  `adb devices`

---

## 2. Install Appium (versi terbaru / Appium 3)

Appium 2 & 3 memakai arsitektur modular: install server inti dulu, lalu tambahkan driver yang dibutuhkan.

```bash
# install Appium server global
npm install -g appium

# cek versi
appium -v

# install driver Android (UiAutomator2)
appium driver install uiautomator2

# cek driver terpasang
appium driver list --installed
```

### 2.1 Jalankan Appium Doctor (cek environment)
Appium 3 menyediakan doctor per-driver:
```bash
appium driver doctor uiautomator2
```
Perbaiki semua item yang ✗ (biasanya terkait `ANDROID_HOME` / `JAVA_HOME`).

### 2.2 (Opsional) Appium Inspector — untuk scan locator
Appium Inspector adalah GUI untuk melihat & mengambil locator elemen app.
- Download dari halaman release: https://github.com/appium/appium-inspector/releases
- Ini yang kamu pakai untuk mengisi locator asli di `test/pageobjects/home.page.js` (yang sekarang masih `TODO`).

---

## 3. Siapkan Device / Emulator

**Opsi A — Emulator (AVD):**
1. Android Studio → **Device Manager** → **Create Device** → pilih model & system image → Finish.
2. Jalankan emulator, lalu cek: `adb devices` (harus muncul `emulator-5554  device`).

**Opsi B — Device fisik:**
1. Aktifkan **Developer Options** + **USB Debugging** di HP.
2. Colok via USB, approve prompt, cek: `adb devices`.

---

## 4. Siapkan App 99

1. Download **99 app** versi terbaru (**bukan** "99 Pro").
2. Letakkan file APK di `apps/99.apk` **ATAU** install langsung ke device:
   ```bash
   adb install apps/99.apk
   ```
3. Jika app sudah terinstall, cari `appPackage` & `appActivity`:
   ```bash
   # buka app secara manual, lalu jalankan:
   adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
   ```
   Isi hasilnya ke `wdio.conf.js` (`appium:appPackage` & `appium:appActivity`).

---

## 5. Install dependency project & jalankan test

```bash
# di dalam folder repo ini
npm install

# jalankan test (Appium server akan start otomatis via @wdio/appium-service)
npm test
```

Jalankan test tag tertentu:
```bash
npx wdio run ./wdio.conf.js --cucumberOpts.tagExpression='@smoke'
```

---

## 6. Alur mengganti locator placeholder → asli

1. Start emulator & buka app 99.
2. Buka **Appium Inspector**, connect ke session (platformName=Android, automationName=UiAutomator2, app/appPackage).
3. Klik elemen homepage → salin **accessibility id** / **resource-id**.
4. Ganti setiap `TODO` di `test/pageobjects/home.page.js`.
5. Jalankan ulang `npm test`.

---

## 7. Struktur Project (Page Object Model)

```
Automation-Challenge/
├── apps/                      # taruh 99.apk di sini (.apk di-gitignore)
├── test/
│   ├── features/              # Gherkin feature files
│   │   └── homepage.feature
│   ├── pageobjects/           # Page Object Model
│   │   ├── base.page.js
│   │   └── home.page.js       # <-- isi locator asli di sini
│   └── step-definitions/      # Cucumber step defs (CommonJS)
│       └── homepage.steps.js
├── wdio.conf.js               # konfigurasi WebdriverIO + Appium service
├── package.json
└── SETUP.md
```

---

## 8. Submit (sesuai Rule di README)

1. Fork repo `indra99co/Automation-Challenge`.
2. Invite **indra99co** sebagai collaborator.
3. Push ke branch kamu & buat Pull Request.

---

## Sumber
- [Appium — Install the UiAutomator2 Driver](https://appium.io/docs/en/3.6/quickstart/uiauto2-driver/)
- [Appium — UIAutomator2 (Android) driver](https://appium.github.io/appium.io/docs/en/drivers/android-uiautomator2/)
- [How to Use Appium Inspector (Kobiton)](https://kobiton.com/mobile-testing-guide/mobile-test-automation/how-to-use-appium-inspector/)

> Konten di atas dirangkum ulang dari dokumentasi resmi untuk mematuhi lisensi.
