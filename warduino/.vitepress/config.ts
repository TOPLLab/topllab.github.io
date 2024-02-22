import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vitepress'

const base = '/WARDuino/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WARDuino Docs",
  description: "A VitePress Site",

  base: base,

  head: [['link', { rel: 'icon', href: `${base}favicon.ico` }]],

  lastUpdated: true,

  markdown: {
    //lineNumbers: true
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: '/.vitepress/components/home.vue'
        }
      ]}
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
          { text: 'VS Code Plugin',
            collapsed: true,
            items: [
              { text: 'Installation', link: '/guide/plugin/' },
              { text: 'Getting Started', link: '/guide/plugin/get-started' },
              { text: 'Debugging Hardware', link: '/guide/plugin/tutorial' },
            ]
          },
          { text: 'Testing on Hardware', link: '/guide/latch' }
        ]
      },

      {
        text: "Developer's Guide",
        collapsed: true,
        items: [
          { text: 'Contributing', link: '/reference/contributing' },
          { text: 'Development', link: '/reference/development' },
          { text: 'Platform Support', link: '/reference/platforms' },
        ]
      },

      {
        text: 'Technical Reference',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/reference/' },
          { text: 'Architecture', link: '/reference/architecture' },
          { text: 'Primitives', link: '/reference/primitives' },
          { text: 'Debug Protocol', link: '/reference/debug-protocol' },
          {
            text: 'EDWARD',
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
          {
            text: 'Latch',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/latch/' },
              { text: 'Latch API', link: '/latch/api' },
            ]
          },
          { text: 'VS Code Plugin', link: '/reference/plugin' }
        ]
      },

      {
        text: 'Published Articles',
        link: '/articles/'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TOPLLab/WARDuino/'}
    ]
  }
})

/**
pluginOptions: {
  '@vuepress/medium-zoom': {
    selector: 'img.zoom-custom-imgs',
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
      margin: 16
    }
  }
},
 */
