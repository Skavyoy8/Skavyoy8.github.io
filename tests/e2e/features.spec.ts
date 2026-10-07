import { expect, type Page, test } from '@playwright/test'
import { gotoHome, skipPreloader, watchErrors } from './helpers'

async function openRooms(page: Page) {
  await page.locator('#rooms').scrollIntoViewIfNeeded()
  return page.locator('#rooms')
}

test.describe('rooms', () => {
  test('filtres, recherche, tri et état vide', async ({ page }) => {
    const errors = watchErrors(page)
    await skipPreloader(page)
    await gotoHome(page)
    const rooms = await openRooms(page)
    const filters = rooms.getByRole('group', { name: 'Filtrer par catégorie' })
    const count = rooms.locator('[data-rooms-count]')
    const all = rooms.locator('[data-room]')

    await expect(all).toHaveCount(1)
    await filters.getByRole('button', { name: /^Web/ }).click()
    await expect(filters.getByRole('button', { name: /^Web/ })).toHaveAttribute('aria-pressed', 'true')
    await expect(rooms.locator('[data-rooms-empty]')).toBeVisible()
    await expect(count).toContainText('0')

    await filters.getByRole('button', { name: /^Challenges/ }).click()
    await expect(all).toHaveCount(1)
    await expect(rooms.getByRole('heading', { name: 'Anonymous' })).toBeVisible()

    await filters.getByRole('button', { name: /^Tout/ }).click()
    await rooms.getByRole('searchbox').fill('zzz-introuvable')
    await expect(rooms.locator('[data-rooms-empty]')).toBeVisible()
    await rooms.getByRole('button', { name: 'Tout afficher' }).click()
    await expect(all).toHaveCount(1)
    await rooms.getByRole('searchbox').fill('smb')
    await expect(all).toHaveCount(1)

    const sort = rooms.getByRole('group', { name: 'Trier par' })
    await sort.getByRole('button', { name: 'Difficulté' }).click()
    await expect(sort.getByRole('button', { name: 'Difficulté' })).toHaveAttribute('aria-pressed', 'true')
    expect(errors).toEqual([])
  })

  test('un pilier filtre les rooms', async ({ page }) => {
    await skipPreloader(page)
    await gotoHome(page)
    await page.getByRole('button', { name: 'Voir mes rooms réseau' }).click()
    const filters = page.locator('#rooms').getByRole('group', { name: 'Filtrer par catégorie' })
    await expect(filters.getByRole('button', { name: /^Réseau/ })).toHaveAttribute('aria-pressed', 'true')
  })
})

test.describe('terminal', () => {
  test('ouverture clavier, help, autocomplétion, historique, sudo, calm, cd', async ({ page }) => {
    // Une quinzaine d'étapes, dont deux bascules du mode calme : test long, délai triplé.
    test.slow()
    const errors = watchErrors(page)
    await skipPreloader(page)
    await gotoHome(page)
    await page.keyboard.press('Control+k')
    const term = page.getByRole('dialog', { name: 'Terminal du portfolio' })
    await expect(term).toBeVisible()
    const input = term.getByRole('textbox', { name: 'Commande' })
    const output = term.getByRole('log')

    await input.fill('help')
    await input.press('Enter')
    await expect(output).toContainText('whoami')

    await input.fill('wh')
    await input.press('Tab')
    await expect(input).toHaveValue('whoami ')
    await input.press('Enter')
    await expect(output).toContainText('Bac Pro CIEL')
    await input.press('ArrowUp')
    await expect(input).toHaveValue('whoami')

    await input.fill('sudo hire-luke')
    await input.press('Enter')
    await expect(output).toContainText('Accès accordé')

    await input.fill('calm')
    await input.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('data-calm', /true|false/)
    const calmAfter = await page.locator('html').getAttribute('data-calm')
    await input.fill('calm')
    await input.press('Enter')
    await expect(page.locator('html')).not.toHaveAttribute('data-calm', calmAfter ?? '')

    await input.fill('cd lab')
    await input.press('Enter')
    await expect(term).toBeHidden()
    await expect(page.locator('#lab')).toBeInViewport({ timeout: 6000 })

    await page.keyboard.press('Control+k')
    await expect(term).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(term).toBeHidden()
    expect(errors).toEqual([])
  })
})

test.describe('mode calme et 3D', () => {
  test('le fond 3D (ordinateur seulement) se coupe en mode calme, le contenu reste', async ({ page }, testInfo) => {
    await skipPreloader(page)
    await gotoHome(page)
    // L'image statique du ruban est toujours là, sous la 3D.
    await expect(page.locator('.ribbon-poster')).toBeAttached()
    if (testInfo.project.name === 'reduced-motion') {
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    } else if (testInfo.project.name === 'mobile') {
      // Sur téléphone, pas de 3D pour l'instant : l'image statique suffit.
      await page.waitForTimeout(2500)
      await expect(page.locator('canvas')).toHaveCount(0)
      await page.getByRole('button', { name: /Mode calme/ }).first().click()
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    } else {
      // Sur ordinateur, la scène (ruban + rack) arrive une fois la page affichée,
      // sauf sans GPU (rendu logiciel, comme ici en CI) : l'image statique reste, c'est voulu.
      await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true')
      await page.waitForTimeout(3000)
      const software = (await page.locator('html').getAttribute('data-render')) === 'software'
      await expect(page.locator('canvas')).toHaveCount(software ? 0 : 1, { timeout: 20000 })
      await page.getByRole('button', { name: /Mode calme/ }).first().click()
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    }
    await expect(page.locator('canvas')).toHaveCount(0)
    await page.locator('#lab').scrollIntoViewIfNeeded()
    // Le rack garde son équivalent accessible, et son dessin de secours en mode calme.
    await expect(page.getByRole('img', { name: /Plan du rack/ })).toBeVisible()
    await expect(page.locator('.rack-fallback')).toBeVisible()
    await expect(page.locator('[data-badge]')).toBeAttached()
  })

  test('badge : se retourne au clic et au clavier', async ({ page }) => {
    const errors = watchErrors(page)
    await skipPreloader(page)
    await gotoHome(page)
    const badge = page.locator('[data-badge]')
    await badge.scrollIntoViewIfNeeded()
    const flip = page.getByRole('button', { name: /Retourner le badge/ })
    await expect(badge).toHaveAttribute('data-flipped', 'false')
    await flip.click()
    await expect(badge).toHaveAttribute('data-flipped', 'true')
    await expect(flip).toHaveAttribute('aria-pressed', 'true')
    await flip.press('Enter')
    await expect(badge).toHaveAttribute('data-flipped', 'false')
    expect(errors).toEqual([])
  })

  test('Konami code', async ({ page }) => {
    await skipPreloader(page)
    await gotoHome(page)
    // Un clic « brut » dans la page pour lui donner le focus clavier.
    await page.mouse.click(5, 300)
    for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) await page.keyboard.press(key)
    // Plusieurs zones « status » existent (toasts, sortie du curseur de signal) : on vise le toast par son texte.
    await expect(page.getByRole('status').filter({ hasText: 'Signal intercepté' })).toBeVisible()
  })
})
