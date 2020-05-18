import * as playwright from 'playwright';
import * as assert from 'assert';

async function main() {
  // #region create page
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
  // #endregion

  // Interacting
  const key = await page.$('#key');
  const load = await page.$('#load');
  if (!key) throw new Error('no key input');
  if (!load) throw new Error('no load button');

  page.on('request', request => {
    console.log('>>', request.method(), request.url(), request.postData())
  });
  page.on('response', async response =>{
    console.log('<<', response.request().url(), response.status());
  });

  // Invalid request
  await key.fill('');
  await load.click();

  // Invalid key
  await key.fill('invalid key');
  await load.click();

  // Valid key
  await key.fill('playwright');
  await load.click();
  
  // #region close browser
  // Close the browser
  await new Promise(res => setTimeout(res, 2000));
  await browser.close();
  // #endregion
}
main();
