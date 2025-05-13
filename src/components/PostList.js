import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [mediaList, setMediaList] = useState([]);
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

        // Extract all media filePaths from posts
        const allMedia = filtered
          .map(post => post.filePath)
          .filter(Boolean); // remove nulls
        setMediaList(allMedia);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  // Slideshow effect
  useEffect(() => {
    if (mediaList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mediaList.length);
    }, 6000); // every 4 seconds

    return () => clearInterval(interval);
  }, [mediaList]);

  const fadeInStyle = {
    animation: 'fadeIn 1s ease-in-out',
    opacity: 1,
    transform: 'scale(1)',
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  const renderMedia = (filePath) => {
  if (!filePath) return null;

  const fullPath = `https://better-hotel-service-1.onrender.com${filePath}`;
  const fileType = filePath.split('.').pop().toLowerCase();
  console.log('Loading media from:', fullPath);

  if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
    return (
      <img
        key={filePath}
        src={fullPath}
        alt="Post Media"
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '10px',
          ...fadeInStyle,
        }}
      />
    );
  }

  if (['mp4', 'webm'].includes(fileType)) {
    return (
      <video
        key={filePath}
        src={fullPath}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        type={`video/${fileType}`}
        style={{
          maxWidth: '100%',
          borderRadius: '10px',
          ...fadeInStyle,
        }}
      />
    );
  }

  return null;
};

  
  return (
    <section
      style={{
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '2rem auto',
        textAlign: 'center',
      }}
    >
      <style>{keyframes}</style>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>📢 New Notices</h2>

      {posts.length === 0 ? (
        <p>No posts available at the moment.</p>
      ) : (
        <>
          {mediaList.length > 0 && (
            <div
              style={{
                width: '100%',
                maxHeight: '500px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {renderMedia(mediaList[currentIndex])}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PostList;
