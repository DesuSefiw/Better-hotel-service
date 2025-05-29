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

import './Home.css';

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
<motion.div 
        className="animated-bg"
        animate={{ backgroundPosition: ["0% 0%", "50% 50%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <Header />

      <main className="animated-background">
        {/* Welcome section */}
        <motion.section
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)' }}
          transition={{ duration: 0.3 }}
          className="welcome-section"
        >
          <h1 className="welcome-title">
            <Typewriter
              words={[t('welcome')]}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <h2 className="welcome-description">
            <Typewriter
              words={[t('description')]}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </h2>
        </motion.section>

        {/* Slideshow */}
        <motion.div className="slideshow-container"
          whileHover={{ scale: 1.02, rotate: 0.3 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h2>{t('Services')}</h2>
          <Slideshow />
        </motion.div>

        <PostList />
        <AboutUs />

        {/* 🔥 Service Cards */}
        <section id='service' className="service-section">
          <h2>{t('service') || 'Our Services'}</h2>
          <div className="service-grid">
            {[{ title: 'Hotel Setup', icon: '🏨', desc: 'Helping hotels establish a solid foundation for success.' },
              { title: 'Consultancy', icon: '🧠', desc: 'Professional guidance for efficient hotel management and operations.' },
              { title: 'Training Programs', icon: '📚', desc: 'Skill-based training to improve staff performance and hospitality services.' },
              { title: 'Employee Recruitment', icon: '👥', desc: 'Connecting hotels with skilled professionals to enhance service quality.' },
              { title: 'Operational Document Preparation', icon: '📑', desc: 'Providing essential documentation for seamless hotel operations.' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💬 Testimonials */}
        <section className="testimonials-section">
          <h2>{t('testimonials') || 'What Our Customers Say'}</h2>
          <div className="testimonials-grid">
            {[{ name: 'Selam M.', feedback: 'An exceptional initiative! This service will make hotel management seamless, from setup to staffing and operations.' },
              { name: 'Desalegn S.', feedback: 'A game-changer for the hospitality industry! Comprehensive training, consultancy, and recruitment—all in one place. and Recruit employees for them.' },
              { name: 'MOH A.', feedback: 'This service is exactly what hotels need to elevate their quality and efficiency. A must-have for industry growth! and also Prepare necessary operational documents' },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="testimonial-card"
              >
                <p>"{review.feedback}"</p>
                <h4>- {review.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🤝 Partner Companies */}
        <section className="partners-section">
          <h2>{t('partners') || 'Our Partners'}</h2>
          <motion.div className="partners-grid"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[wear, sky, ethio].map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                alt={`Partner ${i + 1}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="partner-logo"
              />
            ))}
          </motion.div>
        </section>

        <ContactForm />
        <GallerySection images={images} />

        <Container fluid className="home-about-section" id="about">
          <Container>
            <Row>
              <Col md={12} className="home-about-social">
                <h1>Connect With Beter Hotel Services</h1>
                <p>
                  Whether you're a hotel owner, hospitality professional, or someone seeking quality services, we're here to support and grow with you.
                  <br /><br />
                  <strong>Follow us to stay informed about the latest training programs, consulting offers, and hotel management innovations in Ethiopia.</strong>
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
