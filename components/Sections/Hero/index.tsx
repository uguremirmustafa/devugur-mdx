import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Town } from '@components/Svgs/Town';
import { Github } from '@components/Svgs/Github';
import { Twitter } from '@components/Svgs/Twitter';
import { Instagram } from '@components/Svgs/Instagram';
import { LinkedIn } from '@components/Svgs/LinkedIn';
import { ArrowDown } from '@components/Svgs/ArrowDown';

interface Props {}

export const Hero = (props: Props) => {
  const { t } = useTranslation();
  let headerRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    gsap.from(headerRef.current, { opacity: 0, y: 20, duration: 1, ease: 'bounce' });
  }, []);

  return (
    <div className={`text-base md:text-lg pb-4 md:mb-8 ${styles.test}`}>
      <h2
        ref={headerRef}
        className={`leading-8 text-2xl md:text-4xl md:leading-relaxed font-bold text-center ${styles.heading}`}
      >
        {t('home:heroText.part1')}
        <br></br> {t('home:heroText.part2')} <br></br>
        <span className="text-red-400 dark:text-red-400">{t('home:heroText.part3')}</span>
      </h2>

      <div className="max-w-md mx-auto py-4 md:py-8">
        <Town />
      </div>
      <div className="mb-4 md:my-4 flex flex-col justify-center items-center ">
        <a
          href="https://twitter.com/uguremirmustafa"
          target="_blank"
          className="underline mb-4 block text-center"
          rel="noreferrer"
        >
          Ugur Emirmustafa{' '}
          <span className="sm:hidden">
            <br></br>
          </span>
          <span className="hidden sm:inline-block">| </span> Frontend Web Developer
        </a>
        <div className="flex gap-4">
          <a
            href="https://github.com/uguremirmustafa"
            target="_blank"
            rel="noreferrer"
            className={`icon ${styles.socialIcon}`}
          >
            <Github />
          </a>
          <a
            href="https://instagram.com/uguremirmustafa"
            className={`icon ${styles.socialIcon}`}
            rel="noreferrer"
          >
            <Instagram />
          </a>
          <a
            href="https://twitter.com/uguremirmustafa"
            className={`icon ${styles.socialIcon}`}
            rel="noreferrer"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/u%C4%9Fur-emirmustafao%C4%9Flu-09047b14a/"
            className={`icon ${styles.socialIcon}`}
            rel="noreferrer"
          >
            <LinkedIn />
          </a>
        </div>
        <div className="flex justify-center gap-4 my-4 md:my-12">
          <Link href="/portfolio">
            <button className="btn">{t('home:portfolioBtn')}</button>
          </Link>
          <Link href="/blog">
            <button className="btn-contained ">{t('home:blogBtn')}</button>
          </Link>
        </div>
        <div className="animate-bounce">
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};
