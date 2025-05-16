import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

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

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return (
        <img
          src={fullPath}
          alt="Post Media"
          style={{
            width: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
            borderRadius: '10px',
            ...fadeInStyle,
          }}
        />
      );
    }

    if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(fileType)) {
      return (
        <video
          src={fullPath}
          autoPlay
          muted
          playsInline
          loop
          controls
          preload="auto"
          style={{
            width: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
            borderRadius: '10px',
            ...fadeInStyle,
          }}
          onLoadedMetadata={(e) => {
            const duration = e.target.duration;
            setVideoDuration(duration);
            setIsVideoPlaying(true);
          }}
          onPause={() => setIsVideoPlaying(false)}
          onEnded={() => setIsVideoPlaying(false)}
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
        maxWidth: '900px',
        margin: '2rem auto',
      }}
    >
      <style>{keyframes}</style>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem', textAlign: 'center' }}>
        📢 New Notices
      </h2>

      {posts.length === 0 ? (
        <p>No posts available at the moment.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
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
                  maxHeight: '500px',
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
        ))
      )}
    </section>
  );
};

export default PostList;
