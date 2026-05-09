import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Yatra Documentation',
  description:
    'Complete documentation for Yatra WordPress travel booking plugin',
  lang: 'en-US',

  // SEO and Meta
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Yatra, WordPress, travel booking, hotel booking, tour booking, documentation'
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

    ['meta', { name: 'theme-color', content: '#0073aa' }],

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

    [
      'meta',
      {
        property: 'og:url',
        content: 'https://docs.wpyatra.com'
      }
    ],

    [
      'meta',
      {
        property: 'og:title',
        content: 'Yatra Documentation'
      }
    ],

    [
      'meta',
      {
        property: 'og:description',
        content:
          'Complete documentation for Yatra WordPress travel booking plugin'
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

    [
      'meta',
      {
        name: 'twitter:title',
        content: 'Yatra Documentation'
      }
    ],

    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Complete documentation for Yatra WordPress travel booking plugin'
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
          'Complete documentation for Yatra WordPress travel booking plugin',
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

  // Theme Configuration
  themeConfig: {
    logo: '/logo.png',

    nav: [
      {
        text: 'Guide',
        link: '/guide/installation'
      },

      {
        text: 'API',
        link: '/guide/api-reference'
      },

      {
        text: 'Support',
        link: '/guide/support'
      }
    ],

    sidebar: [
      {
        text: 'Getting Started',

        items: [
          {
            text: 'Installation',
            link: '/guide/installation'
          },

          {
            text: 'Quick Start',
            link: '/guide/quick-start'
          }
        ]
      },

      {
        text: 'Configuration',

        items: [
          {
            text: 'Booking Settings',
            link: '/guide/booking-settings'
          },

          {
            text: 'Payment Settings',
            link: '/guide/payment-settings'
          },

          {
            text: 'Email Settings',
            link: '/guide/email-settings'
          }
        ]
      },

      {
        text: 'Tour Booking',

        items: [
          {
            text: 'Tour Booking',
            link: '/guide/tour-booking'
          },

          {
            text: 'Hotel Booking',
            link: '/guide/hotel-booking'
          }
        ]
      },

      {
        text: 'Integrations',

        items: [
          {
            text: 'WooCommerce',
            link: '/guide/woocommerce-integration'
          },

          {
            text: 'Elementor',
            link: '/guide/elementor-integration'
          },

          {
            text: 'Third-party',
            link: '/guide/third-party-integrations'
          }
        ]
      },

      {
        text: 'Development',

        items: [
          {
            text: 'Shortcodes',
            link: '/guide/shortcodes'
          },

          {
            text: 'Hooks & Filters',
            link: '/guide/hooks-filters'
          },

          {
            text: 'API Reference',
            link: '/guide/api-reference'
          }
        ]
      },

      {
        text: 'Support',

        items: [
          {
            text: 'FAQs',
            link: '/guide/faqs'
          },

          {
            text: 'Troubleshooting',
            link: '/guide/troubleshooting'
          },

          {
            text: 'Changelog',
            link: '/guide/changelog'
          },

          {
            text: 'Support',
            link: '/guide/support'
          }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/mantrabrain'
      }
    ],

    footer: {
      message: 'Built with ❤️ by MantraBrain',
      copyright: 'Copyright © 2026 MantraBrain'
    },

    editLink: {
      pattern:
        'https://github.com/mantrabrain/yatra-docs/edit/main/docs/:path',
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
      prev: 'Previous page',
      next: 'Next page'
    }
  },

  // Markdown
  markdown: {
    lineNumbers: true,

    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },

    config: (md) => {
      // Custom markdown plugins can be added here
    }
  },

  // Vite Config
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

  
  
  // Ignore dead links for missing documentation pages
  ignoreDeadLinks: true,

  // Clean URLs to remove .html extensions
  cleanUrls: true,

  // Sitemap
  sitemap: {
    hostname: 'https://docs.wpyatra.com'
  },

  // Dynamic SEO
  transformHead: ({ pageData }) => {
    const description =
      pageData.frontmatter?.description ||
      'Complete documentation for Yatra WordPress travel booking plugin'

    const title = pageData.title
      ? `${pageData.title} | Yatra Documentation`
      : 'Yatra Documentation'

    return [
      [
        'meta',
        {
          name: 'description',
          content: description
        }
      ],

      [
        'meta',
        {
          property: 'og:title',
          content: title
        }
      ],

      [
        'meta',
        {
          property: 'og:description',
          content: description
        }
      ],

      [
        'meta',
        {
          property: 'og:type',
          content: 'article'
        }
      ],

      [
        'meta',
        {
          name: 'twitter:title',
          content: title
        }
      ],

      [
        'meta',
        {
          name: 'twitter:description',
          content: description
        }
      ],

      [
        'link',
        {
          rel: 'canonical',
          href: `https://docs.wpyatra.com/${pageData.relativePath.replace(
            '.md',
            ''
          )}`
        }
      ],

      [
        'script',
        {
          type: 'application/ld+json'
        },

        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',

          headline: title,

          description: description,

          author: {
            '@type': 'Organization',
            name: 'MantraBrain'
          },

          publisher: {
            '@type': 'Organization',
            name: 'MantraBrain',

            logo: {
              '@type': 'ImageObject',
              url: 'https://docs.wpyatra.com/logo.svg'
            }
          },

          datePublished:
            pageData.frontmatter?.date ||
            new Date().toISOString(),

          dateModified: new Date().toISOString()
        })
      ]
    ]
  }
})