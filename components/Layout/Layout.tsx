import { FC, ReactChild, ReactNode } from 'react';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  );
};

export default Layout;
