// // import React from 'react';
// //  // e.g., 'react-slick', 'swiper/react'

// // const images = [
// //     { src: 'img1.jpg', alt: 'Image 1' },
// //     { src: 'img2.jpg', alt: 'Image 2' },
// //     { src: 'img3.jpg', alt: 'Image 3' },
// //     { src: 'img4.jpg', alt: 'Image 4' },
// //     { src: 'img5.jpg', alt: 'Image 5' },
// //     { src: 'img6.jpg', alt: 'Image 6' },
// // ];

// // const Main = () => {
  

// //   return (
// //     <div>
// //         <h2>Participation</h2>
// //         <div className="container">
// //             <div className="card"></div>
// //             <div className="card"></div>
// //             <div className="card"></div>
// //             <div className="card"></div>
// //             <div className="card"></div>
// //             <div className="card"></div>
// //         </div>
// //     </div>
// //   );
// // };

// // export default Main;

// import React from 'react';

// const images = [
//   { src: '/img1.jpg', alt: 'Image 1' }, // Ensure these paths are correct, e.g., /img1.jpg if directly in public/
//   { src: '/img2.jpg', alt: 'Image 2' },
//   { src: '/img3.jpg', alt: 'Image 3' },
//   { src: '/img4.jpg', alt: 'Image 4' },
//   { src: '/img5.jpg', alt: 'Image 5' },
//   { src: '/img6.jpg', alt: 'Image 6' },
// ];

// const Main = () => {
//   return (
//     <div style={styles.container}>
//       <h2>Participation</h2>
//       <div style={styles.carouselContainer}> {/* This div will hold the visible window */}
//         <div style={styles.carouselTrack}> {/* This div will contain all images and slide */}
//           {images.map((image, index) => (
//             <div key={index} style={styles.carouselItem}>
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 style={styles.image}
//               />
//               <p style={styles.imageCaption}>{image.alt}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* You'd add navigation buttons (previous/next) and logic here for manual control */}
//     </div>
//   );
// };

// // --- Basic Inline Styles ---
// const styles = {
//   container: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//   },
//   carouselContainer: {
//     width: '100%', // Take full width available in its parent
//     maxWidth: '1200px', // Optional: limit the max width of the entire carousel
//     margin: '20px auto', // Center the carousel container
//     overflow: 'hidden', // IMPORTANT: Hides images that are outside the visible area
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     position: 'relative', // For potential absolute positioning of arrows
//   },
//   carouselTrack: {
//     display: 'flex', // Arrange items in a row
//     // transition: 'transform 0.5s ease-in-out', // Add this when you implement sliding logic
//     // transform: 'translateX(0)', // This will be dynamic for sliding
//   },
//   carouselItem: {
//     flexShrink: 0, // Prevents items from shrinking
//     width: `${100 / 4}%`, // ⭐ Each item takes 25% of the track's width (100% / 4 items)
//     padding: '10px', // Spacing between the images/cards
//     boxSizing: 'border-box', // Include padding in the width calculation
//     textAlign: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '200px', // Fixed height for consistency in the slider
//     objectFit: 'cover', // Ensures image fills its space without distortion
//     borderRadius: '4px',
//     display: 'block', // Removes extra space below image
//   },
//   imageCaption: {
//     fontSize: '0.9em',
//     marginTop: '8px',
//     color: '#555',
//   },
// };

// export default Main;


import React, { useState, useEffect, useRef } from 'react';

// Your array of images. Ensure these paths are correct relative to your 'public' folder.
// For example, if img1.jpg is in 'public/images/', the src should be '/images/img1.jpg'.
const originalImages = [
       { src: '/img1.jpg', alt: 'Image 1' }, // Ensure these paths are correct, e.g., /img1.jpg if directly in public/
       { src: '/img2.jpg', alt: 'Image 2' },
       { src: '/img3.jpg', alt: 'Image 3' },
      { src: '/img4.jpg', alt: 'Image 4' },
      { src: '/img5.jpg', alt: 'Image 5' },
      { src: '/img6.jpg', alt: 'Image 6' },
];

