import Container from '@components/Container';
import { Gallery } from '@components/Sections/Gallery';
import { getRouteImageMeta } from '@utils/image-api';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface Props {
  imgMeta: any;
}

const Gear = ({ imgMeta }: Props) => {
  const { t } = useTranslation('gear');
  const title = t('title');
  const description = t('description');
  const heading = t('heading');
  return (
    <>
      <Container title={title} description={description} image={'/images/gear/1.jpg'}>
        <h2 className="mb-8">{heading}</h2>
        <Gallery imgMeta={imgMeta} />
      </Container>
    </>
  );
};
export default Gear;
export async function getStaticProps() {
  const imgMeta = await getRouteImageMeta('gear', false);
  return {
    props: { imgMeta },
  };
}
