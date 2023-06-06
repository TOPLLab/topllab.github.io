import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WARDuino Docs",
  description: "A VitePress Site",

  base: '/WARDuino/',

  lastUpdated: true,

  markdown: {
    //lineNumbers: true
  },

  themeConfig: {
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/' }
    ],

    sidebar: [
      {
        text: 'WARDuino Reference',
        items: [
          { text: 'Overview', link: '/docs/' },
          { text: 'Primitives', link: '/docs/primitives' },
          { text: 'Remote Debugger', link: '/docs/debugger' },
          { text: 'VS Code Plugin', link: '/docs/plugin' },
          { text: 'Release Notes', link: '/docs/releases' }
        ]
      },

      {
        text: 'EDWARD Reference',
        items: [
          { text: 'Overview', link: '/edward/' },
          { text: 'Examples',  
            items: [
              { text: 'Debugging Hardware', link: '/edward/hardware' },
              { text: 'Debugging Concurrency', link: '/edward/concurrency' }
            ]
          },
        ]
      },

      {
        text: "Programmer's Guide",
        items: [
          { text: 'Getting Started', link: '/docs/get-started' },
          { text: 'Examples',  
            items: [
              { text: 'Overview', link: '/docs/examples/' },
              { text: 'Analog', link: '/docs/examples/analog' },
              { text: 'Blink', link: '/docs/examples/blink' },
              { text: 'Blink Without Delay', link: '/docs/examples/blink-without-delay' },
              { text: 'Analog In, Out Serial', link: '/docs/examples/analog-io' },
              { text: 'Wi-Fi Connection', link: '/docs/examples/wifi' },
              { text: 'MQTT Smartlamp', link: '/docs/examples/smartlamp' },
            ]
          },
        ]
      },

      {
        text: 'Latch Reference',
        items: [
          { text: 'Overview', link: '/latch/' },
          { text: 'Getting Started', link: '/latch/get-started' },
          { text: 'Latch API', link: '/latch/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TOPLLab/WARDuino/'}
    ]
  }
})
