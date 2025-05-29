// components/FloatingTelegram.js
import React from 'react';
import telegramIcon from '../assets/images/telegram.png'; // Use your own Telegram logo image
import './FloatingTelegram.css';

const FloatingTelegram = () => {
  return (
    <a
      href="https://t.me/+GmLqbBPHIgRjYjc8" // Replace with your actual Telegram channel link
      target="_blank"
      rel="noopener noreferrer"
      className="floating-telegram"
    >      <span>Join our Telegram Channel</span>
      <img src={telegramIcon} alt="Telegram" />
    </a>
  );
};

export default FloatingTelegram;