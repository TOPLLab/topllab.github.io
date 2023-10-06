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
      { text: 'Documentation', link: '/guide/get-started' }
    ],

    sidebar: [

      {
        text: "Programmer's Guide",
        items: [
          { text: 'Getting Started', link: '/guide/get-started' },
          { text: 'Examples',  
            collapsed: true,
            items: [
              { text: 'Overview', link: '/guide/examples/' },
              { text: 'Analog', link: '/guide/examples/analog' },
              { text: 'Blink', link: '/guide/examples/blink' },
              { text: 'Blink Without Delay', link: '/guide/examples/blink-without-delay' },
              { text: 'Wire a Button', link: '/guide/examples/button' },
              { text: 'Analog In, Out Serial', link: '/guide/examples/analog-io' },
              { text: 'Configuration Files', link: '/guide/examples/config' },
              { text: 'ASCII Table', link: '/guide/examples/ascii' },
              { text: 'Wi-Fi Connection', link: '/guide/examples/wifi' },
              { text: 'MQTT Smartlamp', link: '/guide/examples/smartlamp' },
            ]
          },
          { text: 'VS Code Plugin', link: '/guide/plugin' },
          { text: 'Testing on Hardware', link: '/guide/latch' }
        ]
      },

      {
        text: 'WARDuino Reference',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/reference/' },
          { text: 'Development', link: '/reference/development' },
          { text: 'Primitives', link: '/reference/primitives' },
          { text: 'Remote Debugger', link: '/reference/debugger' },
          { text: 'Debug Protocol', link: '/reference/debug-protocol' },
          {
            text: 'EDWARD Reference',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/reference/edward/' },
              { text: 'Protocol', link: '/reference/edward/protocol' },
              { text: 'Examples',  
                items: [
                  { text: 'Debugging Hardware', link: '/reference/edward/hardware' },
                  { text: 'Debugging Concurrency', link: '/reference/edward/concurrency' }
                ]
              },
            ]
          },
          { text: 'Hardware Support', link: '/reference/hardware' }
        ]
      },

      {
        text: 'Latch Reference',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/latch/' },
          { text: 'Latch API', link: '/latch/api' }
        ]
      },

      {
        text: 'Research Articles',
        collapsed: true,
        items: [
            { text: 'Overview', link: '/articles/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TOPLLab/WARDuino/'}
    ]
  }
})
