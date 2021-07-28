import Link from 'next/link';
import React, { ReactChild } from 'react';

interface Props {}

export const Navbar = (props: Props) => {
  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl text-gray-900 font-semibold">Logo</span>
          <div className="flex space-x-4 text-gray-900">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/hire-me">Hire me</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
