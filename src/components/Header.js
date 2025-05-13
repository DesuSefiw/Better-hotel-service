import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import img from '../assets/images/egle.jpg';

const Header = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listen for window resize to switch between mobile and desktop layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkStyle = {
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '25px',
    backgroundColor: '#004080',
    border: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'block',
    textAlign: 'center',
    width: isMobile ? '100%' : 'auto',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px',
    backgroundColor: '#004080',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'block',
    textAlign: 'center',
    width: isMobile ? '100%' : 'auto',
  };

  const containerStyle = {
    backgroundColor: '#003366',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: 'wrap',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const navContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '10px',
    alignItems: 'center',
    width: isMobile ? '100%' : 'auto',
    marginTop: isMobile ? '10px' : '0',
  };

  const logoTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: isMobile ? '10px' : '0',
  };

  return (
    <header style={containerStyle}>
      {/* Logo and Title */}
      <div style={logoTitleStyle}>
        <img
          src={img}
          alt="Beter Hotel Services Logo"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '5px',
            backgroundColor: 'white',
            objectFit: 'cover',
          }}
        />
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{t('title')}</h1>
      </div>

      {/* Navigation + Actions */}
      <div style={navContainerStyle}>
        {['about', 'contact'].map((key) => (
          <a
            key={key}
            href={`#${key}`}
            style={navLinkStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0059b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#004080'}
          >
            {t(key)}
          </a>
        ))}

        <Link to="/register" style={{ width: isMobile ? '100%' : 'auto' }}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0059b3';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#004080';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {t('register')}
          </button>
        </Link>

        <Link to="/login" style={{ width: isMobile ? '100%' : 'auto' }}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0059b3';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#004080';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {t('login')}
          </button>
        </Link>

        {/* Language Switcher */}
        <div style={{ marginTop: isMobile ? '10px' : '0' }}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
