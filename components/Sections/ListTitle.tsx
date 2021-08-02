import React from 'react';

interface Props {
  title: string;
}

export const ListTitle = ({ title }: Props) => {
  return <h2 className="font-bold text-2xl md:text-4xl tracking-tight mb-8 mt-20">{title}</h2>;
};
