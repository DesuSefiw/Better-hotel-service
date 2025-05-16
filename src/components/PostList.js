import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
      // Allow time for video to play
      setIsVideoLoaded(false); // Wait for onLoadedData
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, posts]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;

  if (!currentMedia) return null;

  const ext = currentMedia.split('.').pop().toLowerCase();
  const fullPath = currentMedia.startsWith('/uploads')
    ? `https://better-hotel-service-1.onrender.com${currentMedia}`
    : currentMedia;

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  const mediaStyle = {
    animation: 'fadeIn 1s ease-in-out',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
    transition: 'all 0.5s ease-in-out',
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <style>{keyframes}</style>

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
          onLoadedData={() => {
            setIsVideoLoaded(true);
            timeoutRef.current = setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % posts.length);
            }, currentPost?.duration ? currentPost.duration * 1000 : 7000); // fallback 7s
          }}
          style={mediaStyle}
          preload="auto"
          draggable={false}
        />
      )}

      {/* Overlay Text */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '1rem',
          borderRadius: '10px',
          maxWidth: '80%',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{currentPost?.title}</h2>
        <p style={{ margin: 0 }}>{currentPost?.content}</p>
      </div>
    </div>
  );
};

export default PostList;
