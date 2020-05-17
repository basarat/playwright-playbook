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

  const messageSelector = '#message';
  const getMessageText = () => {
    const message = document.querySelector('#message');
    if (!message) throw new Error('no message');
    return message.innerHTML;
  };

  // Invalid request
  await key.fill('');
  await load.click();
  await page.waitForSelector(messageSelector);
  let text = await page.evaluate(getMessageText);
  assert.equal(text, 'Invalid Request', 'Failed for Invalid Request');


  // Invalid key
  await key.fill('invalid key');
  await load.click();
  await page.waitForSelector(messageSelector);
  text = await page.evaluate(getMessageText);
  assert.equal(text, 'Invalid Key', 'Failed for Invalid Key');


  // Valid key
  await key.fill('playwright');
  await load.click();
  await page.waitForSelector(messageSelector);
  text = await page.evaluate(getMessageText);
  assert.equal(text, 'Actions', 'Failed for Actions');

  // Verify actions
  const actionNames = await page.evaluate(() => {
    const actionNames = document.querySelectorAll('.action-name');
    return Array.from(actionNames).map(name => name.innerHTML);
  });
  assert.deepEqual(
    actionNames,
    ['Like', 'Comment', 'Share', 'Subscribe'],
    'Failed for Action Names'
  );

  // #region close browser
  // Close the browser
  await browser.close();
  // #endregion
}
main();
