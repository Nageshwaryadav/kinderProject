import React from 'react';
import styles from './styles/main.module.css';
import Image from 'next/image';

const images = [
  { src: '/img1.jpg', alt: 'Image 1' },
  { src: '/img2.jpg', alt: 'Image 2' },
  { src: '/img3.jpg', alt: 'Image 3' },
  { src: '/img4.jpg', alt: 'Image 4' },
  // Add more images here
];

const main = () => {
  return (
    <div className={styles.Participation}>
      <p className={styles.heading}>Participation</p>
      <div className={styles.container}>
        {images.map((image, index) => (
          <div key={index} className={styles.box}>
            <Image
              className={styles.styledImg}
              src={image.src}
              alt={image.alt}
              layout='fill'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default main;