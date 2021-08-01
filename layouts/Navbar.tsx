import NextLink from 'next/link';
import { ThemeSwitcher } from '@components/Utils/ThemeSwitcher';
import { Logo } from '@components/Utils/Logo';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
interface Props {
  alternate: string;
  contentType: string;
}

export const Navbar = ({ alternate, contentType }: Props) => {
  const { locales, asPath, locale } = useRouter();
  const { t } = useTranslation('common');
  const gear = t('nav.gear');
  const about = t('nav.about');
  const blog = t('nav.blog');
  const portfolio = t('nav.portfolio');
  const contentPage = contentType === 'blog' || contentType === 'project';
  const isArticle = alternate != '';
  const isTR = locale === 'tr';
  const to = isTR ? alternate : `/tr${alternate}`;
  const lang = isTR ? 'en' : 'tr';

  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <>
      <nav className="text-gray-900 sticky-nav md:my-8 dark:bg-opacity-100 dark:text-gray-100 ">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto py-4 my-0 px-4">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <Logo />
          <div ref={ref} className={`gap-2 overflow-scroll navlinks`}>
            <NextLink href="/portfolio">
              <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{portfolio}</a>
            </NextLink>
            <NextLink href="/blog">
              <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{blog}</a>
            </NextLink>
            <NextLink href="/about">
              <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{about}</a>
            </NextLink>
            <NextLink href="/gear">
              <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{gear}</a>
            </NextLink>
          </div>
          <div className="flex gap-4">
            {!contentPage && (
              <>
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
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
      <button className="hamburger p-2 outline-none" onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z" />
        </svg>
      </button>
      <div ref={ref} className={`gap-2 overflow-scroll ${open ? 'openmenu' : 'closemenu'}`}>
        <NextLink href="/portfolio">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{portfolio}</a>
        </NextLink>
        <NextLink href="/blog">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{blog}</a>
        </NextLink>
        <NextLink href="/about">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{about}</a>
        </NextLink>
        <NextLink href="/gear">
          <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">{gear}</a>
        </NextLink>
      </div>
    </>
  );
};
