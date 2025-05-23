import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Fetch and filter posts
  useEffect(() => {
    axios.get('https://better-hotel-service-1.onrender.com/api/posts')
      .then(res => {
        const rawPosts = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.posts)
          ? res.data.posts
          : [];

        const today = new Date();
        const filtered = rawPosts.filter(post => {
          const postDate = new Date(post.createdAt);
          const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);
          const ext = post.filePath?.split('.').pop()?.toLowerCase();
          const validExts = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'webm', 'ogg'];
          return diffDays <= 8 && postDate <= today && post.filePath && validExts.includes(ext);
        });

        setPosts(filtered.length ? filtered : [{
          title: 'Fallback Post',
          filePath: 'https://via.placeholder.com/800x450.jpg',
          createdAt: new Date().toISOString(),
        }]);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  // Handle auto-slide
  useEffect(() => {
    if (!posts.length) return;

    const currentMedia = posts[currentIndex]?.filePath;
    const ext = currentMedia?.split('.').pop()?.toLowerCase();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    const delay = isImage ? 4000 : 9000;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % posts.length);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, posts]);

  if (!posts.length) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem', fontSize: '14px' }}>
        No recent posts to display.
      </div>
    );
  }

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;
  const ext = currentMedia?.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);

  // Prepare full file path
  const fullPath = currentMedia?.includes('uploads')
    ? `https://better-hotel-service-1.onrender.com/${currentMedia.replace(/^\/?/, '')}`
    : currentMedia;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      maxWidth: '90vw',
      maxHeight: '80vh',
      margin: '2rem auto',
      background: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'relative',
    }}>
      {isImage && (
        <img
          src={fullPath}
          alt={currentPost.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
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
          controls={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
          onError={() => console.error('Video failed to load:', fullPath)}
        />
      )}
    </div>
  );
};

export default PostList;
