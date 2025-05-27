import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import img from '../assets/images/egle.jpg';

const Header = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false); // <-- new state for menu toggle

  // Listen for window resize to switch between mobile and desktop layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // auto close menu on desktop
    };
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
    marginBottom: isMobile ? '8px' : '0',
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
    marginBottom: isMobile ? '8px' : '0',
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
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: 'column',
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
    width: '100%',
    justifyContent: 'space-between',
  };

  const hamburgerStyle = {
    cursor: 'pointer',
    display: isMobile ? 'block' : 'none',
    width: '30px',
    height: '22px',
    position: 'relative',
    zIndex: 1100,
  };

  const barStyle = {
    height: '4px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '2px',
    position: 'absolute',
    left: 0,
    transition: '0.3s',
  };

  return (
    <header style={containerStyle}>
      {/* Logo and Title + Hamburger */}
      <div style={logoTitleStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Hamburger button */}
        <div
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setMenuOpen(!menuOpen);
          }}
        >
          {/* 3 bars */}
          <span
            style={{
              ...barStyle,
              top: 0,
              transform: menuOpen ? 'rotate(45deg) translateY(9px)' : 'none',
            }}
          />
          <span
            style={{
              ...barStyle,
              top: '9px',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...barStyle,
              top: '18px',
              transform: menuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
            }}
          />
        </div>
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
            onClick={() => setMenuOpen(false)} // close menu on link click (mobile)
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
            onClick={() => setMenuOpen(false)} // close menu on click (mobile)
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
            onClick={() => setMenuOpen(false)} // close menu on click (mobile)
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
