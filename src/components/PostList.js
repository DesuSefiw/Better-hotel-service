import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const timeoutRef = useRef(null);

  // Fetch posts on mount
  useEffect(() => {
    axios.get('https://better-hotel-service-1.onrender.com/api/posts')
      .then(res => {
        // Filter posts within 8 days
        const filtered = res.data.filter(post => {
          const postDate = new Date(post.createdAt);
          const today = new Date();
          const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);
          return diffDays <= 8 && post.filePath;  // Only posts with media
        });
        setPosts(filtered);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  // Automatically advance for images after 3 seconds
  useEffect(() => {
    if (posts.length === 0) return;

    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Check if current media is image or video
    const currentMedia = posts[currentIndex].filePath;
    const ext = currentMedia.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      // For images, switch after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 3000);
      setIsVideoPlaying(false);
    } else {
      // For videos, don't auto advance here, wait for onEnded
      setIsVideoPlaying(true);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, posts]);

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const fadeInStyle = {
    animation: 'fadeIn 1s ease-in-out',
    opacity: 1,
    transform: 'scale(1)',
    maxHeight: '90vh',
    width: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  if (posts.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <style>{keyframes}</style>
        <p>No posts with media available.</p>
      </div>
    );
  }

  const currentMedia = posts[currentIndex].filePath;
  const fullPath = `https://better-hotel-service-1.onrender.com${currentMedia}`;
  const ext = currentMedia.split('.').pop().toLowerCase();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <style>{keyframes}</style>
      {['jpg', 'jpeg', 'png', 'gif'].includes(ext) ? (
        <img
          key={currentMedia}
          src={fullPath}
          alt="Post media"
          style={fadeInStyle}
          draggable={false}
        />
      ) : (
        <video
          key={currentMedia}
          src={fullPath}
          autoPlay
          muted
          playsInline
          controls={false}
          onEnded={handleVideoEnded}
          style={fadeInStyle}
          preload="auto"
          draggable={false}
        />
      )}
    </div>
  );
};

export default PostList;
