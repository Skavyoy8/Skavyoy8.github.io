import { expect, type Page, test } from '@playwright/test'
import { gotoHome, watchErrors } from './helpers'

/** Une page secondaire (habillage sombre : terminal, fond animé, mode calme). */
async function gotoLab(page: Page) {
  await page.goto('./lab/homelab/')
  await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true')
}

test.describe('terminal', () => {
  test('ouverture clavier, help, autocomplétion, historique, sudo, calm', async ({ page }) => {
    const errors = watchErrors(page)
    await gotoLab(page)
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

    await input.fill('rooms')
    await input.press('Enter')
    await expect(output).toContainText('Anonymous')

    await input.fill('sudo hire-luke')
    await input.press('Enter')
    await expect(output).toContainText('Accès accordé')

    await input.fill('calm')
    await input.press('Enter')
    const calmAfter = await page.locator('html').getAttribute('data-calm')
    await input.fill('calm')
    await input.press('Enter')
    await expect(page.locator('html')).not.toHaveAttribute('data-calm', calmAfter ?? '')

    await page.keyboard.press('Escape')
    await expect(term).toBeHidden()
    await page.keyboard.press('Control+k')
    await expect(term).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(term).toBeHidden()
    expect(errors).toEqual([])
  })
})

test.describe('fond animé et mode calme', () => {
  test('le fond s’anime, se fige en mode calme, et le contenu reste complet', async ({ page }, testInfo) => {
    const errors = watchErrors(page)
    await gotoLab(page)
    const canvas = page.locator('.ambient canvas')
    await expect(canvas).toHaveCount(1)
    if (testInfo.project.name === 'reduced-motion') {
      // Mouvement réduit demandé par le système : le mode calme est actif d'emblée.
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    } else {
      // Le fond ne s'anime qu'au premier geste du visiteur.
      await expect(canvas).toHaveAttribute('data-state', 'still')
      await page.mouse.wheel(0, 200)
      await expect(canvas).toHaveAttribute('data-state', 'live', { timeout: 5000 })
      await page.getByRole('button', { name: /Mode calme/ }).click()
      await expect(page.locator('html')).toHaveAttribute('data-calm', 'true')
    }
    await expect(canvas).toHaveAttribute('data-state', 'still')
    // En mode calme, rien n'attend le scroll : tout le contenu est visible tout de suite.
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((el) => getComputedStyle(el).opacity !== '1').length)
    expect(hidden).toBe(0)
    await expect(page.getByRole('img', { name: /Plan du rack/ })).toBeVisible()
    expect(errors).toEqual([])
  })
})

test.describe('contenu', () => {
  test('TryHackMe : les chiffres et les liens', async ({ page }) => {
    await gotoHome(page)
    const skills = page.locator('#competences')
    await skills.scrollIntoViewIfNeeded()
    await expect(skills.getByText('Top 35 %', { exact: true })).toBeVisible()
    await expect(skills.getByRole('link', { name: /Anonymous/ })).toHaveAttribute('href', 'https://tryhackme.com/room/anonymous')
    await expect(skills.getByRole('link', { name: /Voir mon profil/ })).toHaveAttribute('href', 'https://tryhackme.com/p/skavyoy8')
  })

  test('homelab : cliquer une pièce du rack affiche sa fiche', async ({ page }) => {
    await gotoHome(page)
    const lab = page.locator('#homelab')
    await lab.scrollIntoViewIfNeeded()
    await lab.getByRole('button', { name: /^Switch/ }).first().click()
    await expect(lab.getByText('Switch MokerLink').first()).toBeVisible()
  })

  test('contact : le bouton copie le pseudo Discord', async ({ page }) => {
    await gotoHome(page)
    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await contact.getByRole('button', { name: /mon pseudo Discord/ }).click()
    await expect(contact.getByText('Copié !')).toBeVisible()
    await expect(contact.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', 'https://www.instagram.com/luke_albt/')
  })
})
