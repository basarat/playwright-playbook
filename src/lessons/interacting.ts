import * as playwright from 'playwright';
import * as assert from 'assert';

async function main() {
  const browserType = playwright.chromium;

  // Launch browser
  const browser = await browserType.launch();
  // Create a context
  const context = await browser.newContext();
  // Create a page
  const page = await context.newPage();
  
  // Carry out actions
  const url = 'http://localhost:3000/actions';
  await page.goto(url);

  // Interacting
  await page.fill('#key', '');
  await page.click('#load');
  await page.screenshot({ path: 'output/invalid-request.png' });
  await page.fill('#key', 'invalid key');
  await page.click('#load');
  await page.screenshot({ path: 'output/invalid-key.png' });
  await page.fill('#key', 'playwright');
  await page.click('#load');
  await page.screenshot({ path: 'output/valid.png' });

  // Close the browser
  await browser.close();
}
main();
