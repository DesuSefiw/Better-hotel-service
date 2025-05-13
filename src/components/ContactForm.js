// src/components/ContactForm.js
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8j1daa5', 'template_gqme32x', form.current, 'NHIuLa4gCni8Ejso6')
      .then(
        () => {
          alert('✅ Message Sent Successfully!');
          form.current.reset();
        },
        () => {
          alert('❌ An error occurred, please try again.');
        }
      );
  };

  return (
    <div id="contact" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#003366' }}>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Name</label>
        <input type="text" name="user_name" required style={inputStyle} />

        <label>Email</label>
        <input type="email" name="user_email" required style={inputStyle} />

        <label>Message</label>
        <textarea name="message" required rows="5" style={{ ...inputStyle, resize: 'vertical' }}></textarea>

        <button type="submit" style={buttonStyle}>Send Message</button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#003366',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default ContactForm;
