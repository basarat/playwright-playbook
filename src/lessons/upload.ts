import * as playwright from 'playwright';
import * as assert from 'assert';

async function main() {
  // #region create page
  const browserType = playwright.chromium;

  // Launch browser
  const browser = await browserType.launch({ headless: false });
  // Create a context
  const context = await browser.newContext();
  // Create a page
  const page = await context.newPage();
  await page.goto('http://localhost:3000/upload');
  // #endregion

  // Get the elements
  const fileInput = await page.$('input[type=file]');
  const uploadButton = await page.$('#upload');
  if (!fileInput || !uploadButton) throw new Error('Invalid page');

  // Set the file
  await fileInput.setInputFiles('./public/assets/upload.png');
  // await page.setInputFiles('input[type=file]', './public/assets/upload.png');

  // Upload
  await uploadButton.click();

  // Verify that uploaded
  await page.waitForSelector('#message');
  const message = await page.$('#message');
  assert.equal(await message?.innerHTML(), 'Uploaded', 'File upload failed');

  // #region close browser
  // Close the browser
  await new Promise(res => setTimeout(res, 2000));
  await browser.close();
  // #endregion
}
main();
