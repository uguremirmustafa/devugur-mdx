import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';
const { defaultLocale } = require('i18n.json');

const root = process.cwd();

export async function getFiles(type: string, locales: string[]) {
  let paths: { params: { slug: string }; locale: string }[] = [];
  const fileSlugs = fs.readdirSync(path.join(root, 'data', type));

  for (let slug of fileSlugs) {
    for (let locale of locales) {
      let fullPath = path.join(
        root,
        'data',
        type,
        slug,
        locale === defaultLocale ? 'index.mdx' : `index.${locale}.mdx`
      );
      if (!fs.existsSync(fullPath)) {
        continue;
      }
      paths.push({ params: { slug }, locale });
    }
  }

  return paths;
}

export async function getFileBySlug(type: string, slug: string, locale: string) {
  const fullPath = slug
    ? path.join(
        root,
        'data',
        type,
        slug,
        locale === defaultLocale ? 'index.mdx' : `index.${locale}.mdx`
      )
    : path.join(root, 'data', type, locale === defaultLocale ? 'index.mdx' : `index.${locale}.mdx`);

  const source = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        [
          require('remark-autolink-headings'),
          {
            linkProperties: {
              className: ['anchor'],
            },
          },
        ],
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  });
  // const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  // const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);

  return {
    mdxSource,
    // tweetIDs: tweetIDs || [],
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type: string, locale: string) {
  const postSlugs = fs.readdirSync(path.join(root, 'data', type));

  const allPostData = postSlugs
    .map((slug) => {
      // const slug = file.replace('.mdx', '');

      // read full file
      const fileName = locale === defaultLocale ? 'index.mdx' : `index.${locale}.mdx`;
      const fullPath = path.join(root, 'data', type, slug, fileName);

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // matter content
      const matterData = matter(fileContents);
      return {
        slug,
        ...(matterData.data as {
          publishedAt: string;
          title: string;
          summary: string;
          image: string;
        }),
        files: postSlugs,
      };
    })
    .filter((post) => post);

  return allPostData;
}
// return files.reduce((allPosts, postSlug) => {
//   const source = fs.readFileSync(path.join(root, 'data', type, postSlug), 'utf8');
//   const { data } = matter(source);

//   return [
//     {
//       ...data,
//       slug: postSlug.replace('.mdx', ''),
//     },
//     ...allPosts,
//   ];
// }, []);
