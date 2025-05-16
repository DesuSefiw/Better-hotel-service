import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 4000);
    } else {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 7000); // fallback video duration
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, posts]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const currentMedia = posts[currentIndex]?.filePath;
  if (!currentMedia) return null;

  const ext = currentMedia.split('.').pop().toLowerCase();
  const fullPath = currentMedia.startsWith('/uploads')
    ? `https://better-hotel-service-1.onrender.com${currentMedia}`
    : currentMedia;

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const mediaStyle = {
    animation: 'fadeIn 1s ease-in-out',
    width: '90vw',
    maxWidth: '720px',
    height: 'auto',
    maxHeight: '65vh',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  };

  return (
    <div
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        minHeight: '100vh',
      }}
    >
      <style>{fadeInKeyframes}</style>

      {/* Top Label */}
      <div
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        🛎️ New Notice
      </div>

      {/* Media Viewer */}
      {['jpg', 'jpeg', 'png', 'gif'].includes(ext) ? (
        <img
          key={fullPath}
          src={fullPath}
          alt="Post media"
          style={mediaStyle}
          draggable={false}
        />
      ) : (
        <video
          key={fullPath}
          src={fullPath}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          preload="auto"
          style={mediaStyle}
          draggable={false}
        />
      )}
    </div>
  );
};

export default PostList;
