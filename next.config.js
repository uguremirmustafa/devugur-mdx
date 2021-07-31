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
    // webpack: (config, { isServer }) => {
    //   if (isServer) {
    //     require('./scripts/generate-sitemap');
    //   }

    //   return config;
    // },
  })
);
