# Budget

Single-file HTML/JS budget tracker packaged for Android with Capacitor.

## Folder structure
See the tree in the chat / below. Edit the app in `www/index.html`; icons and splash are applied automatically when the APK is built.

## Build the APK (GitHub Actions)
1. Upload this whole folder to a GitHub repo (keep `.github/`).
2. Push to `main`, or Actions → **Build Budget APK** → Run workflow.
3. Download the `Personal-Budget-Tracker-APK` artifact (debug APK).

## Build locally
```
npm install
npm run check
npm run android      # adds android/, applies icon + splash, syncs
npx cap open android # build in Android Studio
```

## Changing the icon / splash
Replace the PNGs in `resources/` and `www/app-icon-*.png`, then re-run `npm run brand`.
The in-app splash (5 seconds, then PIN) is in `www/index.html` (`#boot-splash`, `setTimeout(..., 5000)`).
