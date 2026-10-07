import { expect, test } from '@playwright/test'

test('la page d’accueil s’affiche avec un seul h1', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
})
