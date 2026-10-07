import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'

export const SECTIONS = ['accueil', 'a-propos', 'interets', 'lab', 'parcours', 'rooms', 'badges', 'reseaux'] as const

/** Collecte les erreurs console et les exceptions de la page. */
export function watchErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))
  return errors
}

/** Saute le préloader (déjà vu dans la session). */
export async function skipPreloader(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem('skavyoy:booted', '1'))
}

export async function gotoHome(page: Page) {
  await page.goto('./')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true')
}

/** Parcourt toute la page pour déclencher les révélations au scroll. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 70))
    }
    window.scrollTo(0, 0)
  })
  // Les apparitions au scroll doivent être finies (opacité 1) avant de mesurer quoi que ce soit.
  await page.waitForFunction(
    () => [...document.querySelectorAll('[data-reveal="fade"], [data-reveal="stagger"] > *')].every((el) => getComputedStyle(el).opacity === '1'),
    undefined,
    { timeout: 15000 },
  )
}

export async function expectNoSeriousA11yViolations(page: Page, testInfo: TestInfo) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  if (serious.length) {
    await testInfo.attach('axe-violations', { body: JSON.stringify(serious, null, 2), contentType: 'application/json' })
  }
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
}
