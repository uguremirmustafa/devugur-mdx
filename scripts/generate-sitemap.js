const fs = require('fs');
const globby = require('globby');
// const RSS = require('rss');
// const frontmatter = require('front-matter');

(async () => {
  const siteUrl = 'https://devugur.com';
  const pages = await globby([
    'pages/*.tsx',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx',
  ]);

  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('data', '')
        .replace('.js', '')
        .replace('.mdx', '')
        .trim();
      const route = path === 'index' ? '' : path;
      return `
                        <url>
                            <loc>${`${siteUrl}${route}`}</loc>
                        </url>
                    `;
    })
    .join('')
    .trim()}</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
