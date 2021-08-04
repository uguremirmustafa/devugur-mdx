import React, { ReactChild, ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactChild;
}

export const Tag = ({ children }: Props) => {
  return (
    <div className="pb-1 pt-px px-2 border text-xs text-gray-900 dark:text-white rounded-sm self-center">
      {children}
    </div>
  );
};
