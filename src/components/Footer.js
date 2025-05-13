import React, { useEffect, useState } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
} from 'react-icons/fa';
import ceoImg from '../assets/images/CEO.jpg';
import headworker from '../assets/images/boardpartnerandmainworker.jpg';

const Footer = () => {
  const [trainerCount, setTrainerCount] = useState(0);

  useEffect(() => {
    fetch('https://better-hotel-service-1.onrender.com/api/stats')
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
            <FaPhoneAlt />
            <a href="tel:+251911444512" style={{ color: 'white',textDecoration:'none' }}>
              +251-911-444-512
            </a>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaEnvelope />
            <a href="mailto:betterhotel@gmail.com" style={{ color: 'white',textDecoration:'none' }}>
              betterhotel@gmail.com
            </a>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
             {/*<FaUsers /> {trainerCount} Trainers Registered */}
          </p>

          {/* Social Media Links */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <a
              href="https://t.me/c/2593570202/4329"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', fontSize: '20px' }}
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://facebook.com/yourfacebook"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', fontSize: '20px' }}
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', fontSize: '20px' }}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* CEO Info */}
        <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
          <img
            src={ceoImg}
            alt="CEO"
            style={{
              width: '100px',
              height: '125px',
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
          <p>Our Board & General Manager</p>
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
