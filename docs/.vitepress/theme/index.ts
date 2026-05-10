import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick } from 'vue'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return // SSR guard

    // Lightbox: every content image becomes click-to-zoom via medium-zoom.
    // Re-attached on every route change because VitePress re-renders the page in place
    // and detaches old zoom instances when the DOM swaps.
    const setupZoom = async () => {
      const mediumZoom = (await import('medium-zoom')).default
      mediumZoom('.vp-doc :not(a) > img', {
        background: 'rgba(15, 23, 42, 0.92)', // slate-900 / 92 %
        margin: 24,
      })
    }

    if (router) {
      router.onAfterRouteChanged = () => nextTick(setupZoom)
    }
    nextTick(setupZoom) // first paint
  },
} satisfies Theme
