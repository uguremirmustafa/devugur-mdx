import Link from 'next/link';
import React from 'react';

interface Props {}

export const Logo = (props: Props) => {
  return (
    <Link href="/">
      <span className="text-2xl text-gray-900 dark:text-white font-bold cursor-pointer">
        dev
        <span className="text-red-400 dark:text-yellow-500">ugur</span>
      </span>
    </Link>
  );
};
