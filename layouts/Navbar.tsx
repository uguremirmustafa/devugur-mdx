import NextLink from 'next/link';
import { ThemeSwitcher } from '@components/Utils/ThemeSwitcher';
import { Logo } from '@components/Utils/Logo';

interface Props {}

export const Navbar = (props: Props) => {
  return (
    <nav className="text-gray-900 sticky-nav md:my-8  bg-opacity-80 dark:text-gray-100 ">
      <div className="flex justify-between w-full max-w-4xl mx-auto h-32 py-8 my-0">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <Logo />
        <div className="flex gap-2">
          <NextLink href="/gear">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Gear</a>
          </NextLink>
          <NextLink href="/blog">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Blog</a>
          </NextLink>
          <NextLink href="/about">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">About</a>
          </NextLink>
          <NextLink href="/">
            <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Home</a>
          </NextLink>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};
