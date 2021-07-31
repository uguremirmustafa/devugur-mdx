import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';
const { defaultLocale } = require('i18n.json');

const root = process.cwd();

export async function getSlugs(type: string, locale: string) {
  const fileNames = fs.readdirSync(path.join(root, 'data', type));
  const fileSlugs = fileNames.map((name) => name.replace('.mdx', ''));
  let files = [];
  fileSlugs.map((file) => {
    const content = fs.readFileSync(`${path.join(root, 'data', type, file)}.mdx`, 'utf8');
    const { data } = matter(content);
    // console.log(data);
    files.push({ slug: file, locale: data.locale, alternate: data.alternate });
    return file;
  });
  return files.filter((file) => file.locale === locale);
}

export async function getFiles(type: string, locales: string[]) {
  let paths: { params: { slug: string }; locale: string }[] = [];
  const fileNames = fs.readdirSync(path.join(root, 'data', type));
  const fileSlugs = fileNames.map((name) => name.replace('.mdx', ''));
  // console.log(fileSlugs);

  fileSlugs.map((file) => {
    const content = fs.readFileSync(`${path.join(root, 'data', type, file)}.mdx`, 'utf8');
    const { data } = matter(content);
    // console.log(data);
    paths.push({ params: { slug: file }, locale: data.locale });
    return file;
  });

  return paths;
}

export async function getFileBySlug(type: string, slug: string, locale: string) {
  const fullPath = path.join(root, 'data', type, slug);

  const source = fs.readFileSync(`${fullPath}.mdx`, 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        // [
        //   require('remark-autolink-headings'),
        //   {
        //     linkProperties: {
        //       className: ['anchor'],
        //     },
        //   },
        // ],
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
  const fileNames = fs.readdirSync(path.join(root, 'data', type));
  // console.log(fileNames);
  // locale = 'en';
  const allPostData = fileNames
    .map((file) => {
      // read full file
      // const fileName = locale === defaultLocale ? 'index.mdx' : `index.${locale}.mdx`;
      const fullPath = path.join(root, 'data', type, file);

      const slug = file.replace('.mdx', '');
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
          techStack?: string[];
          tags?: string[];
          locale: string;
          isPublished: boolean;
          alternate: string;
        }),
        files: fileNames,
      };
    })
    .filter((post) => post.locale === locale)
    .filter((post) => post.isPublished)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));

  return allPostData;
}
