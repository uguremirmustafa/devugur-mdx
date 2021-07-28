import Link from 'next/link';
import React from 'react';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}
const CustomLink = ({ href, ...rest }: IProps) => {
  return (
    <Link href={href}>
      <a {...rest} />
    </Link>
  );
};
export default CustomLink;
