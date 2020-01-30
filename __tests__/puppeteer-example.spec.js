/*
 * Copyright (c) 2018 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

// eslint is looking for `puppeteer` at root level package.json
// eslint-disable-next-line import/no-unresolved
const puppeteer = require('puppeteer-core');

describe('jest-image-snapshot usage with an image received from puppeteer', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: './node_modules/chromium/lib/chromium/chrome-linux/chrome',
      args: ['--proxy-server=167.123.1.2:8008'],
    });
  });

  it('works', async () => {
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });
});