const Main = () => {
  const itemsToShow = 4; // Number of images visible at a time
  const scrollBy = 1;    // Number of images to scroll by (per auto-slide or click)
  const autoSlideInterval = 3000; // Auto-slide every 3 seconds (3000ms)
  const transitionDuration = 500; // Animation duration in milliseconds

  // For the 'infinite loop' effect, we duplicate items:
  // - Add a few images from the END of the original array to the BEGINNING.
  // - Add a few images from the BEGINNING of the original array to the END.
  const duplicatedStart = originalImages.slice(-itemsToShow);
  const duplicatedEnd = originalImages.slice(0, itemsToShow);
  const images = [...duplicatedStart, ...originalImages, ...duplicatedEnd];

  // State to track the current position in the extended 'images' array.
  // We start at 'itemsToShow' to correctly begin with the first *original* image.
  const [currentIndex, setCurrentIndex] = useState(itemsToShow);

  // State to control CSS transition. Set to 'false' for instantaneous jumps in infinite loop.
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Ref to the slider track for dynamic width calculations (needed for translateX).
  const sliderRef = useRef(null);
  // Ref to store the interval ID for auto-play, allowing us to clear it.
  const intervalRef = useRef(null);

  // --- Auto-Play Logic ---
  useEffect(() => {
    const startAutoPlay = () => {
      // Clear any existing interval before setting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return setInterval(() => {
        setIsTransitioning(true); // Ensure transition is enabled for smooth slide
        setCurrentIndex((prevIndex) => prevIndex + scrollBy);
      }, autoSlideInterval);
    };

    intervalRef.current = startAutoPlay(); // Store the interval ID

    // Cleanup function: Clear interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSlideInterval, scrollBy]); // Dependencies: Re-run if interval/scroll amount changes

  // --- Infinite Loop Jump Logic ---
  useEffect(() => {
    // This effect runs AFTER a transition *might* have completed.
    // It's responsible for the "invisible jump" back to the real start/end.
    if (!isTransitioning) { // Only perform the jump if no transition is active
      if (currentIndex >= originalImages.length + itemsToShow) {
        // We've slid past the last *original* image into the duplicated start images.
        // Jump back to the start of the *original* images.
        setCurrentIndex(itemsToShow);
      } else if (currentIndex < itemsToShow) {
        // We've slid backward past the first *original* image into the duplicated end images.
        // Jump back to the end of the *original* images.
        setCurrentIndex(originalImages.length + scrollBy); // Or originalImages.length + itemsToShow - 1 if scrollBy is 1 and you jump to the end
      }
    }
  }, [currentIndex, isTransitioning, originalImages.length, itemsToShow, scrollBy]);


  // --- Event Handler for CSS Transition End ---
  // This is crucial to detect when a smooth slide animation has finished.
  const handleTransitionEnd = () => {
    if (
      currentIndex >= originalImages.length + itemsToShow ||
      currentIndex < itemsToShow
    ) {
      // If we are on one of the duplicated sections, disable transition for the jump.
      setIsTransitioning(false);
    }
  };

  // --- Manual Navigation ---
  const handlePrev = () => {
    // Reset auto-play timer on manual interaction
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTransitioning(true); // Enable transition for manual slide
    setCurrentIndex((prevIndex) => prevIndex - scrollBy);
    // You might want to restart the auto-play after a short delay, or pause it permanently
    // intervalRef.current = startAutoPlay(); // To restart after manual slide
  };

  const handleNext = () => {
    // Reset auto-play timer on manual interaction
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTransitioning(true); // Enable transition for manual slide
    setCurrentIndex((prevIndex) => prevIndex + scrollBy);
    // intervalRef.current = startAutoPlay(); // To restart after manual slide
  };

  // Calculate the `translateX` value for the `carouselTrack`.
  // It shifts the track left by `currentIndex` multiplied by the width of one item.
  const itemWidth = sliderRef.current ? sliderRef.current.offsetWidth / itemsToShow : 0;
  const translateX = -currentIndex * itemWidth;

  return (
    <div style={styles.container}>
      <h2>Participation</h2>

      <div style={styles.carouselWrapper}>
        <div style={styles.carouselContainer}>
          <div
            ref={sliderRef} // Attach ref to the element that moves
            style={{
              ...styles.carouselTrack,
              transform: `translateX(${translateX}px)`,
              // Apply transition only when `isTransitioning` is true
              transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
            }}
            onTransitionEnd={handleTransitionEnd} // Listen for transition end
          >
            {images.map((image, index) => (
              <div key={index} style={{ ...styles.carouselItem, width: `${100 / itemsToShow}%` }}>
                <div style={styles.card}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={styles.cardImage}
                  />
                  <p style={styles.cardText}>{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button onClick={handlePrev} style={{ ...styles.navButton, ...styles.navButtonLeft }}>
          &lt;
        </button>
        <button onClick={handleNext} style={{ ...styles.navButton, ...styles.navButtonRight }}>
          &gt;
        </button>
      </div>
    </div>
  );
};

// --- Basic Inline Styles ---
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  carouselWrapper: {
    maxWidth: '960px', // Overall max width of the carousel component
    margin: '20px auto',
    position: 'relative', // Necessary for positioning nav buttons
  },
  carouselContainer: {
    overflow: 'hidden', // Hides items that are outside the current view
    width: '100%', // Takes up the full width of its wrapper
  },
  carouselTrack: {
    display: 'flex', // Lays out items in a row
    // transition and transform are applied dynamically in JSX
  },
  carouselItem: {
    flexShrink: 0, // Prevents items from shrinking below their width
    // width is set dynamically based on itemsToShow in JSX
    padding: '0 10px', // Spacing between individual image cards
    boxSizing: 'border-box', // Include padding in the width calculation
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    height: '300px', // Fixed height for each card, adjust as needed
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    width: '100%',
    height: '200px', // Fixed height for the image part of the card
    objectFit: 'cover', // Ensures the image fills its space without distortion
    display: 'block', // Removes extra space below inline elements
    borderRadius: '8px 8px 0 0',
  },
  cardText: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '0.9em',
    flexGrow: 1, // Allows text to take up remaining space in the card
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    padding: '12px 18px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '1.5em',
    zIndex: 10, // Ensure buttons are above images
    transition: 'background-color 0.3s ease',
  },
  navButtonLeft: {
    left: '10px',
  },
  navButtonRight: {
    right: '10px',
  },
  // You can add :hover styles with a CSS file or more complex inline style logic
};

export default Main;