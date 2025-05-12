import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUsers } from 'react-icons/fa';
import ceoImg from '../assets/images/CEO.jpg';
import headworker from '../assets/images/boardpartnerandmainworker.jpg';

const Footer = () => {
  const [trainerCount, setTrainerCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats') // Adjust URL if you're in production
      .then(res => res.json())
      .then(data => {
        setTrainerCount(data.count);
      })
      .catch(err => console.error('Error fetching trainer count:', err));
  }, []);
  

  return (
    <footer style={{ backgroundColor: '#003366', color: 'white', padding: '40px 20px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '30px',
        }}
      >
        {/* Company Info */}
        <div style={{ flex: '1 1 250px' }}>
          <br />
          <br />
          <h3 style={{ marginBottom: '10px' }}>Better Hotel Services</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaPhoneAlt /> +251-911-444-512
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaEnvelope /> betterhotel@gmail.com
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <FaUsers /> {trainerCount} Trainers Registered
          </p>
        </div>

        {/* CEO Info */}
        <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
          <img
            src={ceoImg}
            alt="CEO"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '10px',
              border: '2px solid white',
            }}
          />
          <h4>Mr. Tarekegn Legesse</h4>
          <p>Founder & CEO</p>
        </div>

        {/* Headworker Info */}
        <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
          <img
            src={headworker}
            alt="HeadWorker"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '10px',
              border: '2px solid white',
            }}
          />
          <h4>Main Partner</h4>
          <p>Our Board & General Manager </p>
        </div>
      </div>

      <hr style={{ margin: '30px 0', borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      <div style={{ textAlign: 'center', fontSize: '14px' }}>
        &copy; {new Date().getFullYear()} Better Hotel Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
