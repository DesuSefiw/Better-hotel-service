// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import img from '../assets/images/egle.jpg';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header
      style={{
        backgroundColor: '#003366',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={img}
          alt="Beter Hotel Services Logo"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '5px',
            backgroundColor: 'white',
          }}
        />
        <h1 style={{ margin: 0 }}>{t('title')}</h1>
      </div>
      {/* <div style={{ textAlign: 'right' }}>
        <Link to="/">
          <button style={{ marginTop: '10px', padding: '6px 12px', borderRadius: '15px', backgroundColor: 'orange', border: 'none', color: 'white' }}>
            {t('home')}
          </button>
        </Link>
      </div> */}

      <div style={{ textAlign: 'right' }}>
        <LanguageSwitcher />
       
      </div>
    </header>
  );
};

export default Navbar;
