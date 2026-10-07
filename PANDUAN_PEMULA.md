# 🧑‍🎓 Panduan Automation Test untuk Pemula (Soal No. 4)

Panduan ini ditulis dari NOL. Ikuti urutannya pelan-pelan. Jangan lompat langkah.
Target akhir: test automation untuk homepage app **99** bisa jalan di laptop kamu.

---

## 🧠 Konsep dasar dulu (biar paham, bukan cuma copy-paste)

Bayangkan automation test itu seperti "robot" yang membuka aplikasi HP dan
mengecek apakah tombol/teks yang seharusnya ada benar-benar muncul.
Komponennya:

| Istilah | Analogi sederhana |
|---------|-------------------|
| **Emulator / Device** | HP tempat app dijalankan |
| **App 99 (.apk)** | aplikasi yang mau dites |
| **Appium** | "jembatan" yang bisa mengontrol HP (klik, ketik, baca layar) |
| **WebdriverIO** | kerangka (framework) yang menjalankan test |
| **Appium Inspector** | kaca pembesar untuk melihat "nama" tiap elemen di layar (locator) |
| **Locator** | alamat/ID sebuah elemen (misal tombol "Buy") |
| **Gherkin (.feature)** | skenario test ditulis dalam bahasa manusia (Given/When/Then) |
| **Page Object Model** | cara merapikan kode: tiap halaman = 1 file |

Alur kerjanya:
```
WebdriverIO  ->  Appium  ->  Emulator (buka app 99)  ->  cek elemen
   (test)       (jembatan)        (HP virtual)
```

---

## ✅ TAHAP 0 — Cek apa yang sudah ada

Scaffold (kerangka kode) sudah aku siapkan di repo ini. Kamu TIDAK perlu
menulis kode dari nol. Yang kamu lakukan nanti cuma:
1. Install tool-tool pendukung
2. Siapkan emulator + app 99
3. Isi "locator asli" (ganti tulisan TODO)
4. Jalankan test

---

## ✅ TAHAP 1 — Install Node.js

Node.js dibutuhkan untuk menjalankan Appium & WebdriverIO.

1. Buka https://nodejs.org → download versi **LTS**.
2. Install (klik Next sampai selesai).
3. Buka Terminal (Mac/Linux) atau Command Prompt / PowerShell (Windows), ketik:
   ```bash
   node -v
   ```
   Kalau muncul angka (contoh `v20.x.x`), berarti BERHASIL. ✅

---

## ✅ TAHAP 2 — Install Java (JDK)

Appium butuh Java untuk mengontrol Android.

1. Download **OpenJDK** dari https://adoptium.net (pilih versi 17 atau 11).
2. Install.
3. Set environment variable `JAVA_HOME`:
   - **Windows**: Search "Environment Variables" → New System Variable:
     - Name: `JAVA_HOME`
     - Value: folder tempat JDK terinstall (contoh `C:\Program Files\Eclipse Adoptium\jdk-17...`)
   - **Mac/Linux**: tambahkan ke `~/.zshrc` atau `~/.bashrc`:
     ```bash
     export JAVA_HOME=$(/usr/libexec/java_home)   # Mac
     ```
4. Cek: tutup & buka ulang terminal, ketik:
   ```bash
   java -version
   ```
   Muncul versi Java = BERHASIL. ✅

---

## ✅ TAHAP 3 — Install Android Studio (untuk emulator + SDK)

Ini bagian paling besar, sabar ya.

1. Download Android Studio: https://developer.android.com/studio → install.
2. Buka Android Studio → ikuti setup wizard (biarkan default, klik Next terus).
3. Setelah terbuka, masuk ke **SDK Manager**:
   - Klik menu **More Actions** → **SDK Manager** (atau ikon gear ⚙️).
   - Tab **SDK Platforms**: centang satu versi Android (contoh **Android 13 / API 33**).
   - Tab **SDK Tools**: pastikan tercentang **Android SDK Platform-Tools** & **Android Emulator**.
   - Klik **Apply** → tunggu download selesai.

