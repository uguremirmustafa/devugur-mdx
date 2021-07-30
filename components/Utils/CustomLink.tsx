import Link from 'next/link';
import React from 'react';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}
const CustomLink = (props: IProps) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};
export default CustomLink;
