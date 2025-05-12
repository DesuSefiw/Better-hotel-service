import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const AboutUs = () => {
    const { t } = useTranslation();
  
  return (
    <motion.section id="about"
      whileHover={{
        scale: 1.03,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      }}
      transition={{ duration: 0.3 }}
      style={{
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '850px',
        marginInline: 'auto',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
      {t('about')}
       
       </h2>
      <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
        <strong>Beter Hotel Services</strong> was founded with a passionate mission to elevate Ethiopia’s hospitality sector.
        Since our establishment in March 2017 by <strong>Mr. Tareken Legesse</strong>, we have been committed to organizing and empowering hotel businesses through top-tier training, professional consulting, and direct industry engagement.
        <br /><br />
        Our platform connects hotels with skilled professionals, offers tailored training programs, and provides expert guidance that drives quality, efficiency, and guest satisfaction.
        Whether you're a hotel owner, a new manager, or an aspiring hospitality professional — <strong>we’re here to support your journey to excellence.</strong>
      </p>
    </motion.section>
  );
};

export default AboutUs;
