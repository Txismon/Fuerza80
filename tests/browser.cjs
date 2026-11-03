// Run with Playwright installed: node tests/browser.cjs (server on localhost:8080).
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:Number(process.env.VIEWPORT_WIDTH)||375,height:667},isMobile:true,hasTouch:true});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8080');await page.locator('[data-action="guide"]').first().waitFor();
 assert.equal(await page.title(),'Fuerza80');
 await page.locator('[data-field="kg"]').first().fill('40');
 const initial=await page.evaluate(()=>JSON.stringify(draft));
 for(const day of ['A','B','C']){
  await page.locator(`[data-action="day"][data-day="${day}"]`).click();
  const buttons=page.locator('[data-action="guide"]');assert.equal(await buttons.count(),6);
  for(let i=0;i<6;i++){
   await buttons.nth(i).click();assert(await page.locator('#exerciseGuide').evaluate(x=>x.open));
   await page.locator('#guideImage').evaluate(img=>img.decode());
   assert(await page.locator('#guideTip').textContent());
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(day==='A'&&i===0)await page.screenshot({path:'/workspace/fuerza80-guia.png'});
   await page.locator('#closeGuide').click();assert.equal(await page.locator('#exerciseGuide').evaluate(x=>x.open),false);
  }
 }
 await page.locator('[data-action="day"][data-day="A"]').click();assert.equal(await page.evaluate(()=>JSON.stringify(draft)),initial);
 await page.locator('[data-action="guide"]').first().click();await page.keyboard.press('Escape');assert.equal(await page.locator('#exerciseGuide').evaluate(x=>x.open),false);
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
 await context.setOffline(true);await page.reload();await page.locator('[data-action="guide"]').first().click();await page.locator('#guideImage').evaluate(img=>img.decode());
 assert.equal(errors.length,0,errors.join('\n'));
 await browser.close();console.log('OK: 18 guías, modal, pantalla móvil, borrador intacto, Escape y guía offline.');
})().catch(err=>{console.error(err);process.exit(1)});
