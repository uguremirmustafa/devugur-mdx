import Image from 'next/image';
import React, { useState } from 'react';

export default function BlurImage({ relativePath, width, height, imgBase64, alt, className }) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        aria-hidden="true"
        src={imgBase64}
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'blur(2rem)',
          // transform: 'scale(1.2)',
          opacity: isLoaded ? '0' : '1',
          transition: 'opacity 0s ease',
          transitionDelay: '300ms',
        }}
        className={className ? className : 'blurPlaceholder'}
      />
      <Image
        src={relativePath}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        alt={alt ? alt : ''}
        className={
          isLoaded
            ? className
              ? `${className} opaqueBlurActualImage`
              : 'opaqueBlurActualImage'
            : 'transparentBlurActualImage'
        }
      />
    </div>
  );
}
