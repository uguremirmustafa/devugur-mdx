const fs = require('fs');
const path = require('path');
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';
import { getRouteImageMeta } from '@utils/image-api';
import visit from 'unist-util-visit';
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
  const base = type === 'blog' ? 'blog' : 'portfolio';
  const imgMeta = await getRouteImageMeta(path.join(base, slug), true);

  const fullPath = path.join(root, 'data', type, slug);

  const source = fs.readFileSync(`${fullPath}.mdx`, 'utf8');

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
            behaviour: 'prepend',
          },
        ],
        function () {
          return transformer;

          function transformer(tree) {
            visit(tree, 'image', visitor);

            function visitor(node) {
              if (!imgMeta) return;
              const meta = imgMeta[node.url.split('./')[1]];

              node.type = 'jsx';
              node.value = `<BlurImage
                              fileName="${meta.fileName}"
                              relativePath="${meta.relativePath}"
                              width={${meta.width}}
                              height={${meta.height}}
                              imgBase64="${meta.imgBase64}" />`;
            }
          }
        },
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

export async function getAllFilesFrontMatter(
  type: string,
  locale: string,
  onlySelected: boolean = false
) {
  const fileNames = fs.readdirSync(path.join(root, 'data', type));

  const allPostData = fileNames
    .map((file) => {
      // read full file

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
          images: string[];
          techStack?: string[];
          tags?: string[];
          locale: string;
          isPublished: boolean;
          alternate: string;
          type: string;
          selected?: boolean;
          github?: string;
          demo?: string;
        }),
        files: fileNames,
      };
    })
    .filter((post) => post.locale === locale)
    .filter((post) => post.isPublished)
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));

  if (onlySelected) {
    return allPostData.filter((post) => post.selected);
  }
  return allPostData;
}
