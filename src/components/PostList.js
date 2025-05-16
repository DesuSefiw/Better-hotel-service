import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://better-hotel-service-1.onrender.com/api/posts')
      .then(res => {
        const filtered = res.data.filter(post => {
          const postDate = new Date(post.createdAt);
          const today = new Date();
          const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);
          return diffDays <= 8;
        });
        setPosts(filtered);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  useEffect(() => {
    if (posts.length === 0 || currentIndex >= posts.length) return;

    const currentPost = posts[currentIndex];
    const isVideo = currentPost?.filePath?.match(/\.(mp4|webm|mov|avi|mkv)$/i);

    if (!isVideo) {
      // If it's not a video, auto-advance after delay
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 3000); // Show image for 3 seconds
      return () => clearTimeout(timer);
    }

  }, [currentIndex, posts]);

  const handleVideoEnded = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const fadeInStyle = {
    animation: 'fadeIn 1s ease-in-out',
    opacity: 1,
    transform: 'scale(1)',
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  const renderMedia = (filePath) => {
    if (!filePath) return null;

    const fullPath = `https://better-hotel-service-1.onrender.com${filePath}`;
    const extension = filePath.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return (
        <img
          src={fullPath}
          alt="Post Media"
          style={{
            width: '100%',
            maxHeight: '600px',
            objectFit: 'contain',
            borderRadius: '12px',
            ...fadeInStyle,
          }}
        />
      );
    }

    if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
      return (
        <video
          src={fullPath}
          autoPlay
          muted
          playsInline
          controls
          onEnded={handleVideoEnded}
          style={{
            width: '100%',
            maxHeight: '600px',
            objectFit: 'contain',
            borderRadius: '12px',
            ...fadeInStyle,
          }}
        />
      );
    }

    return <p>Unsupported media type</p>;
  };

  if (posts.length === 0 || currentIndex >= posts.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <style>{keyframes}</style>
        <p>No posts available or all posts displayed.</p>
      </div>
    );
  }

  const post = posts[currentIndex];

  return (
    <section
      style={{
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        margin: '2rem auto',
        transition: 'all 0.5s ease',
      }}
    >
      <style>{keyframes}</style>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>
        📢 New Notice
      </h2>

      <div
        style={{
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #eee',
          borderRadius: '10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          backgroundColor: '#fafafa',
        }}
      >
        <h3 style={{ color: '#34495e' }}>{post.title}</h3>
        <p style={{ margin: '0.5rem 0 1rem', color: '#555' }}>{post.content}</p>

        {post.filePath && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            {renderMedia(post.filePath)}
          </div>
        )}

        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          Posted on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </section>
  );
};

export default PostList;
