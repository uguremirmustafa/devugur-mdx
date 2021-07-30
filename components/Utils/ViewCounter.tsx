import { useEffect } from 'react';
import useSWR from 'swr';

import fetcher from '@lib/fetcher';

const ViewCounter = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    registerView();
  }, [slug]);

  return (
    <span className="flex gap-2 justify-center items-center w-20">
      {`${views > 0 ? views.toLocaleString() : '–––'} views`}
    </span>
  );
};
export default ViewCounter;
