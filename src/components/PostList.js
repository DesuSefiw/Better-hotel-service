import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
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
    if (!posts.length) return;

    const currentMedia = posts[currentIndex]?.filePath;
    const ext = currentMedia?.split('.').pop().toLowerCase();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    const delay = isImage ? 4000 : 9000;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, posts]);

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;
  if (!currentMedia) return null;

  const ext = currentMedia.split('.').pop().toLowerCase();
  const fullPath = currentMedia.startsWith('/uploads')
    ? `http://localhost:5000${currentMedia}`
    : currentMedia;

  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '1rem', backgroundColor: 'transparent', height: '100vh', width: '100%', overflow: 'hidden'
    }}>
      {isImage && (
        <img
          src={fullPath}
          alt="Post"
          style={{
            maxHeight: '90vh', maxWidth: '90vw',
            borderRadius: '12px', objectFit: 'contain',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          }}
          draggable={false}
        />
      )}

      {isVideo && (
        <video
          key={fullPath}
          src={fullPath}
          autoPlay
          muted
          playsInline
          controls={false}
          onError={() => console.error('Video load failed:', fullPath)}
          onEnded={() => setCurrentIndex((prev) => (prev + 1) % posts.length)}
          style={{
            maxHeight: '90vh', maxWidth: '90vw',
            borderRadius: '12px', objectFit: 'contain',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          }}
        />
      )}
    </div>
  );
};

export default PostList;
