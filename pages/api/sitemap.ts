import { getSlugs } from '@lib/mdx';

const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

export default async (req, res) => {
  try {
    // An array with your links
    const links = [];

    const turkishPosts = await getSlugs('blog', 'tr');
    const englishPosts = await getSlugs('blog', 'en');
    const turkishPortfolio = await getSlugs('projects', 'tr');
    const englishProjects = await getSlugs('projects', 'en');

    turkishPosts.map((post) => {
      links.push({
        url: `/tr/blog/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });
    englishPosts.map((post) => {
      links.push({
        url: `/blog/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });
    turkishPortfolio.map((project) => {
      links.push({
        url: `/tr/portfolio/${project.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });
    englishProjects.map((project) => {
      links.push({
        url: `/portfolio/${project.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // Add other pages
    const pages = ['/about', '/', '/portfolio', '/blog', 'gear'];
    pages.map((url) => {
      links.push({
        url,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      data.toString()
    );

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
