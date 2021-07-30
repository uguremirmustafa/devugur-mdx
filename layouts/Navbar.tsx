import NextLink from 'next/link';
import { ThemeSwitcher } from '@components/Utils/ThemeSwitcher';
import { Logo } from '@components/Utils/Logo';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
interface Props {
  alternate: string;
}

export const Navbar = ({ alternate }: Props) => {
  const { locales, asPath, locale } = useRouter();
  const { t } = useTranslation('common');
  const gear = t('nav.gear');
  const about = t('nav.about');
  const blog = t('nav.blog');
  const portfolio = t('nav.portfolio');

  const isArticle = alternate !== '';
  const isTR = locale === 'tr';
  const to = isTR ? alternate : `/tr${alternate}`;
  const lang = isTR ? 'en' : 'tr';

  return (
    <nav className="text-gray-900 sticky-nav md:my-8  bg-opacity-80 dark:text-gray-100 ">
      <div className="flex justify-between w-full max-w-4xl mx-auto h-32 py-8 my-0 px-8">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <Logo />
        <div className="flex gap-2 overflow-scroll">
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
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};
