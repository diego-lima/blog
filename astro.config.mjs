import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import tailwindcss from '@tailwindcss/vite'
import aws from 'astro-sst'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import sitemap from '@astrojs/sitemap'

import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://diegolm-blog.pgs.sh/',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `.${theme.name.split('-')[1]}`,
      defaultProps: {
        wrap: false,
      },
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/rss': '/rss.xml',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['blog-post-heading'],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
    ],
    gfm: true,
    // syntaxHighlight: 'shiki',
    syntaxHighlight: false,
  },
})
