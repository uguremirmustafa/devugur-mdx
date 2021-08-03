import NextLink from 'next/link';
import { ThemeSwitcher } from '@components/Utils/ThemeSwitcher';
import { Logo } from '@components/Utils/Logo';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import gsap from 'gsap';
interface Props {
  alternate: string;
  contentType: string;
}

const paths = ['home', 'portfolio', 'blog', 'about', 'gear'];

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

  const t2 = gsap.timeline();

  useEffect(() => {
    t2.fromTo(
      '.mobile-link',
      { color: '#fff', opacity: 0.9 },
      {
        color: '#FBBF24',
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
        yoyoEase: true,
        yoyo: true,
      }
    );
  }, [open]);

  return (
    <>
      <nav className="text-gray-900 sticky-nav md:my-8 dark:bg-opacity-100 dark:text-gray-100 ">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto py-4 my-0 px-4">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <Logo />
          <div className={`gap-2 overflow-scroll navlinks`}>
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
      <button id="openerHam" className="hamburgerBtn" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" className="hamburgerPath" />
        </svg>
      </button>

      <div id="navmenu" className={`gap-2 overflow-scroll ${open ? 'openmenu' : 'closemenu'}`}>
        {paths.map((path) => (
          <NextLink href={`/${path === 'home' ? '' : path}`}>
            <a
              className="mobile-link p-1 text-gray-900 sm:p-4 dark:text-gray-100"
              onClick={() => {
                setTimeout(() => {
                  setOpen(false);
                }, 300);
              }}
            >
              {t(`nav.${path}`)}
            </a>
          </NextLink>
        ))}

        <button className="closeBtn" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
              className="closePath"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
