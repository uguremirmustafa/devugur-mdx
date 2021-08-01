import Container from '@components/Container';
import { Gallery } from '@components/Sections/Gallery';
import { getRouteImageMeta } from '@utils/image-api';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

// interface imgMeta {
//   fileName: string;
//   relativePath: string;
//   width: number;
//   height: number;
//   imgBase64: string;
// }
// interface img {
//   img: imgMeta;
// }
// interface Props {
//   imgMeta: img;
// }
interface Props {
  imgMeta: any;
}

const Gear = ({ imgMeta }: Props) => {
  const { t } = useTranslation('gear');
  const title = t('title');
  const description = t('description');
  return (
    <>
      <Container title={title} description={description}>
        <h2>This is my workstation</h2>
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
