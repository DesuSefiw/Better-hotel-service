import React, { useEffect, useState } from 'react';
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
import { Typewriter } from 'react-simple-typewriter';
import SocialMedia from '../SocialMedia';
import { Container, Row, Col } from "react-bootstrap";

import sky from '../assets/images/sky.jpg';
import wear from '../assets/images/wear.jpg';
import ethio from '../assets/images/ethio.png';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Helmet>
        <title>Better Hotel Service - Quality Hotels in Ethiopia</title>
        <meta name="description" content="Affordable and quality hotel services in Ethiopia." />
      </Helmet>

      <Header />

      <main style={{
        padding: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(120deg, #e0f7fa, #b2ebf2)',
        backgroundSize: '400% 400%',
        animation: 'moveWater 12s ease infinite',
        minHeight: '100vh'
      }}>
        {/* Inline keyframe styles */}
        <style>{`
          @keyframes moveWater {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}</style>

        {/* Welcome Section */}
        <motion.section
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          style={{
            marginBottom: '3rem',
            padding: isMobile ? '1rem' : '2rem',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            maxWidth: isMobile ? '95%' : '800px',
            marginInline: 'auto',
            cursor: 'pointer',
          }}
        >
          <h1 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            <Typewriter words={[t('welcome')]} loop={1} cursor cursorStyle="|" typeSpeed={70} />
          </h1>
          <h2 style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <Typewriter words={[t('description')]} loop={1} cursor cursorStyle="|" typeSpeed={60} />
          </h2>
        </motion.section>

        {/* Slideshow */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{
            marginBottom: '3rem',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: '#fff',
            maxWidth: '850px',
            marginInline: 'auto',
          }}
        >
          <h2>{t('Services')}</h2>
          <Slideshow />
        </motion.div>

        <PostList />
        <AboutUs />

        {/* Service Cards */}
        <section id='service' style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#2c3e50' }}>
            {t('service') || 'Our Services'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            padding: '0 1rem'
          }}>
            {[
              { title: 'Hotel Setup', icon: '🏨', desc: 'Helping hotels establish a solid foundation for success.' },
              { title: 'Consultancy', icon: '🧠', desc: 'Professional guidance for efficient hotel operations.' },
              { title: 'Training Programs', icon: '📚', desc: 'Skill-based training for staff and hospitality.' },
              { title: 'Employee Recruitment', icon: '👥', desc: 'Connecting hotels with skilled professionals.' },
              { title: 'Document Preparation', icon: '📑', desc: 'Essential docs for seamless operations.' }
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
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>{service.icon}</div>
                <h3 style={{ margin: '1rem 0 0.5rem', color: '#333' }}>{service.title}</h3>
                <p style={{ color: '#777' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{
          marginBottom: '4rem',
          backgroundColor: '#f1f3f5',
          padding: '3rem 1rem',
          borderRadius: '12px'
        }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: '#2c3e50' }}>
            {t('testimonials') || 'What Our Customers Say'}
          </h2>
          {[{
            name: 'Selam M.',
            feedback: 'An exceptional initiative!'
          }, {
            name: 'Desalegn S.',
            feedback: 'A game-changer for hospitality!'
          }].map((review, index) => (
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
                marginBottom: '1.5rem'
              }}
            >
              <p style={{ fontStyle: 'italic', color: '#555' }}>"{review.feedback}"</p>
              <h4 style={{ marginTop: '0.75rem', fontWeight: 'bold', color: '#2c3e50' }}>- {review.name}</h4>
            </motion.div>
          ))}
        </section>

        {/* Partners */}
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

        <ContactForm />
        <GallerySection images={images} />

        {/* Social Media */}
        <Container fluid>
          <Container>
            <Row>
              <Col md={12}>
                <h1 style={{ color: "black" }}>Connect With Beter Hotel Services</h1>
                <p style={{ color: "black" }}>
                  Whether you're a hotel owner, professional, or customer, we're here to support you.
                  <br /><strong>Follow us for updates and innovation in Ethiopian hospitality.</strong>
                </p>
                <SocialMedia />
              </Col>
            </Row>
          </Container>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Home;
