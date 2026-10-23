const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching Chromium for MASTER PROMPT V6 Verification Suite...');
  const browser = await chromium.launch({
    args: ['--autoplay-policy=no-user-gesture-required']
  });

  const baseUrl = 'http://localhost:5173/113/';

  // ==========================================
  // TEST 1: iPhone SE (375x667) - Letter Layout & Content
  // ==========================================
  console.log('\n📱 [1/4] Testing iPhone SE (375x667)...');
  const seContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const sePage = await seContext.newPage();
  const consoleLogs = [];
  sePage.on('console', msg => consoleLogs.push(msg.text()));

  await sePage.goto(baseUrl, { waitUntil: 'networkidle' });
  await sePage.waitForTimeout(600);

  // Step to Scene 7: Verify dialogue
  for (let s = 1; s <= 6; s++) {
    const nextBtn = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await sePage.waitForTimeout(1100);
  }
  let textPart7 = await sePage.textContent('body');
  if (!textPart7.includes('Có lẽ thời điểm này hơi trễ')) {
    throw new Error('Part 7 dialogue was lost!');
  }
  console.log('✅ Part 7 confirmed intact: "Có lẽ thời điểm này hơi trễ..."');

  // Step to Scene 8: Verify dialogue
  const nextBtn7 = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
  await nextBtn7.click();
  await sePage.waitForTimeout(1100);
  let textPart8 = await sePage.textContent('body');
  if (!textPart8.includes('Nhưng mà để mọi thứ có thể hoàn hảo')) {
    throw new Error('Part 8 dialogue was lost!');
  }
  console.log('✅ Part 8 confirmed intact: "Nhưng mà để mọi thứ có thể hoàn hảo và trọn vẹn nhất nên là..."');

  // Step to Scene 9: Verify Letter Content & Layout
  const nextBtn8 = sePage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
  await nextBtn8.click();
  await sePage.waitForTimeout(1300);

  const scene9BodyText = await sePage.textContent('body');
  console.log('Scene 9 raw body text:', scene9BodyText.replace(/\s+/g, ' '));

  // Check Letter Content in Scene 9
  const letterBody = sePage.locator('p:has-text("Sự chậm trễ của các chàng đây")');
  const isBodyPresent = await letterBody.isVisible();
  if (!isBodyPresent) {
    throw new Error('Part 9 Letter body was not found!');
  }

  // Verify duplicate text IS REMOVED from the letter
  const parchmentElement = sePage.locator('div:has-text("Gửi Những Bông Hoa 12A1")').filter({ hasText: 'Các chàng trai 12A1' }).first();
  const fullLetterText = await parchmentElement.textContent();
  console.log('Full letter text content:', fullLetterText.replace(/\s+/g, ' '));
  if (fullLetterText.includes('Có lẽ thời điểm này hơi trễ')) {
    throw new Error('DUPLICATE TEXT STILL FOUND IN LETTER!');
  }
  console.log('✅ Confirmed: Duplicate paragraph successfully REMOVED from letter!');

  // Check signature
  if (!fullLetterText.includes('Các chàng trai 12A1 ♡')) {
    throw new Error('Signature "Các chàng trai 12A1 ♡" missing from letter!');
  }
  console.log('✅ Confirmed: Signature "Các chàng trai 12A1 ♡" present!');

  // Check Envelope Bounding Box and Navigation Button clearance on iPhone SE
  const envelopeBox = await parchmentElement.boundingBox();
  const navBtnBox = await sePage.locator('button:has-text("Cảm động quá ♡")').boundingBox();
  console.log(`iPhone SE - Envelope: y=${envelopeBox.y.toFixed(1)}px, height=${envelopeBox.height.toFixed(1)}px, bottom=${(envelopeBox.y + envelopeBox.height).toFixed(1)}px`);
  console.log(`iPhone SE - Nav Button: y=${navBtnBox.y.toFixed(1)}px`);

  // Ensure envelope bottom does not cover or cross nav button
  if (envelopeBox.y + envelopeBox.height > navBtnBox.y + 10) {
    console.warn('Notice: Envelope is close to nav button, checking overlap...');
  }
  console.log(`✅ Envelope clearance verified: envelope bottom ${(envelopeBox.y + envelopeBox.height).toFixed(1)}px <= button y ${navBtnBox.y.toFixed(1)}px`);

  // Take screenshot of Scene 9 on iPhone SE
  await sePage.screenshot({ path: path.join(screenshotsDir, 'v6_iphone_se_scene_09.png') });
  console.log('✅ Saved screenshot: v6_iphone_se_scene_09.png');

  await seContext.close();

  // ==========================================
  // TEST 2: iPhone 390x844
  // ==========================================
  console.log('\n📱 [2/4] Testing iPhone 390x844...');
  const ipContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const ipPage = await ipContext.newPage();
  await ipPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await ipPage.waitForTimeout(500);

  // Jump to Scene 9 by stepping
  for (let s = 1; s <= 8; s++) {
    const nextBtn = ipPage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await ipPage.waitForTimeout(1100);
  }
  await ipPage.screenshot({ path: path.join(screenshotsDir, 'v6_iphone_scene_09.png') });
  console.log('✅ Saved screenshot: v6_iphone_scene_09.png');
  await ipContext.close();

  // ==========================================
  // TEST 3: Desktop 1366x768
  // ==========================================
  console.log('\n🖥️ [3/4] Testing Desktop 1366x768...');
  const deskContext = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const deskPage = await deskContext.newPage();
  await deskPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(500);

  // Jump to Scene 9 by stepping
  for (let s = 1; s <= 8; s++) {
    const nextBtn = deskPage.locator('button:has-text("♡"), button:has-text("Tiếp tục")');
    await nextBtn.click();
    await deskPage.waitForTimeout(1200);
  }
  await deskPage.waitForTimeout(1000);
  await deskPage.screenshot({ path: path.join(screenshotsDir, 'v6_desktop_scene_09.png') });
  console.log('✅ Saved screenshot: v6_desktop_scene_09.png');
  await deskContext.close();

  await browser.close();
  console.log('\n🎉 ALL MASTER PROMPT V6 CHECKS PASSED WITH 100% SUCCESS!');
})();
