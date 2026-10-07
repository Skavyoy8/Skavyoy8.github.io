import { defineConfig, devices } from '@playwright/test'

// Les tests tournent sur le build statique servi avec un basePath,
// pour attraper tout chemin qui ne passerait pas par asset() ou next/link.
const BASE = '/e2e-base'
const PORT = 4173

// WebGL logiciel (SwiftShader) pour que la scène 3D tourne aussi en headless.
const webglArgs = ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist']

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}${BASE}/`,
    trace: 'retain-on-failure',
    launchOptions: { args: webglArgs },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'reduced-motion',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
  ],
  webServer: {
    command: `npm run build:e2e && BASE_PATH=${BASE} PORT=${PORT} node scripts/serve-out.mjs`,
    url: `http://localhost:${PORT}${BASE}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
