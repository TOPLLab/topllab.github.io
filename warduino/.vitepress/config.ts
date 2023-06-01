import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WARDuino Docs",
  description: "A VitePress Site",

  base: '/WARDuino/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Overview', link: '/docs/' },
          { text: 'Primitives', link: '/docs/primitives' },
          { text: 'Remote Debugger', link: '/docs/debugger' },
          { text: 'EDWARD', link: '/docs/edward' },
          { text: 'Release Notes', link: '/docs/releases' }
        ]
      },

      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/docs/get-started' },
          { text: 'Examples',  
            items: [
              { text: 'Overview', link: '/docs/examples/' },
              { text: 'Analog', link: '/docs/examples/analog' },
              { text: 'Blink', link: '/docs/examples/blink' }
            ]
          },
        ]
      },

      {
        text: 'Latch',
        items: [
          { text: 'Overview', link: '/latch/' },
          { text: 'Latch API', link: '/latch/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TOPLLab/WARDuino/'}
    ]
  }
})
