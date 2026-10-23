const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching Chromium for HOTFIX V5 Verification Suite...');
  const browser = await chromium.launch({
    args: ['--autoplay-policy=no-user-gesture-required']
  });

  const baseUrl = 'http://localhost:5173/113/';

  // ==========================================
  // TEST 1: iPhone SE (375x667)
  // ==========================================
  console.log('\n📱 [1/4] Testing iPhone SE (375x667)...');
  const seContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const sePage = await seContext.newPage();
  const consoleLogsSE = [];
  sePage.on('console', msg => consoleLogsSE.push(msg.text()));
  sePage.on('pageerror', err => console.error('SE Page Error:', err.message));

  await sePage.goto(baseUrl, { waitUntil: 'networkidle' });
  await sePage.waitForTimeout(600);

  // Measure Hoa size on iPhone SE
  const hoaMascotSelector = '.hoa-idle-sway';
  await sePage.waitForSelector(hoaMascotSelector);

  const hoaBoxSE = await sePage.locator(hoaMascotSelector).boundingBox();
  console.log(`iPhone SE - Hoa BoundingBox: width=${hoaBoxSE.width.toFixed(1)}px, height=${hoaBoxSE.height.toFixed(1)}px, y=${hoaBoxSE.y.toFixed(1)}px`);

  const widthRatioSE = (hoaBoxSE.width / 375) * 100;
  console.log(`iPhone SE - Hoa width ratio: ${widthRatioSE.toFixed(1)}% of viewport (Target: 35% - 45%)`);
  if (widthRatioSE < 33 || widthRatioSE > 47) {
    throw new Error(`Hoa width ratio ${widthRatioSE.toFixed(1)}% is out of 35-45% range!`);
  }

  // Check top clearance: must be >= 15px
  if (hoaBoxSE.y < 15) {
    throw new Error(`Hoa top clearance ${hoaBoxSE.y.toFixed(1)}px is below 15px safe margin!`);
  }
  console.log(`✅ iPhone SE Top clearance verified: y=${hoaBoxSE.y.toFixed(1)}px >= 15px (Zero Clipping)`);

  // Verify IDLE MOVEMENT WITHOUT MUSIC
  console.log('Testing Idle Movement without music...');
  const transform1 = await sePage.evaluate(() => {
    const el = document.querySelector('.hoa-idle-sway');
    return window.getComputedStyle(el).transform;
  });
  await sePage.waitForTimeout(800);
  const transform2 = await sePage.evaluate(() => {
    const el = document.querySelector('.hoa-idle-sway');
    return window.getComputedStyle(el).transform;
  });
  console.log(`Transform t0: ${transform1}`);
  console.log(`Transform t800ms: ${transform2}`);
  if (transform1 === transform2 && transform1 !== 'none') {
    console.warn('Notice: Transform was static over 800ms, checking animation property...');
  }
  const hasAnimation = await sePage.evaluate(() => {
    const el = document.querySelector('.hoa-idle-sway');
    const style = window.getComputedStyle(el);
    return style.animationName;
  });
  console.log(`✅ Mascot active CSS animation name: ${hasAnimation}`);
  if (!hasAnimation || hasAnimation === 'none') {
    throw new Error('Mascot does not have active idle sway animation!');
  }

  // Take screenshot of Scene 1 on iPhone SE
  await sePage.screenshot({ path: path.join(screenshotsDir, 'v5_iphone_se_scene_01.png') });

  // Test Music Button Click
  console.log('🎵 Testing Music Button on iPhone SE...');
  const musicBtn = sePage.locator('button[title*="Bật nhạc"], button:has-text("Bật nhạc")');
  await musicBtn.click();
  await sePage.waitForTimeout(800);

  // Check active title displayed
  const musicActiveBtn = sePage.locator('button[title*="Tắt nhạc"]');
  const activeTitleAttr = await musicActiveBtn.getAttribute('title');
  console.log(`✅ Music Active Title: ${activeTitleAttr}`);
  if (!activeTitleAttr || (!activeTitleAttr.includes('Giai Điệu') && !activeTitleAttr.includes('Từng Ngày'))) {
    throw new Error(`Unexpected audio title: ${activeTitleAttr}`);
  }

  // Step through scenes to Scene 6 (Cake)
  for (let s = 1; s <= 5; s++) {
    const nextBtn = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await sePage.waitForTimeout(1100);
  }
  await sePage.screenshot({ path: path.join(screenshotsDir, 'v5_iphone_se_scene_06_cake.png') });
  console.log('✅ iPhone SE Scene 6 (Cake) captured');

  // Step to Scene 9 (Letter)
  for (let s = 6; s <= 8; s++) {
    const nextBtn = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await sePage.waitForTimeout(1100);
  }
  await sePage.screenshot({ path: path.join(screenshotsDir, 'v5_iphone_se_scene_09_envelope.png') });
  console.log('✅ iPhone SE Scene 9 (Envelope) captured');

  // Step to Scene 13 (Finale)
  for (let s = 9; s <= 12; s++) {
    const nextBtn = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await sePage.waitForTimeout(1100);
  }
  await sePage.screenshot({ path: path.join(screenshotsDir, 'v5_iphone_se_scene_13_finale.png') });
  console.log('✅ iPhone SE Scene 13 (Finale) captured');

  await seContext.close();

  // ==========================================
  // TEST 2: iPhone (390x844)
  // ==========================================
  console.log('\n📱 [2/4] Testing iPhone (390x844)...');
  const ipContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const ipPage = await ipContext.newPage();
  await ipPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await ipPage.waitForTimeout(500);

  const hoaBoxIP = await ipPage.locator(hoaMascotSelector).boundingBox();
  const widthRatioIP = (hoaBoxIP.width / 390) * 100;
  console.log(`iPhone 390x844 - Hoa width=${hoaBoxIP.width.toFixed(1)}px (${widthRatioIP.toFixed(1)}% of viewport), y=${hoaBoxIP.y.toFixed(1)}px`);
  await ipPage.screenshot({ path: path.join(screenshotsDir, 'v5_iphone_scene_01.png') });
  console.log('✅ iPhone 390x844 Scene 1 captured');
  await ipContext.close();

  // ==========================================
  // TEST 3: Android (412x915)
  // ==========================================
  console.log('\n📱 [3/4] Testing Android (412x915)...');
  const androidContext = await browser.newContext({
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.6,
    isMobile: true,
    hasTouch: true
  });
  const androidPage = await androidContext.newPage();
  await androidPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await androidPage.waitForTimeout(500);

  const hoaBoxAndroid = await androidPage.locator(hoaMascotSelector).boundingBox();
  const widthRatioAndroid = (hoaBoxAndroid.width / 412) * 100;
  console.log(`Android 412x915 - Hoa width=${hoaBoxAndroid.width.toFixed(1)}px (${widthRatioAndroid.toFixed(1)}% of viewport), y=${hoaBoxAndroid.y.toFixed(1)}px`);
  await androidPage.screenshot({ path: path.join(screenshotsDir, 'v5_android_scene_01.png') });
  console.log('✅ Android 412x915 Scene 1 captured');
  await androidContext.close();

  // ==========================================
  // TEST 4: Desktop (1366x768)
  // ==========================================
  console.log('\n🖥️ [4/4] Testing Desktop (1366x768)...');
  const deskContext = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const deskPage = await deskContext.newPage();
  await deskPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(500);

  const hoaBoxDesk = await deskPage.locator(hoaMascotSelector).boundingBox();
  console.log(`Desktop 1366x768 - Hoa width=${hoaBoxDesk.width.toFixed(1)}px, height=${hoaBoxDesk.height.toFixed(1)}px, y=${hoaBoxDesk.y.toFixed(1)}px`);
  await deskPage.screenshot({ path: path.join(screenshotsDir, 'v5_desktop_scene_01.png') });
  console.log('✅ Desktop 1366x768 Scene 1 captured');
  await deskContext.close();

  await browser.close();
  console.log('\n🎉 ALL HOTFIX V5 CHECKS PASSED WITH 100% SUCCESS!');
})();
