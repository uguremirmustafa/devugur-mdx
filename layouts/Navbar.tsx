import NextLink from 'next/link';
import { ThemeSwitcher } from '@components/Utils/ThemeSwitcher';
import { Logo } from '@components/Utils/Logo';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  alternate: string;
  contentType: string;
}

const paths = ['home', 'portfolio', 'blog', 'about', 'gear'];

const navmenuVariants = {
  initial: {
    opacity: 0,
    x: '100vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      staggerChildren: 0.1,
      when: 'afterChildren',
    },
  },
};
const linkVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: '100vw',
    transition: {
      duration: 0.3,
      // when: 'beforeParent',
    },
  },
};
export const Navbar = ({ alternate, contentType }: Props) => {
  const { locales, asPath, locale, pathname } = useRouter();
  const { t } = useTranslation('common');

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
        <div className="flex justify-between items-center w-full max-w-lg mx-auto py-4 my-0 px-4">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <Logo />
          <div className={`gap-2 navlinks`}>
            {paths.map((path) => (
              <NextLink href={`/${path === 'home' ? '' : path}`} key={path}>
                <motion.a
                  whileTap={{ scale: 1.2 }}
                  whileHover={{ scale: 1.03, cursor: 'pointer' }}
                  className={`p-1 text-gray-900 sm:p-4 dark:text-gray-100  ${
                    pathname === (path === 'home' ? '/' : '/' + path) ? 'font-bold' : ''
                  }`}
                >
                  {t(`nav.${path}`)}
                </motion.a>
              </NextLink>
            ))}
          </div>

          <NextLink href="/portfolio">
            <a className={`text-base sm:hidden ${pathname === '/portfolio' ? 'font-bold' : ''}`}>
              {t('nav.portfolio')}
            </a>
          </NextLink>

          <div className="flex gap-4 items-center">
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

      <motion.button
        id="openerHam"
        className={`hamburgerBtn ${open ? 'openHamburger' : 'closedHamburger'}`}
        onClick={() => setOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" className="hamburgerPath" />
        </svg>
      </motion.button>
      <AnimatePresence exitBeforeEnter onExitComplete={() => setOpen(false)}>
        {open && (
          <motion.div
            id="navmenu"
            className={`gap-2 overflow-scroll ${open ? 'openmenu' : 'closemenu'}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={navmenuVariants}
          >
            {paths.map((path) => (
              <NextLink href={`/${path === 'home' ? '' : path}`} key={path}>
                <motion.a
                  variants={linkVariants}
                  className="mobile-link p-1 text-gray-900 sm:p-4 dark:text-gray-100 cursor-pointer"
                  onClick={() => {
                    setTimeout(() => {
                      setOpen(false);
                    }, 300);
                  }}
                >
                  {t(`nav.${path}`)}
                </motion.a>
              </NextLink>
            ))}

            <motion.button
              variants={linkVariants}
              className="closeBtn"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                  className="closePath"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
