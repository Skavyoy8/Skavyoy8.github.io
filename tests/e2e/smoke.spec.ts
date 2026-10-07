import { expect, test } from '@playwright/test'
import { expectNoSeriousA11yViolations, gotoHome, scrollThrough, SECTIONS, watchErrors } from './helpers'

test.describe('accueil', () => {
  test('toutes les sections existent, un seul h1, lang fr, 0 erreur console', async ({ page }) => {
    const errors = watchErrors(page)
    await gotoHome(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached()
    await expect(page.getByRole('heading', { level: 1, name: /Luke, alias Skavyoy/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Skavyoy, accueil/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeAttached()
    await scrollThrough(page)
    expect(errors).toEqual([])
  })

  test('0 violation axe serious/critical', async ({ page }, testInfo) => {
    await gotoHome(page)
    await scrollThrough(page)
    await expectNoSeriousA11yViolations(page, testInfo)
  })

  test('navigation par ancres (barre sur ordinateur, menu sur téléphone)', async ({ page }) => {
    await gotoHome(page)
    const desktop = (page.viewportSize()?.width ?? 0) >= 1024
    if (desktop) {
      await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Homelab' }).click()
      await expect(page.locator('#homelab')).toBeInViewport({ timeout: 6000 })
      return
    }
    await page.getByRole('button', { name: 'Menu' }).click()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: /TryHackMe/ }).click()
    await expect(menu).toBeHidden()
    await expect(page.locator('#pratique')).toBeInViewport({ timeout: 6000 })
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
