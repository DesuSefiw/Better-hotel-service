import React, { useState } from 'react';
import './GallerySection.css';

const GallerySection = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const handleNext = () => {
    if (startIndex + 6 < images.length) setStartIndex(prev => prev + 6);
  };

  const handlePrev = () => {
    if (startIndex >= 6) setStartIndex(prev => prev - 6);
  };

  const visibleImages = images.slice(startIndex, startIndex + 6);

  return (
    <section className="gallery-container">
      <h2 className="gallery-title">🌄 Gallery</h2>

      <div className="gallery-grid">
        {visibleImages.map((img, index) => (
          <div
            className="gallery-item fade-in"
            key={index}
            onClick={() => setModalImage(img)}
          >
            <img src={img} alt={`Gallery ${index}`} />
            <div className="overlay-text">Click to view</div>
          </div>
        ))}
      </div>

      {images.length > 6 && (
        <div className="gallery-controls">
          <button onClick={handlePrev} disabled={startIndex === 0}>⬅ Prev</button>
          <button onClick={handleNext} disabled={startIndex + 6 >= images.length}>Next ➡</button>
        </div>
      )}

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalImage} alt="Full view" />
            <button className="modal-close-btn" onClick={() => setModalImage(null)}>✖</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
