/**
 * @file Docusaurus configurtion file.
 */
// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// TODO: not sule why eslint thinsk this import is extraneous
import { themes as prismThemes } from 'prism-react-renderer' /* eslint-disable-line node/no-extraneous-import */

/** @type {import('@docusaurus/types').Config} */
const config = {
  title   : 'Liquid Labs',
  tagline : 'Business first solutions',
  favicon : 'img/liquid-labs-double-l-256x256.png',

  // Set the production url of your site here
  url     : 'https://liquid-labs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl : '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName : 'liquid-labs', // Usually your GitHub org/user name.
  projectName      : 'liquid-labs.com', // Usually your repo name.

  onBrokenLinks         : 'throw',
  onBrokenMarkdownLinks : 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n : {
    defaultLocale : 'en',
    locales       : ['en']
  },

  presets : [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs : {
          sidebarPath : false,
          editUrl :
            'https://github.com/liquid-labs/liquid-labs.com/'
        },
        blog : {
          showReadingTime : true,
          editUrl :
            'https://github.com/liquid-labs/liquid-labs.com/',
          feedOptions : {
            type            : 'all',
            copyright       : `Copyright © ${new Date().getFullYear()} Liquid Labs, LLC`,
            createFeedItems : async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts : blogPosts.filter((item, index) => index < 10),
                ...rest
              })
            }
          }
        },
        theme : {
          customCss : './src/css/custom.css'
        }
      })
    ]
  ],

  themeConfig :
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image     : 'img/docusaurus-social-card.jpg',
      colorMode : {
        defaultMode               : 'light',
        disableSwitch             : true,
        respectPrefersColorScheme : false
      },
      navbar : {
        title : '',
        logo  : {
          alt : 'Liquid Labs double L logo',
          src : 'img/liquid-labs-logo-name-only.svg'
        },
        items : [
          {
            type        : 'dropdown',
            label       : 'Services',
            collapsible : true,
            collapsed   : false,
            items       : [
              {
                label : 'Software engineering',
                to    : '/software-engineering'
              },
              {
                label : 'DevOps',
                to    : '/devops'
              },
              {
                label : 'Security and compliance',
                to    : '/security-and-compliance'
              }
            ]
          },
          {
            type        : 'dropdown',
            label       : 'Products',
            collapsible : true,
            collapsed   : false,
            items       : [
              {
                label : 'SDLCPilot',
                to    : '/software-engineering'
              },
              {
                label : 'Org Chart 2024',
                to    : '/devops'
              },
              {
                label : 'Pluggable Express',
                to    : '/security-and-compliance'
              },
              {
                label : 'React Items Filter',
                to    : '/security-and-compliance'
              },
              {
                label : 'See all',
                to    : '/security-and-compliance'
              }
            ]
          }

        ]
      },
      footer : {
        links : [
          {
            title : 'Contact',
            items : [
              {
                label : 'Email',
                href  : '/contact'
              },
              {
                label : 'Discord',
                href  : 'https://discord.gg/YA8Cw9HDWT'
              }
            ]
          },
          {
            title : 'More',
            items : [
              {
                label : 'GitHub (OSS)',
                href  : 'https://github.com/liquid-labs'
              },
              {
                label : 'Site style book',
                href  : '/site-style-book'
              }
            ]
          }
        ],
        copyright : `Copyright © ${new Date().getFullYear()} Liquid Labs, LLC`
      },
      prism : {
        theme     : prismThemes.github,
        darkTheme : prismThemes.dracula
      }
    })
}

export default config
