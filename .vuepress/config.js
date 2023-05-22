const {description} = require('../package')
const { defaultTheme } = require('@vuepress/theme-default')

module.exports = {
    title: 'WARDuino Docs',
    description: description,
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
                    '/en/warduino/': warduino('/en/', 'WARDuino', 'Overview')
                }
            }
        }
    }
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
                    path: `/en/guide/examples/`,
                    sidebarDepth: 2,
                    initialOpenGroupIndex: -1,
                    children: [
                        '/en/guide/examples/blink',
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
            sidebarDepth: 2,
            children: [
                ['', FirstItem],
                'debugger/',
                'releases/',
            ]
        }
    ]
}