4. Set environment variable `ANDROID_HOME` (WAJIB, biar Appium ketemu SDK):
   - **Windows** (Environment Variables → New):
     - Name: `ANDROID_HOME`
     - Value: `C:\Users\<namamu>\AppData\Local\Android\Sdk`
     - Lalu edit `Path`, tambahkan:
       - `%ANDROID_HOME%\platform-tools`
       - `%ANDROID_HOME%\emulator`
   - **Mac/Linux** (tambah ke `~/.zshrc`):
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk     # Mac
     # export ANDROID_HOME=$HOME/Android/Sdk           # Linux
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     export PATH=$PATH:$ANDROID_HOME/emulator
     ```

5. Cek berhasil: tutup & buka ulang terminal, ketik:
   ```bash
   adb version
   ```
   Muncul versi = BERHASIL. ✅

---

## ✅ TAHAP 4 — Buat Emulator (HP virtual)

1. Android Studio → **Device Manager** (ikon HP).
2. Klik **Create Device** / **+**.
3. Pilih model (contoh **Pixel 6**) → Next.
4. Pilih System Image (versi Android yang tadi di-download, contoh API 33) → Next → Finish.
5. Klik tombol ▶️ (Play) untuk menjalankan emulator. Tunggu sampai muncul layar HP Android.
6. Cek emulator terdeteksi, di terminal ketik:
   ```bash
   adb devices
   ```
   Muncul sesuatu seperti `emulator-5554   device` = BERHASIL. ✅

---

## ✅ TAHAP 5 — Install Appium + Driver Android

1. Install Appium (server inti):
   ```bash
   npm install -g appium
   appium -v
   ```
2. Install driver Android (UiAutomator2):
   ```bash
   appium driver install uiautomator2
   ```
3. Cek kesehatan environment (penting! ini mendeteksi kalau ada setup kurang):
   ```bash
   appium driver doctor uiautomator2
   ```
   Perbaiki semua yang bertanda ✗ (biasanya soal JAVA_HOME / ANDROID_HOME).

---

## ✅ TAHAP 6 — Install Appium Inspector (untuk lihat locator)

1. Download dari: https://github.com/appium/appium-inspector/releases
   (pilih file sesuai OS: Windows `.exe`, Mac `.dmg`).
2. Install & buka.
   Nanti dipakai di TAHAP 9 untuk "mengintip" nama tiap elemen di app.

---

## ✅ TAHAP 7 — Siapkan App 99

1. Download aplikasi **99** versi terbaru (⚠️ BUKAN "99 Pro").
   - Idealnya kamu punya file `.apk`-nya. Taruh di folder `apps/` dengan nama `99.apk`.
   - Atau install langsung ke emulator (kalau punya apk):
     ```bash
     adb install apps/99.apk
     ```
2. Buka app 99 secara manual di emulator sekali, pastikan homepage muncul.

---

## ✅ TAHAP 8 — Download project ini & install dependency

1. **Fork** repo ini ke akun GitHub kamu (klik tombol Fork di halaman GitHub).
2. Clone fork kamu ke laptop:
   ```bash
   git clone https://github.com/<username-kamu>/Automation-Challenge.git
   cd Automation-Challenge
   ```
3. Install semua dependency project:
   ```bash
   npm install
   ```

---

## ✅ TAHAP 9 — Ambil locator asli pakai Appium Inspector

Ini inti pekerjaan QA automation: menemukan "alamat" tiap elemen.

1. Jalankan Appium server di satu terminal:
   ```bash
   appium
   ```
2. Buka **Appium Inspector**, isi **Capabilities** (JSON), contoh:
   ```json
   {
     "platformName": "Android",
     "appium:automationName": "UiAutomator2",
     "appium:deviceName": "Android Emulator",
     "appium:appPackage": "ISI_PACKAGE_APP_99",
     "appium:appActivity": "ISI_ACTIVITY_APP_99"
   }
   ```
   > Cara cari appPackage & appActivity: buka app 99 di emulator, lalu di terminal:
   > ```bash
   > adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
   > ```
3. Klik **Start Session**. Layar app 99 akan muncul di Inspector.
4. Klik elemen di homepage (search bar, tab Buy/Rent, banner, dll).
   Panel kanan menampilkan locator-nya. Prioritas yang dipakai (paling stabil dulu):
   - **accessibility id** (paling bagus)  → di kode: `$('~nama_id')`
   - **resource-id**                        → `$('android=new UiSelector().resourceId("...")')`
   - **text**                               → `$('android=new UiSelector().text("Buy")')`
5. Catat locator tiap elemen.

---

## ✅ TAHAP 10 — Ganti locator TODO di kode

Buka file `test/pageobjects/home.page.js`. Di situ ada banyak `TODO`, contoh:
```js
get searchBar() {
  return $('~home_search_bar'); // TODO  <-- ganti dgn locator asli dari Inspector
}
```
Ganti nilai `'~home_search_bar'` dengan locator asli yang kamu catat di TAHAP 9.
Lakukan untuk semua yang bertanda `TODO`.

---

## ✅ TAHAP 11 — Jalankan test!

Pastikan emulator menyala, lalu:
```bash
npm test
```
Appium server akan start otomatis, app 99 dibuka, dan test berjalan.
Lihat hasilnya di terminal (PASS/FAIL per skenario).

Jalankan hanya skenario smoke:
```bash
npx wdio run ./wdio.conf.js --cucumberOpts.tagExpression='@smoke'
```

---

## ✅ TAHAP 12 — Submit (sesuai Rule README)

1. Pastikan sudah **fork** repo ke akun kamu (TAHAP 8).
2. Invite **indra99co** sebagai collaborator (Settings → Collaborators di repo fork kamu).
3. Push branch kamu & buat Pull Request:
   ```bash
   git add .
   git commit -m "Add homepage automation with real locators"
   git push origin feat/homepage-automation
   ```
   Lalu buka GitHub → klik **Compare & pull request**.

---

## 🆘 Troubleshooting umum pemula

| Masalah | Solusi |
|---------|--------|
| `adb: command not found` | `ANDROID_HOME` & PATH belum di-set (TAHAP 3). Restart terminal. |
| `java: command not found` | JDK belum terinstall / `JAVA_HOME` salah (TAHAP 2). |
| Emulator tidak muncul di `adb devices` | pastikan emulator benar-benar menyala penuh dulu. |
| Appium gagal start | jalankan `appium driver doctor uiautomator2` & perbaiki ✗. |
| Test gagal "element not found" | locator di `home.page.js` masih salah/placeholder → ulangi TAHAP 9-10. |
| App tidak terbuka | cek `appPackage`/`appActivity` di `wdio.conf.js` sudah benar. |

---

## 📌 Urutan singkat (cheat sheet)

```
Node.js  ->  Java JDK  ->  Android Studio + SDK  ->  Emulator
   ->  Appium + driver  ->  Appium Inspector  ->  App 99
   ->  npm install  ->  ambil locator  ->  ganti TODO  ->  npm test  ->  PR
```

Selamat mencoba! Kerjakan satu tahap, pastikan ✅, baru lanjut tahap berikutnya.
```
