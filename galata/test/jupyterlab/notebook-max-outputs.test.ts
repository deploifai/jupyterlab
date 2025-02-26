// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { expect, galata, test } from '@jupyterlab/galata';

test.use({
  mockSettings: {
    ...galata.DEFAULT_SETTINGS,
    '@jupyterlab/notebook-extension:tracker': {
      ...galata.DEFAULT_SETTINGS['@jupyterlab/notebook-extension:tracker'],
      maxNumberOutputs: 5
    }
  }
});

test('Limit cell outputs', async ({ page }) => {
  await page.notebook.createNew();

  await page.locator(
    '.jp-Cell-inputArea >> .cm-editor >> .cm-content[contenteditable="true"]'
  ).type(`from IPython.display import display, Markdown

for i in range(10):
    display(Markdown('_Markdown_ **text**'))
`);

  await page.notebook.run();

  await expect(page.locator('.jp-RenderedMarkdown')).toHaveCount(5);
  await expect(page.locator('.jp-TrimmedOutputs')).toHaveText(
    'Show more outputs'
  );
});

test("Don't limit cell outputs if input is requested", async ({ page }) => {
  await page.notebook.createNew();

  await page.locator(
    '.jp-Cell-inputArea >> .cm-editor >> .cm-content[contenteditable="true"]'
  ).type(`from IPython.display import display, Markdown

for i in range(10):
    display(Markdown('_Markdown_ **text**'))

input('Your age:')
`);

  await page.menu.clickMenuItem('Run>Run All Cells');
  await expect(page.locator('.jp-RenderedMarkdown')).toHaveCount(10);

  await page.keyboard.press('Enter');
});

test('Display input value', async ({ page }) => {
  await page.notebook.createNew();

  await page.locator(
    '.jp-Cell-inputArea >> .cm-editor >> .cm-content[contenteditable="true"]'
  ).type(`from IPython.display import display, Markdown

for i in range(10):
    display(Markdown('_Markdown_ **text**'))

input('Your age:')

for i in range(10):
    display(Markdown('_Markdown_ **text**'))
`);

  await page.menu.clickMenuItem('Run>Run All Cells');
  await page.waitForSelector('.jp-Stdin >> text=Your age:');

  await page.keyboard.type('42');
  await page.keyboard.press('Enter');

  await expect(page.locator('.jp-RenderedMarkdown')).toHaveCount(10);
  await expect(page.locator('.jp-RenderedText').first()).toHaveText(
    'Your age: 42'
  );
});
