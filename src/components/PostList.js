import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const timeoutRef = useRef(null);
  const mediaRef = useRef(null);
  const [mediaHeight, setMediaHeight] = useState(0);

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
  const now = new Date();

  // Calculate the difference in days (ignore time by setting both dates to midnight)
  const postMidnight = new Date(postDate.toDateString());
  const nowMidnight = new Date(now.toDateString());

  const diffTime = nowMidnight - postMidnight;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const ext = post.filePath?.split('.').pop()?.toLowerCase();
  const validExts = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'webm', 'ogg'];

  return diffDays < 8 && validExts.includes(ext);
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

  // Measure media height to sync sidebar
  useEffect(() => {
    if (mediaRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setMediaHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(mediaRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [mediaRef.current]);

  const currentPost = posts[currentIndex];
  const currentMedia = currentPost?.filePath;
  const ext = currentMedia?.split('.').pop()?.toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
  const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);

  const getFullPath = path =>
    path?.includes('uploads')
      ? `https://better-hotel-service-1.onrender.com/${path.replace(/^\/?/, '')}`
      : path;

  const renderThumbnail = (post, i) => {
    const ext = post.filePath?.split('.').pop()?.toLowerCase();
    const isImg = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    const isVid = ['mp4', 'mov', 'webm', 'ogg'].includes(ext);
    const thumbPath = getFullPath(post.filePath);

    return (
      <div
        key={i}
        onClick={() => setCurrentIndex(i)}
        style={{
          cursor: 'pointer',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: currentIndex === i ? '0 0 0 3px #007BFF' : 'none',
          transition: 'box-shadow 0.3s ease',
          height: viewAll ? 'auto' : `${mediaHeight / 2 - 20}px`,
          marginBottom: '1rem',
        }}
      >
        {isImg ? (
          <img src={thumbPath} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : isVid ? (
          <video src={thumbPath} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '95%',
      maxWidth: '1200px',
      margin: '2rem auto',
      gap: '1rem',
      alignItems: 'stretch',
    }}>
      {/* Main Media Display */}
      <div
        ref={mediaRef}
        style={{
          flex: '2 1 60%',
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {isImage && (
          <img
            src={getFullPath(currentMedia)}
            alt={currentPost.title}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            draggable={false}
          />
        )}
        {isVideo && (
          <video
  key={getFullPath(currentMedia)}
  src={getFullPath(currentMedia)}
  autoPlay
  muted
  playsInline
  loop
  controls
  style={{
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
  }}
  onError={(e) => console.error('Video load error:', e)}
/>

        )}
      </div>

      {/* Sidebar for Thumbnails */}
      <div style={{
        flex: '1 1 35%',
        background: '#fff',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: `${mediaHeight}px`,
        overflow: 'hidden',
        width: '100%',
      }}>
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Latest Posts</h3>

        <div
          style={{
            overflowY: viewAll ? 'auto' : 'hidden',
            transition: 'all 0.5s ease',
          }}
        >
          {(viewAll ? posts : posts.slice(0, 2)).map(renderThumbnail)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setViewAll(prev => !prev)}
            style={{
              padding: '0.5rem 1.2rem',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
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
