import { expect, test } from '@playwright/test'
import { expectNoSeriousA11yViolations, gotoHome, scrollThrough, SECTIONS, skipPreloader, watchErrors } from './helpers'

test.describe('accueil', () => {
  test('toutes les sections existent, un seul h1, lang fr, 0 erreur console', async ({ page }) => {
    const errors = watchErrors(page)
    await skipPreloader(page)
    await gotoHome(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached()
    await expect(page.getByRole('heading', { level: 1, name: /Skavyoy/ })).toBeVisible()
    await expect(page.locator('a[href="#contenu"]')).toBeAttached()
    await scrollThrough(page)
    expect(errors).toEqual([])
  })

  test('0 violation axe serious/critical', async ({ page }, testInfo) => {
    await skipPreloader(page)
    await gotoHome(page)
    await scrollThrough(page)
    await expectNoSeriousA11yViolations(page, testInfo)
  })

  test('le préloader s’affiche une fois puis se retire', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'reduced-motion', 'pas de préloader en mode calme')
    const errors = watchErrors(page)
    await page.goto('./')
    await expect(page.locator('.preloader')).toBeVisible()
    await expect(page.locator('.preloader')).toBeHidden({ timeout: 4000 })
    await expect(page.locator('html')).toHaveAttribute('data-booted', 'true')
    expect(errors).toEqual([])
  })

  test('navigation par ancres depuis le menu', async ({ page }) => {
    await skipPreloader(page)
    await gotoHome(page)
    await page.getByRole('button', { name: 'Menu' }).click()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: /Rooms/ }).click()
    await expect(menu).toBeHidden()
    await expect(page.locator('#rooms')).toBeInViewport({ timeout: 6000 })
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  })

  test('pages secondaires : détail du lab et /link/', async ({ page }) => {
    const errors = watchErrors(page)
    await page.goto('./lab/homelab/')
    await expect(page.getByRole('heading', { level: 1, name: 'Homelab MS-01' })).toBeVisible()
    await expect(page.getByRole('img', { name: /Plan du rack/ })).toBeVisible()
    await page.goto('./link/')
    await expect(page.getByRole('heading', { level: 1, name: /Skavyoy/ })).toBeVisible()
    await page.goto('./sitemap.xml')
    expect(await page.content()).toContain('/lab/homelab/')
    expect(errors).toEqual([])
  })
})
