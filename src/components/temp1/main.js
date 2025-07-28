import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/main.module.css'; // Adjust the path as necessary

const originalImages = [
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' },
    { src: '/img3.jpg', alt: 'Image 3' },
    { src: '/img4.jpg', alt: 'Image 4' },
    { src: '/img5.jpg', alt: 'Image 5' },
    { src: '/img6.jpg', alt: 'Image 6' },
];

const Main = () => {
  const itemsToShow = 4; // Number of images visible at a time
  const scrollBy = 1;     // Number of images to scroll by (per auto-slide or click)
  const autoSlideInterval = 3000; // Auto-slide every 3 seconds (3000ms)
  const transitionDuration = 500; // Animation duration in milliseconds

  const duplicatedStart = originalImages.slice(-itemsToShow);
  const duplicatedEnd = originalImages.slice(0, itemsToShow);
  const images = [...duplicatedStart, ...originalImages, ...duplicatedEnd];

  const [currentIndex, setCurrentIndex] = useState(itemsToShow);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const sliderRef = useRef(null); // Ref for the carouselTrack
  const containerRef = useRef(null); // Ref for the carouselContainer to get its width
  const intervalRef = useRef(null);

  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + scrollBy);
      }, autoSlideInterval);
    };

    intervalRef.current = startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSlideInterval, scrollBy]);

  useEffect(() => {
    let timeoutId;
    if (!isTransitioning) {
      timeoutId = setTimeout(() => {
        if (currentIndex >= originalImages.length + itemsToShow) {
          setCurrentIndex(itemsToShow);
        } else if (currentIndex < itemsToShow) {
          setCurrentIndex(originalImages.length);
        }
      }, 0);
    }
    return () => clearTimeout(timeoutId);
  }, [currentIndex, isTransitioning, originalImages.length, itemsToShow]);

  const handleTransitionEnd = () => {
    if (
      currentIndex >= originalImages.length + itemsToShow ||
      currentIndex < itemsToShow
    ) {
      setIsTransitioning(false);
    }
  };

  const handleInteraction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePrev = () => {
    handleInteraction();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - scrollBy);
  };

  const handleNext = () => {
    handleInteraction();
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + scrollBy);
  };

  // Calculate translateX based on the actual width of *one visible item*
  // This is the key change: `containerRef.current.offsetWidth` gives the visible width
  // of the carousel, which we then divide by `itemsToShow` to get one item's width.
  const singleItemWidth = containerRef.current
    ? containerRef.current.offsetWidth / itemsToShow
    : 0;

  const translateX = -currentIndex * singleItemWidth;

  return (
    <div className={styles.container}>
      <h2>Participation</h2>

      <div className={styles.carouselWrapper}>
        <div ref={containerRef} className={styles.carouselContainer}> {/* Attach ref here */}
          <div
            ref={sliderRef}
            className={styles.carouselTrack}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
              // The track's total width must accommodate ALL images in the `images` array
              // Each item needs to be `singleItemWidth` wide for the translation to work
              width: `${images.length * singleItemWidth}px` // Set explicit pixel width
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={styles.carouselItem}
                style={{ width: `${singleItemWidth}px` }} // Each item explicitly gets this width
              >
                <div className={styles.card}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.cardImage}
                  />
                  <p className={styles.cardText}>{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button onClick={handlePrev} className={`${styles.navButton} ${styles.navButtonLeft}`}>
          &lt;
        </button>
        <button onClick={handleNext} className={`${styles.navButton} ${styles.navButtonRight}`}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Main;