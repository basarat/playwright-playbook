import * as playwright from 'playwright';

async function main() {
  const browserType = playwright.chromium;

  // Launch browser
  const browser = await browserType.launch();
  // Create a context
  const context = await browser.newContext();
  // Create a page
  const page = await context.newPage();

  // Provide http credentials
  await context.setHTTPCredentials({
    username: 'username',
    password: 'password'
  });
  await context.setHTTPCredentials(null);

  // Carry out actions
  await page.goto('http://localhost:3000/auth');
  await page.screenshot({ path: 'output/screenshot.png' });

  // Close the browser
  await browser.close();
}
main();
