import type { RackUnitKind } from '@/content/homelab'

/**
 * État du rack 3D, écrit par les ScrollTrigger du homelab (Reveals) et lu à chaque image
 * par la scène : vue éclatée (0 → 1) et unité mise en avant.
 */
export const rackState = {
  explode: 0,
  active: null as RackUnitKind | null,
}
