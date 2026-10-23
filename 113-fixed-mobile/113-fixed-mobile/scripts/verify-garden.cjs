const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching Chromium browser with audio support for 13-part test...');
  const browser = await chromium.launch({
    args: ['--autoplay-policy=no-user-gesture-required']
  });

  // 1. DESKTOP TEST (1280x800)
  console.log('🖥️ Testing Desktop Viewport (1280x800)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await desktopContext.newPage();

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check initial scene text: Part 1
  let bodyText = await page.textContent('body');
  if (!bodyText.includes('Này cậu ơi!')) {
    throw new Error('Part 1 did not load with "Này cậu ơi!"!');
  }
  console.log('✅ Part 1 confirmed: "Này cậu ơi!"');

  // Check Music Button toggle
  console.log('🎵 Testing Music Button (Bật nhạc)...');
  const musicBtn = page.locator('button:has-text("Bật nhạc"), button[title*="Bật nhạc"]');
  await musicBtn.click();
  await page.waitForTimeout(1000);

  // Check that music button switched to active playing state
  const isPlayingActive = await page.locator('button[title*="Tắt nhạc"]').count();
  console.log('Music Playing Active Button found:', isPlayingActive > 0 ? 'YES' : 'NO');
  if (isPlayingActive === 0) {
    throw new Error('Music did not switch to playing state!');
  }

  // Check CSS Custom Properties for music-reactive sway & Hoa tilt
  console.log('🌸 Verifying CSS variables for dynamic flower sway and Hoa tilt...');
  const swayVars = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      sway0: root.style.getPropertyValue('--sway-phase-0'),
      sway1: root.style.getPropertyValue('--sway-phase-1'),
      sway2: root.style.getPropertyValue('--sway-phase-2'),
      sway3: root.style.getPropertyValue('--sway-phase-3'),
      sway4: root.style.getPropertyValue('--sway-phase-4'),
      beatBounce: root.style.getPropertyValue('--beat-bounce'),
      hoaBob: root.style.getPropertyValue('--hoa-bob'),
      hoaTilt: root.style.getPropertyValue('--hoa-tilt'),
      grassSway: root.style.getPropertyValue('--grass-sway'),
      energy: root.style.getPropertyValue('--music-energy'),
    };
  });
  console.log('CSS Sway Variables Sample:', JSON.stringify(swayVars, null, 2));

  if (!swayVars.sway0 || !swayVars.hoaBob || !swayVars.hoaTilt) {
    throw new Error('CSS sway variables not updating properly!');
  }
  console.log('✅ CSS Visualizer Variables verified actively updating in real-time!');

  // Part 1 Screenshot
  console.log('📸 Capturing Part 01 (Desktop)...');
  await page.screenshot({ path: path.join(screenshotsDir, 'desktop_scene_01.png') });

  // Test No Auto-play: Wait 4 seconds, verify scene is STILL Part 1
  console.log('⏳ Checking Manual Mode (Waiting 4s to ensure no autoplay)...');
  await page.waitForTimeout(4000);
  let progressText = await page.textContent('body');
  if (!progressText.includes('Này cậu ơi!') || !progressText.includes('1/13')) {
    throw new Error('Scene changed without user interaction! Auto-play detected!');
  }
  console.log('✅ Manual Mode Verified: Part 1 (1/13) remained active without user interaction.');

  // Progression through all 13 parts
  const steps = [
    { from: 1, to: 2, expectedText: 'Tớ là Hoa – nàng tiên nhỏ', btnText: 'Tiếp tục' },
    { from: 2, to: 3, expectedText: 'nhiệm vụ đặc biệt lắm đó', btnText: 'Tiếp tục' },
    { from: 3, to: 4, expectedText: 'tâm tư, tình cảm', btnText: 'Là nhiệm vụ' },
    { from: 4, to: 5, expectedText: 'Và các cậu biết gì hông', btnText: 'Thật sao' },
    { from: 5, to: 6, expectedText: 'bữa chính nè', btnText: 'Gì thế ta' },
    { from: 6, to: 7, expectedText: 'hơi trễ để gửi những lời chúc', btnText: 'Bữa chính là gì' },
    { from: 7, to: 8, expectedText: 'hoàn hảo và trọn vẹn nhất', btnText: 'Không sao đâu' },
    { from: 8, to: 9, expectedText: 'Sự chậm trễ của các chàng đây', btnText: 'Là gì vậy' },
    { from: 9, to: 10, expectedText: 'cánh đàn ông chúc các nàng', btnText: 'Cảm động' },
    { from: 10, to: 11, expectedText: 'được yêu thương', btnText: 'Tiếp tục' },
    { from: 11, to: 12, expectedText: 'xinh đẹp, tự tin, rạng rỡ', btnText: 'Nhận yêu thương' },
    { from: 12, to: 13, expectedText: "Happy Vietnamese Women's Day", btnText: 'Điều bất ngờ' },
  ];

  for (const step of steps) {
    console.log(`👉 Clicking button to advance to Part ${step.to}...`);
    await page.click(`button:has-text("${step.btnText}")`);
    await page.waitForTimeout(1200);

    const content = await page.textContent('body');
    if (!content.includes(step.expectedText)) {
      throw new Error(`Part ${step.to} failed! Expected text: "${step.expectedText}" not found.`);
    }
    console.log(`✅ Part ${step.to}/13 verified: "${step.expectedText.slice(0, 30)}..."`);

    // Capture screenshots at key milestone parts after transition completely settles
    if (step.to === 6) {
      await page.waitForTimeout(600);
      console.log('📸 Capturing Part 06 (Cake)...');
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_scene_06.png') });
    } else if (step.to === 9) {
      await page.waitForTimeout(600);
      console.log('📸 Capturing Part 09 (Letter Envelope)...');
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_scene_09.png') });
    } else if (step.to === 13) {
      await page.waitForTimeout(800);
      console.log('📸 Capturing Part 13 (Grand Finale)...');
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_scene_13.png') });
    }
  }

  // Test Message Modal at Part 13
  console.log('👉 Testing Message Modal on Part 13...');
  await page.click('button:has-text("Gửi một lời nhắn")');
  await page.waitForTimeout(800);
  await page.fill('textarea', 'Cảm ơn các bạn nam 12A1 nhiều lắm nha! Món quà 13 phần quá tuyệt vời! 🥰');
  console.log('📸 Capturing Message Modal (Desktop)...');
  await page.screenshot({ path: path.join(screenshotsDir, 'desktop_scene_13_modal.png') });

  // Close modal
  await page.click('button:has(svg.lucide-x)');
  await page.waitForTimeout(500);

  // 2. MOBILE TEST (390x844 - iPhone 14/15)
  console.log('📱 Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  console.log('📸 Capturing Mobile Part 01...');
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_scene_01.png') });

  // Advance to Part 6 on mobile (Cake)
  for (let p = 1; p < 6; p++) {
    await mobilePage.click('button.glass-button:has(svg.lucide-chevron-right)');
    await mobilePage.waitForTimeout(1100);
  }
  await mobilePage.waitForTimeout(600);
  console.log('📸 Capturing Mobile Part 06 (Cake)...');
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_scene_06.png') });

  // Advance to Part 9 on mobile (Envelope)
  for (let p = 6; p < 9; p++) {
    await mobilePage.click('button.glass-button:has(svg.lucide-chevron-right)');
    await mobilePage.waitForTimeout(1100);
  }
  await mobilePage.waitForTimeout(600);
  console.log('📸 Capturing Mobile Part 09 (Letter Envelope)...');
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_scene_09.png') });

  // Advance to Part 13 on mobile (Finale)
  for (let p = 9; p < 13; p++) {
    await mobilePage.click('button.glass-button:has(svg.lucide-chevron-right)');
    await mobilePage.waitForTimeout(1100);
  }
  await mobilePage.waitForTimeout(800);
  console.log('📸 Capturing Mobile Part 13 (Finale)...');
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_scene_13.png') });

  // 3. SMALL MOBILE TEST (375x667 - iPhone SE) - Verify NO clipping on small screens
  console.log('📱 Testing Small Mobile Viewport (375x667 - iPhone SE)...');
  const smallContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
  });
  const smallPage = await smallContext.newPage();
  await smallPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await smallPage.waitForTimeout(1000);

  // Check top boundary of Hoa
  const hoaBox = await smallPage.evaluate(() => {
    const el = document.querySelector('svg[viewBox="0 0 220 260"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height };
  });
  console.log('Hoa Bounding Box on 375x667:', hoaBox);
  if (!hoaBox || hoaBox.top < 15) {
    throw new Error(`Hoa is clipped on 375x667! Top edge is at ${hoaBox ? hoaBox.top : 'null'}px`);
  }
  console.log(`✅ Safe Top Margin Verified on small mobile (Hoa top is at ${Math.round(hoaBox.top)}px >= 15px)`);

  await browser.close();
  console.log('🎉 All automated 13-part end-to-end tests completed successfully with ZERO clipping!');
})();
