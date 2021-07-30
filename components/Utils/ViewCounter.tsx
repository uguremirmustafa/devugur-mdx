import { useEffect } from 'react';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import fetcher from '@lib/fetcher';

const ViewCounter = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);
  const { t } = useTranslation('common');
  const viewsText = t('views');
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    registerView();
  }, [slug]);

  return (
    <span className="text-sm text-gray-500 pl-2 flex min-w-32">
      {`${views > 0 ? views.toLocaleString() : '–––'} ${viewsText}`}
    </span>
  );
};
export default ViewCounter;
