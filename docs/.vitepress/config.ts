import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Yatra Documentation',
  description:
    'Official documentation for the Yatra WordPress travel booking plugin (Free + Pro).',
  lang: 'en-US',

  // SEO and meta
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Yatra, WordPress, travel booking, tour operator, trip booking, Yatra Pro, MantraBrain'
      }
    ],
    ['meta', { name: 'author', content: 'MantraBrain' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.wpyatra.com' }],
    ['meta', { property: 'og:title', content: 'Yatra Documentation' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Official documentation for the Yatra WordPress travel booking plugin (Free + Pro).'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://docs.wpyatra.com/og-image.png'
      }
    ],

    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Yatra Documentation' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Official documentation for the Yatra WordPress travel booking plugin (Free + Pro).'
      }
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://docs.wpyatra.com/twitter-image.png'
      }
    ],

    // Schema.org
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Yatra Documentation',
        description:
          'Official documentation for the Yatra WordPress travel booking plugin (Free + Pro).',
        url: 'https://docs.wpyatra.com',
        potentialAction: {
          '@type': 'SearchAction',
          target:
            'https://docs.wpyatra.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ]
  ],

  // Theme configuration
  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/installation' },
              { text: 'Quick start', link: '/quick-start' },
              { text: 'Your WordPress admin', link: '/admin-dashboard' },
              { text: 'Settings overview', link: '/settings' }
            ]
          },
          {
            text: 'Operate',
            items: [
              { text: 'Trips & catalog', link: '/tour-booking' },
              { text: 'Create a trip', link: '/trip-creation' },
              {
                text: 'Departures & availability',
                link: '/departures'
              },
              {
                text: 'Bookings & customers',
                link: '/booking-settings'
              },
              { text: 'Payments', link: '/payment-settings' },
              { text: 'Email', link: '/email-settings' }
            ]
          },
          {
            text: 'Integrate',
            items: [
              { text: 'Pro modules overview', link: '/third-party-integrations' },
              { text: 'All modules (catalog)', link: '/modules' },
              { text: 'Per-module reference', link: '/modules/' },
              {
                text: 'Blocks & page builders',
                link: '/elementor-integration'
              },
              {
                text: 'WooCommerce co-existence',
                link: '/woocommerce-integration'
              }
            ]
          }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST API', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'PayPal: "things don\'t appear to be working"', link: '/paypal-troubleshooting' },
          { text: '403 Forbidden error', link: '/forbidden-error' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      },
      {
        text: 'Yatra Pro',
        link: 'https://wpyatra.com/pricing/',
        target: '_blank',
        rel: 'noopener'
      },
      {
        text: 'wpyatra.com',
        link: 'https://wpyatra.com/',
        target: '_blank'
      }
    ],

    // Single sidebar shared across the home page and every guide page
    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick start (setup wizard)', link: '/quick-start' },
          { text: 'Your WordPress admin', link: '/admin-dashboard' },
          { text: 'Settings overview', link: '/settings' }
        ]
      },
      {
        text: 'Operate',
        collapsed: false,
        items: [
          { text: 'Trips & catalog', link: '/tour-booking' },
          { text: 'Create a trip (walkthrough)', link: '/trip-creation' },
          { text: 'Availability (3-layer system)', link: '/availability' },
          {
            text: 'Departures',
            link: '/departures'
          },
          { text: 'Bookings & customers', link: '/booking-settings' },
          { text: 'Payments', link: '/payment-settings' },
          { text: 'Email & notifications', link: '/email-settings' }
        ]
      },
      {
        text: 'Integrate',
        collapsed: false,
        items: [
          { text: 'Pro modules overview', link: '/third-party-integrations' },
          { text: 'All modules (catalog)', link: '/modules' },
          {
            text: 'Blocks & page builders',
            link: '/elementor-integration'
          },
          {
            text: 'WooCommerce & co-existence',
            link: '/woocommerce-integration'
          }
        ]
      },
      {
        text: 'Per-module reference',
        collapsed: true,
        items: [
          { text: 'Index', link: '/modules/' },
          { text: 'Google Calendar', link: '/modules/google-calendar' },
          { text: 'Additional Services', link: '/modules/additional-services' },
          { text: 'Trip Consent', link: '/modules/trip-consent' },
          { text: 'Email Automation', link: '/modules/email-automation' },
          { text: 'Dynamic Form Field', link: '/modules/dynamic-form-field' },
          { text: 'Advanced Discount', link: '/modules/advanced-discount' },
          { text: 'Mailchimp', link: '/modules/mailchimp' },
          { text: 'Facebook Pixel', link: '/modules/facebook-pixel' },
          { text: 'Google Analytics', link: '/modules/google-analytics' },
          { text: 'Flexible Payments', link: '/modules/flexible-payments' },
          { text: 'Scheduled Payments', link: '/modules/scheduled-payments' },
          { text: 'Dynamic Pricing', link: '/modules/dynamic-pricing' },
          { text: 'Abandoned Booking Recovery', link: '/modules/abandoned-booking-recovery' },
          { text: 'Custom Landing Pages', link: '/modules/custom-landing-pages' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'REST API', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'PayPal: "things don\'t appear to be working"', link: '/paypal-troubleshooting' },
          { text: '403 Forbidden error', link: '/forbidden-error' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/MantraBrain/yatra'
      }
    ],

    footer: {
      message:
        '© MantraBrain · GPLv2+ · <a href="https://wpyatra.com/pricing/" target="_blank" rel="noopener"><strong>Yatra Pro</strong> — pricing</a>',
      copyright: `Copyright © ${new Date().getFullYear()} MantraBrain`
    },

    editLink: {
      pattern:
        'https://github.com/MantraBrain/yatra-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    markdownSource: {
      pattern:
        'https://raw.githubusercontent.com/MantraBrain/yatra-docs/main/docs/:path'
    }
  },

  // Markdown
  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // Vite config
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    server: {
      host: true
    },
    build: {
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      exclude: ['vitepress']
    }
  },

  // Tolerate cross-page links to pages that may not yet exist
  ignoreDeadLinks: true,

  sitemap: {
    hostname: 'https://docs.wpyatra.com'
  },

  // Dynamic SEO per page
  transformHead: ({ pageData }) => {
    const description =
      pageData.frontmatter?.description ||
      'Official documentation for the Yatra WordPress travel booking plugin (Free + Pro).'

    const title = pageData.title
      ? `${pageData.title} | Yatra Documentation`
      : 'Yatra Documentation'

    return [
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      [
        'link',
        {
          rel: 'canonical',
          href: (() => {
            const slug = pageData.relativePath
              .replace(/\.md$/, '')
              .replace(/(^|\/)index$/, '')
            return slug
              ? `https://docs.wpyatra.com/${slug}`
              : 'https://docs.wpyatra.com/'
          })()
        }
      ]
    ]
  }
})
