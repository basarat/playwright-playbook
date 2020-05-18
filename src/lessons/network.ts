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
  // await page.goto('http://localhost:3000/actions');

  // Monitoring
  // page.on('request', request => {
  //   console.log('>>', request.method(), request.url(), request.postData());
  // });
  // page.on('response', response => {
  //   console.log(' <<', response.request().url(), response.status());
  // });

  // Intercepting
  // await page.route('**/api/actions', async (route, request) => {
  //   console.log(request.postData());
  //   // await route.continue();
  //   await route.continue({
  //     postData: JSON.stringify({ key: 'playwright' }),
  //   });
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

  // Refresh routes
  const getPage = async () => {
    const page = await context.newPage();
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
    await page.goto('http://localhost:3000/actions');
    return page;
  };
  const page = await getPage();

  // Load elements
  const key = await page.$('#key');
  const load = await page.$('#load');
  if (!key || !load) throw new Error('invalid page');

  // Invalid request
  await key.fill('');
  await load.click();
  // await page.waitForSelector('#message');
  await Promise.all([
    page.waitForResponse('**/api/actions'),
    load.click(),
  ]);
  const message = await page.$('#message');
  console.log('Message:', await message?.innerHTML());

  // #region close browser
  // Close the browser
  await new Promise(res => setTimeout(res, 2000));
  await browser.close();
  // #endregion
}
main();
