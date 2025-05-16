import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios.get('https://better-hotel-service-1.onrender.com/api/posts')
      .then(res => {
        const filtered = res.data.filter(post => {
          const postDate = new Date(post.createdAt);
          const today = new Date();
          const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);
          return diffDays <= 8 && post.filePath;
        });
        setPosts(filtered);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const currentMedia = posts[currentIndex]?.filePath;
    const ext = currentMedia?.split('.').pop().toLowerCase();

    // Clear previous timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 3000);
      setIsVideoPlaying(false);
    } else {
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
    maxHeight: '90vh',
    maxWidth: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
    transition: 'all 0.5s ease-in-out'
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  if (posts.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
        <style>{keyframes}</style>
        <p>No recent media posts available.</p>
      </div>
    );
  }

  const currentMedia = posts[currentIndex]?.filePath;
  if (!currentMedia) return null;

  const fullPath = currentMedia.startsWith('/uploads')
    ? `https://better-hotel-service-1.onrender.com${currentMedia}`
    : currentMedia;

  const ext = currentMedia.split('.').pop().toLowerCase();

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
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
          onEnded={handleVideoEnded}
          onLoadedData={() => setIsVideoPlaying(true)}
          style={fadeInStyle}
          preload="auto"
          draggable={false}
        />
      )}
    </div>
  );
};

export default PostList;
