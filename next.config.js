const nextTranslate = require('next-translate');
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = nextTranslate(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,
    modern: true,
    async rewrites() {
      return [
        { source: '/sitemap.xml', destination: '/api/sitemap' },
        { source: '/tr/sitemap.xml', destination: '/tr/api/sitemap' },
      ];
    },
    catchAllRouting: true,
  })
);
