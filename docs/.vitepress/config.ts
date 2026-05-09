import { defineConfig } from 'vitepress'
import { defaultTheme } from '@vue/theme'

export default defineConfig({
  title: 'Yatra Documentation',
  description: 'Complete documentation for Yatra WordPress travel booking plugin',
  lang: 'en-US',
  
  // SEO and Meta
  head: [
    ['meta', { name: 'keywords', content: 'Yatra, WordPress, travel booking, tour booking, hotel booking, documentation' }],
    ['meta', { name: 'author', content: 'MantraBrain' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Yatra Documentation' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@mantrabrain' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }]
  ],

  // Theme Configuration
  theme: defaultTheme({
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Settings', link: '/guide/booking-settings' },
      { text: 'Integrations', link: '/guide/woocommerce-integration' },
      { text: 'FAQs', link: '/guide/faqs' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Booking Settings', link: '/guide/booking-settings' },
          { text: 'Payment Settings', link: '/guide/payment-settings' },
          { text: 'Email Settings', link: '/guide/email-settings' },
          { text: 'General Settings', link: '/guide/general-settings' }
        ]
      },
      {
        text: 'Booking Types',
        items: [
          { text: 'Tour Booking', link: '/guide/tour-booking' },
          { text: 'Hotel Booking', link: '/guide/hotel-booking' },
          { text: 'Activity Booking', link: '/guide/activity-booking' },
          { text: 'Destination Booking', link: '/guide/destination-booking' }
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'WooCommerce', link: '/guide/woocommerce-integration' },
          { text: 'Elementor', link: '/guide/elementor-integration' },
          { text: 'Wanderland Theme', link: '/guide/wanderland-theme' },
          { text: 'Third-party Plugins', link: '/guide/third-party-integrations' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Shortcodes', link: '/guide/shortcodes' },
          { text: 'Hooks & Filters', link: '/guide/hooks-filters' },
          { text: 'Custom Templates', link: '/guide/custom-templates' },
          { text: 'API Reference', link: '/guide/api-reference' }
        ]
      },
      {
        text: 'Support',
        items: [
          { text: 'FAQs', link: '/guide/faqs' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          { text: 'Changelog', link: '/guide/changelog' },
          { text: 'Contact Support', link: '/guide/support' }
        ]
      }
    ],

    footer: {
      message: 'Released under the GPL-2.0+ License.',
      copyright: 'Copyright © 2024 MantraBrain'
    },

    editLink: {
      pattern: 'https://github.com/mantrabrain/yatra/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantrabrain/yatra' },
      { icon: 'twitter', link: 'https://twitter.com/mantrabrain' },
      { icon: 'globe', link: 'https://wpyatra.com' }
    ],

    search: {
      provider: 'local'
    },

    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    }
  }),

  // Build Configuration
  base: '/',
  outDir: '.vitepress/dist',
  cacheDir: '.vitepress/cache',

  // Markdown Configuration
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    config: (md) => {
      // Add custom markdown-it plugins here if needed
    }
  },

  // Ignore dead links for missing documentation pages
  ignoreDeadLinks: true,

  // Vite Configuration
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    server: {
      host: true,
      port: 3000
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'],
            vitepress: ['vitepress']
          }
        }
      }
    },
    optimizeDeps: {
      exclude: ['vitepress']
    }
  },

  // SEO Optimization
  sitemap: {
    hostname: 'https://docs.wpyatra.com',
    transformItems: (items) => {
      return items.map((item) => {
        return {
          ...item,
          lastmod: new Date().toISOString()
        }
      })
    }
  },

  // Page Data Transformation
  transformHead: ({ pageData }) => {
    const head: any[] = []
    
    // Add canonical URL
    head.push([
      'link',
      {
        rel: 'canonical',
        href: `https://docs.wpyatra.com${pageData.frontmatter?.permalink || pageData.relativePath}`
      }
    ])

    // Add structured data for documentation
    if (pageData.frontmatter?.title) {
      head.push([
        'script',
        {
          type: 'application/ld+json'
        },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: pageData.frontmatter.title,
          description: pageData.frontmatter?.description || pageData.description,
          author: {
            '@type': 'Organization',
            name: 'MantraBrain',
            url: 'https://mantrabrain.com'
          },
          publisher: {
            '@type': 'Organization',
            name: 'MantraBrain',
            logo: {
              '@type': 'ImageObject',
              url: 'https://docs.wpyatra.com/logo.svg'
            }
          },
          datePublished: pageData.frontmatter?.date || new Date().toISOString(),
          dateModified: new Date().toISOString()
        })
      ])
    }

    return head
  }
})
