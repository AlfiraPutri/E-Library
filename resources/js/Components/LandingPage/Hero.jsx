import React, { useEffect } from "react";
import AOS from 'aos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'aos/dist/aos.css';

const Hero = () => {

  useEffect(() => {
    AOS.refresh();
  });

  const styles = {
    heroContainer: {
      position: 'relative',
      minHeight: '620px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(244, 232, 213, 0.7)',
    },
    image: {
      width: '100%',
      height: '620px',
      objectFit: 'cover',
    },
    caption: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '620px', // Make caption background full height like the image
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',  // black transparent background
      color: '#fff',
      padding: '10px',
      textAlign: 'center',
      display: 'flex', // Align text centrally
      alignItems: 'center', // Vertically center text
      justifyContent: 'center', // Horizontally center text
    },
    customArrow: {
      fontSize: '50px', // Larger arrow size
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white background for the circle
      color: 'black', // Arrow color
      borderRadius: '50%', // Make it a circle
      border: 'none',
      padding: '10px',
      width: '50px', // Larger circle size
      height: '50px', // Larger circle size
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)', // Center vertically
      zIndex: 2,
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Optional: shadow for the circle
    },
    arrowLeft: {
      left: '20px', // Distance from the left edge
    },
    arrowRight: {
      right: '20px', // Distance from the right edge
    },
  };

  // Function to render custom arrows
  const customRenderArrowPrev = (onClickHandler, hasPrev, label) => (
    <button
      type="button"
      onClick={onClickHandler}
      className="custom-arrow-prev"
      style={{ ...styles.customArrow, ...styles.arrowLeft }}
    >
      &#8249; {/* Unicode for left arrow (<) */}
    </button>
  );

  const customRenderArrowNext = (onClickHandler, hasNext, label) => (
    <button
      type="button"
      onClick={onClickHandler}
      className="custom-arrow-next"
      style={{ ...styles.customArrow, ...styles.arrowRight }}
    >
      &#8250; {/* Unicode for right arrow (>) */}
    </button>
  );

  return (
    <div id="Hero" style={styles.heroContainer}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        renderArrowPrev={customRenderArrowPrev}
        renderArrowNext={customRenderArrowNext}
      >
        <div>
          <img src="/images/banner1.png" alt="Gedung Bapekom 1" style={styles.image} />
          <div style={styles.caption}></div>
        </div>
        <div>
          <img src="/images/banner2.png" alt="Gedung Bapekom 2" style={styles.image} />
          <div style={styles.caption}></div>
        </div>

      </Carousel>
    </div>
  );
};

export default Hero;
