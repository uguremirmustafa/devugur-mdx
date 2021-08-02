import BlurImage from '@components/Utils/BlurImage';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import Lightbox from 'react-image-lightbox';
import Image from 'next/image';

interface Props {
  imgMeta: any;
}
const images = [
  'images/gear/6.jpg',
  'images/gear/1.jpg',
  'images/gear/4.jpg',
  'images/gear/5.jpg',
  'images/gear/3.jpg',
  'images/gear/2.jpg',
];
const thumb = ['6.jpg', '1.jpg', '4.jpg', '5.jpg', '3.jpg', '2.jpg'];
const captions = [
  ['LG 27UL550-W 27" 4K Freesync IPS Dislpay', 'Logitech C920 HD Pro Webcam'],
  [
    'Dark N10 Pro Case',
    'Ryzen 5 2600',
    'MSI Mortar B450M',
    'Asus RogStrix RX570 4GB',
    'Kingston A2000 500GB Nvme',
  ],
  ['Marshal Major III'],
  ['Thinkpad L14 Gen1 AMD 4750U', 'Logitech Z313 Speaker 2+1', 'Xiaomi Mi 11 Lite'],
  ['HyperX Alloy FPS Pro Cherry MX Red'],
  ['Ikea Meltrop White 125x75', 'Brother HL1211W Wireless Printer'],
];

export const Gallery = ({ imgMeta }: Props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.gallery}>
      {thumb.map((i, index) => (
        <div
          key={index}
          onClick={() => {
            setPhotoIndex(index);
            setIsOpen(true);
          }}
          className="cursor-pointer"
        >
          <BlurImage {...imgMeta[i]} alt={i} />
          {/* <Image
            alt={captions[index][0]}
            src={`/images/gear/${i}`}
            width={imgMeta[i].width}
            height={imgMeta[i].height}
          /> */}
        </div>
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          mainSrcThumbnail={imgMeta[thumb[photoIndex]].imgBase64}
          nextSrc={images[(photoIndex + 1) % images.length]}
          nextSrcThumbnail={imgMeta[thumb[(photoIndex + 1) % images.length]].imgBase64}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          prevSrcThumbnail={
            imgMeta[thumb[(photoIndex + images.length - 1) % images.length]].imgBase64
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          imageCaption={
            <div className="mx-auto">
              {captions[photoIndex].map((i) => (
                <p key={i} className="text-white">
                  {i}
                </p>
              ))}
            </div>
          }
          animationDisabled={true}
        />
      )}
    </div>
  );
};
