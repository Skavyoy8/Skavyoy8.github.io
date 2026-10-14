import { expect, test } from '@playwright/test'
import { expectNoSeriousA11yViolations, gotoHome, scrollThrough, SECTIONS, watchErrors } from './helpers'

test.describe('accueil', () => {
  test('toutes les sections existent, un seul h1, lang fr, 0 erreur console', async ({ page }) => {
    const errors = watchErrors(page)
    await gotoHome(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached()
    await expect(page.getByRole('heading', { level: 1, name: /Cybersécurité/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Luke, alias Skavyoy : retour en haut/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeAttached()
    await scrollThrough(page)
    expect(errors).toEqual([])
  })

  test('0 violation axe serious/critical', async ({ page }, testInfo) => {
    await gotoHome(page)
    await scrollThrough(page)
    await expectNoSeriousA11yViolations(page, testInfo)
  })

  test('navigation par ancres', async ({ page }) => {
    await gotoHome(page)
    const desktop = (page.viewportSize()?.width ?? 0) > 700
    if (desktop) {
      await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Homelab' }).click()
      await expect(page.locator('#homelab')).toBeInViewport({ timeout: 6000 })
      return
    }
    // Sur téléphone, le menu des sections est masqué : le bouton « Me contacter » reste.
    await page.getByRole('link', { name: 'Me contacter' }).first().click()
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 6000 })
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
