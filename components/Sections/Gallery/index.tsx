import BlurImage from '@components/Utils/BlurImage';
import React from 'react';
import styles from './styles.module.scss';
interface Props {
  imgMeta: any;
}

export const Gallery = ({ imgMeta }: Props) => {
  console.log(imgMeta);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__container}>
        <ul>
          <li>
            <BlurImage alt="my desk" {...imgMeta['1-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['2-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['3-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['4-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['5-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['6-min.jpg']} />
          </li>
          <li>
            <BlurImage alt="my desk" {...imgMeta['7-min.jpg']} />
          </li>
        </ul>
      </div>
    </div>
  );
};
