import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

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

const slides = [
  {
    image: img11,
    leftText: '',
    rightText: 'Organizing Hotels, Cafes, and Restaurants',
  },
  {
    image: img5,
    leftText: 'Providing various capacity-building and skill trainings',
    rightText: '',
  },
  {
    image: img3,
    leftText: '',
    rightText: 'Consulting on business operations and providing guidance documents',
  },
  {
    image: img10,
    leftText: 'Connecting qualified professionals with organizations',
    rightText: '',
  },
  {
    image: img6,
    leftText: '',
    rightText: 'Assessing research studies and determining the most viable direction',
  },
  {
    image: img2,
    leftText: 'Providing key operational insights for hotel owners',
    rightText: '',
  },
  {
    image: img8,
    leftText: '',
    rightText: 'Helping professionals understand emergency protocols for property care',
  },
  {
    image: img7,
    leftText: 'Explaining benefits from government and partner organizations',
    rightText: '',
  },
  {
    image: img1,
    leftText: '',
    rightText: 'Clarifying development and tax obligations for property owners',
  },
];

const Slideshow = () => {
  return (
    <Fade duration={2000} transitionDuration={300} infinite arrows={false}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
            padding: '40px 20px',
            minHeight: '400px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Left text */}
          {slide.leftText && (
            <div style={{ flex: 1, textAlign: 'right', padding: '20px', maxWidth: '400px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}>
                {slide.leftText}
              </h2>
            </div>
          )}

          {/* Image */}
          <div style={{ flex: '0 0 auto', padding: '10px' }}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '350px',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '20px',
                objectFit: 'cover',
                boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
              }}
              loading="lazy"
            />
          </div>

          {/* Right text */}
          {slide.rightText && (
            <div style={{ flex: 1, textAlign: 'left', padding: '20px', maxWidth: '400px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2c3e50',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}>
                {slide.rightText}
              </h2>
            </div>
          )}
        </div>
      ))}
    </Fade>
  );
};

export default Slideshow;
