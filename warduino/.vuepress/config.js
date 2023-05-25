const {description} = require('../package')
const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
    title: 'WARDuino Docs',
    description: description,

    base: '/WARDuino/',

    locales: {
        '/en/': {
            lang: 'en-US', // this will be set as the lang attribute on <html>
            title: 'WARDuino Docs',
        }
    },

    themeConfig: {
        // pages under different sub paths will use different sidebar
        locales: {
            '/en/': {
                sidebar: {
                    '/en/guide/': guide('/en/', 'Guide', 'Getting Started'),
                    '/en/latch/': latch('/en/', 'Latch', 'Introduction'),
                    '/en/warduino/': warduino('/en/', 'WARDuino', 'Overview'),
                }
            }
        }
    },
}

function guide(lang, groupTitle, FirstItem) {
    return [
        {
            title: groupTitle,
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['', FirstItem],
                {
                    title: 'Examples',
                    collapsable: false,
                    path: `${lang}guide/examples/`,
                    sidebarDepth: 1,
                    children: [
                        `${lang}guide/examples/analog/`,
                        `${lang}guide/examples/blink/`,
                    ]
                },
            ]
        }
    ]
}

function warduino(lang, groupTitle, FirstItem) {
    return [
        {
            title: groupTitle,
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['', FirstItem],
                'primitives/',
                'debugger/',
                'releases/',
            ]
        }
    ]
}

function latch(lang, groupTitle, FirstItem) {
    return [
        {
            title: groupTitle,
            collapsable: false,
            sidebarDepth: 1,
            children: [
                ['', FirstItem],
                'api/',
            ]
        }
    ]
}
