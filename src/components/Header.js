// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import img from '../assets/images/egle.jpg';

const Header = () => {
  const { t } = useTranslation();

  const navLinkStyle = {
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '25px',
    backgroundColor: '#004080',
    border: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#0059b3',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
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
  };

  const buttonHoverStyle = {
    backgroundColor: '#0059b3',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
  };

  return (
    <header
      style={{
        backgroundColor: '#003366',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
        <h1 style={{ margin: 0 }}>{t('title')}</h1>
      </div>

      {/* Navigation + Actions */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px', flexWrap: 'wrap' }}>
        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '15px' }}>
          {['about', 'contact'].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              style={navLinkStyle}
              onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Register + Login Buttons */}
        <Link to="/register">
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            {t('register')}
          </button>
        </Link>
        <Link to="/login">
          <button
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          >
            {t('login')}
          </button>
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
