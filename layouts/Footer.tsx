import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
interface Props {
  alternate: string;
}

export const Footer = ({ alternate }: Props) => {
  const { t } = useTranslation('common');
  const gear = t('nav.gear');
  const home = t('nav.home');
  const about = t('nav.about');
  const blog = t('nav.blog');
  const portfolio = t('nav.portfolio');
  const sitemap = t('nav.sitemap');
  const navigation = t('navigation');
  const unrelated = t('unrelated');
  const connect = t('connect');
  const { locales, asPath, locale } = useRouter();

  const isArticle = alternate !== '';
  const isTR = locale === 'tr';
  const to = isTR ? alternate : `/tr${alternate}`;
  const lang = isTR ? 'en' : 'tr';

  return (
    <footer className="mx-auto max-w-2xl bg-red-400 w-full">
      <div className="footer">
        <ul className="flex flex-col gap-1 md:gap-0">
          <h6 className="p-1 underline">{navigation}</h6>
          <NextLink href="/portfolio">
            <a className="p-1">{portfolio}</a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1">{blog}</a>
          </NextLink>
          <NextLink href="/about">
            <a className="p-1">{about}</a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1">{home}</a>
          </NextLink>
          <NextLink href="/api/sitemap">
            <a className="p-1">{sitemap}</a>
          </NextLink>
        </ul>
        <ul className="flex flex-col gap-1 md:gap-0">
          <h6 className="p-1 underline">{connect}</h6>
          <a href="https://twitter.com/uguremirmustafa" className="p-1">
            Twitter
          </a>
          <a href="https://github.com/uguremirmustafa" className="p-1">
            Github
          </a>
          <a href="https://instagram.com/uguremirmustafa" className="p-1">
            Instagram
          </a>
          <a href="mailto:uguremirmustafa@gmail.com" className="p-1">
            Email
          </a>
          {!isArticle && (
            <ul className="flex gap-4 p-1">
              {locales.map((locale) => (
                <li key={locale}>
                  <NextLink href={asPath} locale={locale}>
                    {locale === 'tr' ? '🇹🇷' : '🇺🇸'}
                  </NextLink>
                </li>
              ))}
            </ul>
          )}
          {isArticle && (
            <NextLink href={to} locale={lang}>
              <a className="p-1">🇹🇷/🇺🇸</a>
            </NextLink>
          )}
        </ul>
        <ul className="flex flex-col gap-1 md:gap-0">
          <h6 className="p-1 underline">{unrelated}</h6>
          <NextLink href="/gear">
            <a className="p-1">{gear}</a>
          </NextLink>
        </ul>
      </div>
    </footer>
  );
};
