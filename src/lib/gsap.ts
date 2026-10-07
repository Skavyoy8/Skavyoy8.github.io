'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase)
  // Easing principal du BRIEF : cubic-bezier(0.16, 1, 0.3, 1)
  CustomEase.create('signal', '0.16,1,0.3,1')
  gsap.defaults({ ease: 'signal', duration: 0.9 })
}

export const SCRAMBLE_CHARS = '01<>/\\[]{}—=+*#_'

export { gsap, ScrollTrigger, SplitText, useGSAP }
