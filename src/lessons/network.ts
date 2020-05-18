import * as playwright from 'playwright';
import * as assert from 'assert';

async function main() {
  // #region create page
  const browserType = playwright.chromium;

  // Launch browser
  const browser = await browserType.launch({ headless: false });
  // Create a context
  const context = await browser.newContext();
  // #endregion

  // Create a page
  // const page = await context.newPage();
  // const url = 'http://localhost:3000/actions';
  // await page.goto(url);

  // Monitoring
  // page.on('request', request => {
  //   console.log('>>', request.method(), request.url(), request.postData())
  // });
  // page.on('response', async response => {
  //   console.log(' <<', response.request().url(), response.status());
  // });

  // Intercepting
  // await page.route('**/api/actions', async (route, request) => {
  //   console.log(request.postData());
  //   await route.continue();
  // });

  // Mocking
  // await page.route('**/api/actions', async (route, request) => {
  //   await route.fulfill({
  //     status: 200,
  //     contentType: 'application/json',
  //     body: JSON.stringify([
  //       { name: 'Like', image: '/assets/like.png' },
  //       { name: 'Comment', image: '/assets/comment.png' },
  //       { name: 'Share', image: '/assets/share.png' },
  //       { name: 'Subscribe', image: '/assets/subscribe.png' },
  //     ]),
  //   });
  // });

  const getMockedPage = async () => {
    const page = await context.newPage();
    const url = 'http://localhost:3000/actions';
    await page.goto(url);
    await page.route('**/api/actions', async (route, request) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { name: 'Like', image: '/assets/like.png' },
          { name: 'Comment', image: '/assets/comment.png' },
          { name: 'Share', image: '/assets/share.png' },
          { name: 'Subscribe', image: '/assets/subscribe.png' },
        ]),
      });
    });
    return page;
  }

  const page = await getMockedPage();

  // Interacting
  const key = await page.$('#key');
  const load = await page.$('#load');
  if (!key) throw new Error('no key input');
  if (!load) throw new Error('no load button');

  // Invalid request
  await key.fill('');
  // await load.click();
  // await page.waitForSelector('#message');
  await Promise.all([
    page.waitForResponse('**/api/actions'),
    load.click(),
  ]);
  const message = await page.$('#message');
  console.log({ message: await message?.innerHTML() });

  // #region close browser
  // Close the browser
  await new Promise(res => setTimeout(res, 2000));
  await browser.close();
  // #endregion
}
main();
