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

  const key = await page.$('#key');
  const load = await page.$('#load');
  if (!key) throw new Error('no key input');
  if (!load) throw new Error('no load button');

  await key.fill('');
  await load.click();
  await page.screenshot({ path: 'output/invalid-request-1.png' });
  await key.fill('invalid key');
  await load.click();
  await page.screenshot({ path: 'output/invalid-key-1.png' });
  await key.fill('playwright');
  await load.click();
  await page.screenshot({ path: 'output/valid-1.png' });

  // Close the browser
  await browser.close();
}
main();
