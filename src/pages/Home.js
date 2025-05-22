import React from 'react';
import Header from '../components/Header';
import Slideshow from '../components/Slideshow';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PostList from '../components/PostList';
import AboutUs from './About';
import GallerySection from '../components/GallerySection';
import { Helmet } from "react-helmet-async";
import sky from '../assets/images/sky.jpg';
import wear from '../assets/images/wear.jpg';
import ethio from '../assets/images/ethio.jpg';

import img1 from '../assets/images/worker.jpg';
import img2 from '../assets/images/hospitality_and_consultancy.jpg';
import img3 from '../assets/images/organiz.jpg';
import img4 from '../assets/images/org2.jpg';
import img5 from '../assets/images/consulting.jpg';
import img6 from '../assets/images/cons2.jpg';
import img7 from '../assets/images/top.jpg';
import img8 from '../assets/images/live1.jpg';
import img9 from '../assets/images/office.jpg';
import img10 from '../assets/images/trinhosp.jpg';
import img11 from '../assets/images/workerpart.jpg';
import img12 from '../assets/images/service1.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Better Hotel Service - Quality Hotels in Ethiopia</title>
        <meta name="description" content="Affordable and quality hotel services in Ethiopia with Better Hotel Service. Compare, choose, and register now." />
        <meta name="keywords" content="hotel booking Ethiopia, Better Hotel, Ethiopian hotels, Addis Ababa hotels, luxury hotel Ethiopia" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <main style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        {/* Welcome section */}
        <motion.section
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)' }}
          transition={{ duration: 0.3 }}
          style={{
            marginBottom: '3rem',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            marginInline: 'auto',
            cursor: 'pointer',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {t('welcome')}
          </h1>
          <h2 style={{ fontSize: '1.25rem', color: '#555', lineHeight: '1.6', fontWeight: 'normal' }}>
            {t('description')}
          </h2>
        </motion.section>

        {/* Slideshow */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0.3 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{
            marginBottom: '3rem',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: '#fff',
            maxWidth: '850px',
            marginInline: 'auto',
            cursor: 'pointer',
          }}
        >
          <h2>{t('service')}</h2>
          <Slideshow />
        </motion.div>

        {/* Post List */}
        <PostList />

        {/* About Section */}
        <AboutUs />

        {/* Gallery */}
        <GallerySection images={images} />

        {/* 🔥 Service Cards */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#2c3e50' }}>
            {t('our_services') || 'Our Services'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            padding: '0 1rem'
          }}>
            {[
              { title: 'Organize a Hotel', icon: '🏨', desc: 'Organize quality hotels,cafes,restuarant with ease.' },
              { title: 'Consultancy', icon: '🧠', desc: 'Professional hospitality guidance.' },
              { title: 'Training', icon: '📚', desc: 'Skill-based programs for staff.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>{service.icon}</div>
                <h3 style={{ margin: '1rem 0 0.5rem', color: '#333' }}>{service.title}</h3>
                <p style={{ color: '#777' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💬 Testimonials */}
        <section style={{ marginBottom: '4rem', backgroundColor: '#f1f3f5', padding: '3rem 1rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#2c3e50' }}>
            {t('testimonials') || 'What Our Customers Say'}
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { name: 'Selam M.', feedback: 'An exceptional initiative! This service will make hotel management seamless, from setup to staffing and operations.' },
              { name: 'Desalegn S.', feedback: 'A game-changer for the hospitality industry! Comprehensive training, consultancy, and recruitment—all in one place. and Recruit employees for them.' },
              { name: 'MOH A.', feedback: 'This service is exactly what hotels need to elevate their quality and efficiency. A must-have for industry growth! and also Prepare necessary operational documents' },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p style={{ fontStyle: 'italic', color: '#555' }}>"{review.feedback}"</p>
                <h4 style={{ marginTop: '0.75rem', fontWeight: 'bold', color: '#2c3e50' }}>- {review.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🤝 Partner Companies */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#2c3e50' }}>
            {t('partners') || 'Our Partners'}
          </h2>
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem'
            }}
          >
            {[wear, sky, ethio].map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                alt={`Partner ${i + 1}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                style={{ height: '80px', objectFit: 'contain' }}
              />
            ))}
          </motion.div>
        </section>

        {/* Contact */}
        <ContactForm />
      </main>

      <Footer />
    </>
  );
};

export default Home;
