import React, { useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import img1 from '../assets/images/board.jpg';
import img2 from '../assets/images/manypart.jpg';
import img3 from '../assets/images/training.jpg';
import img4 from '../assets/images/office.jpg';
import img5 from '../assets/images/meet3.jpg';
import img6 from '../assets/images/withb.jpg';
import img7 from '../assets/images/meet1.jpg';
import img8 from '../assets/images/worker.jpg';
import img9 from '../assets/images/took.jpg';
import img10 from '../assets/images/sheep1.jpg';
import img11 from '../assets/images/meet5.jpg';

import galleryIcon from '../assets/images/gallery.png';

const slides = [
  { image: img11, leftText: '', rightText: 'Organizing Hotels, Cafes, and Restaurants' },
  { image: img5, leftText: 'Providing various capacity-building and skill trainings', rightText: '' },
  { image: img3, leftText: '', rightText: 'Consulting on business operations and providing guidance documents' },
  { image: img10, leftText: 'Connecting qualified professionals with organizations', rightText: '' },
  { image: img6, leftText: '', rightText: 'Assessing research studies and determining the most viable direction' },
  { image: img2, leftText: 'Providing key operational insights for hotel owners', rightText: '' },
  { image: img8, leftText: '', rightText: 'Helping professionals understand emergency protocols for property care' },
  { image: img7, leftText: 'Explaining benefits from government and partner organizations', rightText: '' },
  { image: img1, leftText: '', rightText: 'Clarifying development and tax obligations for property owners' },
];

const Slideshow = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);

  return (
    <div style={{ position: 'relative', marginTop: '2rem' }}>
      <Fade duration={3000} transitionDuration={800} infinite arrows={false}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide-container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 30px',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              gap: '30px',
              minHeight: '440px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="text-container"
              style={{
                flex: '1 1 300px',
                animation: 'fadeSlide 1s ease-out',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  color: '#1f2e45',
                  fontWeight: 700,
                  textAlign: slide.leftText ? 'right' : 'left',
                  lineHeight: '1.6',
                  position: 'relative',
                }}
              >
                <span className="text-highlight">{slide.leftText || slide.rightText}</span>
              </h2>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="image-container">
                <img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  style={{
                    width: '400px',
                    height: 'auto',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease-in-out',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                  }}
                  className="zoom-on-hover"
                />
              </div>

              <div
                onClick={openGallery}
                title="View full gallery"
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '45px',
                  height: '45px',
                  backgroundColor: '#ffffffdd',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 5,
                }}
              >
                <img src={galleryIcon} alt="Gallery" style={{ width: '22px', height: '22px' }} />
              </div>
            </div>
          </div>
        ))}
      </Fade>

      {/* Full Gallery Modal */}
      {isGalleryOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '40px',
            zIndex: 9999,
            overflowY: 'auto',
          }}
          onClick={closeGallery}
        >
          <PhotoProvider>
            {slides.map((slide, idx) => (
              <PhotoView key={idx} src={slide.image}>
                <img
                  src={slide.image}
                  alt={`Gallery ${idx}`}
                  style={{
                    width: '200px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    margin: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </PhotoView>
            ))}
          </PhotoProvider>
        </div>
      )}

      {/* Animations and Enhancements */}
      <style>{`
        .zoom-on-hover:hover {
          transform: scale(1.04);
        }

        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-highlight {
          background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .slide-container {
            flex-direction: column;
          }

          .text-container h2 {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Slideshow;
