import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
   axios.get('https://better-hotel-service.vercel.app/api/posts')
  .then(res => {
    const postsArray = res.data.posts || res.data; // fallback if already array
    const filtered = postsArray.filter(post => {
      const postDate = new Date(post.createdAt);
      const today = new Date();
      const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);

      const ext = post.filePath?.split('.').pop()?.toLowerCase();
      const isValidMedia = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'webm', 'ogg'].includes(ext);

      return diffDays <= 8 && postDate <= today && post.filePath && isValidMedia;
    });

    setPosts(filtered.length ? filtered : [{
      title: 'Fallback Post',
      filePath: 'https://via.placeholder.com/800x500.jpg',
      createdAt: new Date().toISOString(),
    }]);
  })
  .catch(err => console.error('Error fetching posts:', err));
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    const currentMedia = posts[currentIndex]?.filePath;
    const ext = currentMedia?.split('.').pop()?.toLowerCase();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    const delay = isImage ? 4000 : 9000;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, posts]);

  if (!posts.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        No recent posts to display.
      </div>
    );
  }

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;
  const ext = currentMedia?.split('.').pop()?.toLowerCase();
  const fullPath = currentMedia?.includes('uploads')
  ? `https://better-hotel-service.vercel.app/${currentMedia.replace(/^\/?/, '')}`
  : currentMedia;


  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      height: '100vh',
      width: '100%',
      background: '#f9f9f9',
    }}>
      {isImage && (
        <img
          src={fullPath}
          alt={currentPost.title}
          style={{
            maxHeight: '90vh',
            maxWidth: '90vw',
            borderRadius: '12px',
            objectFit: 'contain',
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
          loop
          style={{
            maxHeight: '90vh',
            maxWidth: '90vw',
            borderRadius: '12px',
            objectFit: 'contain',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          }}
          onError={() => console.error('Video failed to load:', fullPath)}
        />
      )}
    </div>
  );
};

export default PostList;
