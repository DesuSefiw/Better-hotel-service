import React from 'react';
import Header from '../components/Header';
import Slideshow from '../components/Slideshow';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PostList from '../components/PostList';
import AboutUs  from './About';
import GallerySection from '../components/GallerySection';
import img1 from '../assets/images/worker.jpg'
import img2 from '../assets/images/hospitality_and_consultancy.jpg'
import img3 from '../assets/images/organiz.jpg'
import img4 from '../assets/images/org2.jpg'
import img5 from '../assets/images/consulting.jpg'
import img6 from '../assets/images/cons2.jpg'
import img7 from '../assets/images/top.jpg'
import img8 from '../assets/images/live1.jpg'

import img9 from '../assets/images/office.jpg'
import img10 from '../assets/images/trinhosp.jpg'
import img11 from '../assets/images/workerpart.jpg'
import img12 from '../assets/images/service1.jpg'

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];
const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        {/* Hover animated Welcome section */}
        <motion.section
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
            maxWidth: '800px',
            marginInline: 'auto',
            cursor: 'pointer',
          }}
        >
          <h1
            style={{
              fontSize: '2.0rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            {t('welcome')}
          </h1>
          <h2
            style={{
              fontSize: '1.25rem',
              color: '#555',
              lineHeight: '1.6',
              fontWeight: 'normal',
            }}
          >
            {t('description')}
          </h2>
        </motion.section>

        {/* Hover animated Slideshow */}
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
         <PostList/> 
        <AboutUs />
        <GallerySection images={images} />

        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Home;
