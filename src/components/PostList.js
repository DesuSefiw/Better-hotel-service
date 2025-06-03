import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;
  const ext = currentMedia?.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);

  const fullPath = currentMedia?.includes('uploads')
    ? `https://better-hotel-service-1.onrender.com/${currentMedia.replace(/^\/?/, '')}`
    : currentMedia;

  const getThumbPath = (path) =>
    path?.includes('uploads')
      ? `https://better-hotel-service-1.onrender.com/${path.replace(/^\/?/, '')}`
      : path;

  const renderThumbnail = (post, i) => {
    const thumbExt = post.filePath?.split('.').pop()?.toLowerCase();
    const isThumbImg = ['jpg', 'jpeg', 'png', 'gif'].includes(thumbExt);
    const isThumbVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(thumbExt);
    const thumbPath = getThumbPath(post.filePath);

    return (
      <div key={i} onClick={() => setCurrentIndex(i)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
        {isThumbImg ? (
          <img src={thumbPath} alt={post.title} style={{ width: '100%', borderRadius: '8px' }} />
        ) : isThumbVideo ? (
          <video src={thumbPath} muted playsInline style={{ width: '100%', borderRadius: '8px' }} />
        ) : null}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '95%',
        maxWidth: '1200px',
        margin: '2rem auto',
        gap: '1rem',
      }}
    >
      {/* Main Display */}
      <div
        style={{
          flex: 2,
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          position: 'relative',
        }}
      >
        {isImage && (
          <img
            src={fullPath}
            alt={currentPost.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '60vh',
              objectFit: 'cover',
              borderRadius: '8px',
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
            controls
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '60vh',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}

        {/* Optional Download Button */}
        <a
          href={fullPath}
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          Download
        </a>
      </div>

      {/* Sidebar */}
      <div
        style={{
          flex: 1,
          background: '#fff',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Latest Posts</h3>
        <div
          style={{
            overflowY: viewAll ? 'scroll' : 'hidden',
            maxHeight: viewAll ? '50vh' : 'auto',
          }}
        >
          {(viewAll ? posts : posts.slice(0, 2)).map(renderThumbnail)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setViewAll(prev => !prev)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {viewAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
