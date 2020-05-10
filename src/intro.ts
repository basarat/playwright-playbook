import * as playwright from 'playwright';

async function main() {
  const { chromium, webkit, firefox } = playwright;
  for (const browserType of [chromium, webkit, firefox]) {
    // Launch browser
    const browser = await browserType.launch();
    // Create a context
    const context = await browser.newContext();
    // Create a page
    const page = await context.newPage();

    // Carry out actions
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `output/example-${browserType.name}.png` });

    // Close the browser
    await browser.close();
  }
}
main();