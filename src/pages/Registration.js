import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
  });

  const [type, setTrainingType] = useState(''); // New state for training type

  const { t } = useTranslation();

  const servicesList = [
    'Organize a Hotel',
    'Take Training',
    'Get a Job',
    'Write a Book',
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: updatedServices });

    // Reset training type if "Take Training" is deselected
    if (service === 'Take Training' && formData.services.includes(service)) {
      setTrainingType('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = { ...formData };
if (formData.services.includes('Take Training')) {
  requestBody.type = type;
}

await axios.post('https://better-hotel-service-1.onrender.com/api/register', requestBody);

      
      alert('🎉 Registered successfully!');
      setFormData({ name: '', email: '', phone: '', services: [] });
      setTrainingType('');
    } catch (err) {
      alert('❌ Error registering. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>🌟 Registration Form</h2>
          <p style={styles.description}>
            Please fill in your details below to register for our professional Bettter Hotels programs. 
            We aim to elevate your skills to international standards.
          </p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
              required
            />

            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />

            <label style={styles.label}>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your phone number"
              required
            />

            <label style={styles.label}>Select Services You're Interested In:</label>
            <div style={styles.checkboxContainer}>
              {servicesList.map((service) => (
                <label key={service} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  />{' '}
                  {service}
                </label>
              ))}
            </div>

            {/* ✅ Conditional training type selector */}
            {formData.services.includes('Take Training') && (
              <div>
                <label style={styles.label}>Are you registering as an individual or organization?</label>
                <select
                  value={type}
                  onChange={(e) => setTrainingType(e.target.value)}
                  style={styles.input}
                  
                >
                  <option value="">-- Select Option --</option>
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
            )}

            <button type="submit" style={styles.button}>Submit Registration</button>
            <div style={{ textAlign: 'center' }}>
              <Link to="/">
                <button style={styles.homeButton}>
                  {t('home')}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    background: '#f2f6fc',
    minHeight: '90vh',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#003366',
  },
  description: {
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '20px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#003366',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
  },
  checkboxLabel: {
    color: '#333',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  homeButton: {
    marginTop: '10px',
    padding: '20px 100px',
    borderRadius: '25px',
    backgroundColor: 'orange',
    border: 'none',
    color: 'white',
  },
};

export default Register;
