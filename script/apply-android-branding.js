// Copies the Budget icon + splash into the generated Capacitor Android project.
// Run after `npx cap add android` (the CI workflow does this for you).
const fs = require('node:fs');
const path = require('node:path');

const RES = path.join('android', 'app', 'src', 'main', 'res');
if (!fs.existsSync(RES)) { console.error('android/ not found. Run: npx cap add android'); process.exit(1); }

// 1) launcher icons (legacy + round + adaptive foreground)
const src = path.join('resources', 'android');
for (const dir of fs.readdirSync(src)) {
  const to = path.join(RES, dir); fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(path.join(src, dir))) fs.copyFileSync(path.join(src, dir, f), path.join(to, f));
}

// 2) adaptive icon background colour = icon tile colour
const bgFile = path.join(RES, 'values', 'ic_launcher_background.xml');
fs.writeFileSync(bgFile, '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#F5F5F9</color>\n</resources>\n');

// 3) native splash image (shown before the WebView starts)
for (const d of fs.readdirSync(RES).filter(d => /^drawable/.test(d))) {
  const f = path.join(RES, d, 'splash.png');
  if (fs.existsSync(f)) fs.copyFileSync(path.join('resources', 'splash.png'), f);
}

// 4) Android 12+ system splash: same colour + same icon
const styles = path.join(RES, 'values', 'styles.xml');
let x = fs.readFileSync(styles, 'utf8');
if (!x.includes('windowSplashScreenBackground')) {
  x = x.replace(/(<style name="AppTheme\.NoActionBarLaunch"[^>]*>)/,
    '$1\n        <item name="windowSplashScreenBackground">#F5F5F9</item>\n        <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher_foreground</item>');
  fs.writeFileSync(styles, x);
}
console.log('Budget icon + splash applied to Android project');
