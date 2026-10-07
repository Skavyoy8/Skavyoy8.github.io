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
  test('le mode calme coupe la 3D et garde tout le contenu', async ({ page }, testInfo) => {
    await skipPreloader(page)
    await gotoHome(page)
    if (testInfo.project.name === 'reduced-motion') {
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    } else {
      await expect(page.locator('canvas')).toHaveCount(1, { timeout: 15000 })
      await page.getByRole('button', { name: /Mode calme|Calme/ }).first().click()
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    }
    await expect(page.locator('canvas')).toHaveCount(0)
    await expect(page.locator('.signal-fallback').first()).toBeAttached()
    await page.locator('#lab').scrollIntoViewIfNeeded()
    await expect(page.getByRole('img', { name: /Plan du rack/ })).toBeVisible()
    await expect(page.locator('[data-badge-stage="static"]')).toBeAttached()
  })

  test('badge lanyard : drag souris ou tactile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'reduced-motion', 'fallback statique en mode calme')
    const errors = watchErrors(page)
    await skipPreloader(page)
    await gotoHome(page)
    await expect(page.locator('canvas')).toHaveCount(1, { timeout: 15000 })
    const stage = page.locator('[data-badge-stage]')
    await stage.scrollIntoViewIfNeeded()
    await expect(stage).toHaveAttribute('data-badge-stage', '3d', { timeout: 20000 })
    await page.waitForTimeout(2500)
    const view = page.locator('[data-badge-3d]')
    const box = await view.boundingBox()
    if (!box) throw new Error('vue du badge introuvable')
    // Vrais événements : souris en desktop, doigt (CDP) sur mobile.
    const touch = testInfo.project.name === 'mobile'
    const cdp = touch ? await page.context().newCDPSession(page) : null
    const down = async (px: number, py: number) => {
      if (cdp) await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: px, y: py }] })
      else {
        await page.mouse.move(px, py)
        await page.mouse.down()
      }
    }
    const move = async (px: number, py: number) => {
      if (cdp) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: px, y: py }] })
      else await page.mouse.move(px, py, { steps: 2 })
    }
    const up = async () => {
      if (cdp) await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      else await page.mouse.up()
    }
    // La carte se balance : on cherche un point où elle se trouve, comme le ferait un doigt.
    let x = 0
    let y = 0
    let grabbed = false
    for (const fy of [0.5, 0.42, 0.58, 0.35, 0.65, 0.28, 0.72]) {
      for (const fx of [0.5, 0.4, 0.6]) {
        x = box.x + box.width * fx
        y = box.y + box.height * fy
        await down(x, y)
        if ((await view.getAttribute('data-dragging')) === 'true') {
          grabbed = true
          break
        }
        await up()
      }
      if (grabbed) break
    }
    expect(grabbed).toBe(true)
    for (let i = 1; i <= 6; i++) await move(x - i * 25, y + i * 10)
    await up()
    await expect(view).toHaveAttribute('data-dragging', 'false')
    expect(errors).toEqual([])
  })

  test('Konami code', async ({ page }) => {
    await skipPreloader(page)
    await gotoHome(page)
    await page.locator('body').click({ position: { x: 5, y: 300 } })
    for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) await page.keyboard.press(key)
    await expect(page.getByRole('status')).toContainText('Signal intercepté')
  })
})
