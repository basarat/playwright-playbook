import * as playwright from 'playwright';

async function main() {
  const browserType = playwright.chromium;

  // Launch browser
  const browser = await browserType.launch({
    headless: false
  });
  // Create a context
  const context = await browser.newContext();
  // Create a page
  const page = await context.newPage();

  // Carry out actions
  context.setHTTPCredentials({
    username: 'username',
    password: 'password'
  });
  page.goto('http://localhost:3000');
}
main();
