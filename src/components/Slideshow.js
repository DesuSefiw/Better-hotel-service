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
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 40px',
              background: 'linear-gradient(to right, #f7f8fc, #eef2f3)',
              borderRadius: '20px',
              boxShadow: '0 6px 25px rgba(0,0,0,0.1)',
              gap: '40px',
              minHeight: '450px',
              transition: 'all 0.5s ease-in-out',
            }}
          >
            {/* Text Area */}
            <div
              className="text-container"
              style={{
                flex: '1 1 350px',
                animation: 'fadeInText 1.3s ease-in-out',
                padding: '10px',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  color: '#2c3e50',
                  fontWeight: 600,
                  lineHeight: '1.6',
                  textAlign: slide.leftText ? 'right' : 'left',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span style={{ background: 'linear-gradient(90deg, #00c6ff, #0072ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {slide.leftText || slide.rightText}
                </span>
              </h2>
            </div>

            {/* Image Area */}
            <div style={{ position: 'relative', transition: 'transform 0.3s ease' }}>
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                style={{
                  width: '420px',
                  height: 'auto',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                  transition: 'transform 0.4s ease-in-out',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              <div
                onClick={openGallery}
                title="View full gallery"
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ffffffcc',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ffffffee')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffffcc')}
              >
                <img src={galleryIcon} alt="Gallery" style={{ width: '24px', height: '24px' }} />
              </div>
            </div>
          </div>
        ))}
      </Fade>

      {/* Gallery Modal */}
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
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </PhotoView>
            ))}
          </PhotoProvider>
        </div>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeInText {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Slideshow;
