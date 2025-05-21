import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
  });

  const [type, setTrainingType] = useState(''); // New state for training type

  const servicesList = [
    'Organize a Hotel',
    'Take Training',
    'Get a Job',
    'Write a Book',
  ];

  const [trainers, setTrainers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', phone: '', services: [] });
  const [editTrainer, setEditTrainer] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [viewMode, setViewMode] = useState('trainers'); // 'trainers' or 'posts'
  const [showPostForm, setShowPostForm] = useState(false);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');
  const [postFile, setPostFile] = useState(null);
   const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleServiceChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: updatedServices });

    // Reset training type if "Take Training" is deselected
    if (service === 'Take Training' && setNewTrainer.services.includes(service)) {
      setTrainingType('');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (!decoded.isCEO) return navigate('/');

    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const [resTrainers, resPosts, resUsers] = await Promise.all([
          fetch('https://better-hotel-service-1.onrender.com/api/trainers', { headers }),
          fetch('https://better-hotel-service-1.onrender.com/api/posts', { headers }),
          fetch('https://better-hotel-service-1.onrender.com/api/stats', { headers }),
        ]);

        setTrainers(await resTrainers.json());
        setPosts(await resPosts.json());
        const usersData = await resUsers.json();
        setUserCount(usersData.count || 0);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData();
  }, [navigate]);
const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Reset on desktop
      }
    };
   
const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "#4CAF50",
    padding: "10px 20px",
    zIndex: 999,
  };

  const topRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  };

  const buttonCommonStyle = {
    backgroundColor: 'white',
    color: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const menuStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '10px',
    marginTop: '10px',
    alignItems: isMobile ? 'flex-start' : 'center',
  };
  const categorizeServices = () => {
    const serviceCategories = {
      'Organize a Hotel': 0,
      'Take Training': 0,
      'Get a Job': 0,
      'Write a Book': 0,
    };

    if (Array.isArray(trainers)) {
      trainers.forEach((trainer) => {
        trainer.services.forEach((service) => {
          if (serviceCategories[service] !== undefined) {
            serviceCategories[service]++;
          }
        });
      });
    }
    return serviceCategories;
  };

  const chartData = {
    labels: ['Organize a Hotel', 'Take Training', 'Get a Job', 'Write a Book'],
    datasets: [
      {
        label: 'Customer Service Count',
        data: Object.values(categorizeServices()),
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

const handleAddTrainer = async () => {
  const token = localStorage.getItem('token');

  try {
    const trainerData = { ...newTrainer };

    if (newTrainer.services.includes('Take Training')) {
      trainerData.type = newTrainer.trainingType; // <-- FIXED
    }

    const res = await fetch(`https://better-hotel-service-1.onrender.com/api/trainers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(trainerData),
    });

    const data = await res.json();

    if (res.ok) {
      setTrainers([data.data, ...trainers]);
      setNewTrainer({ name: '', email: '', phone: '', services: [], trainingType: '' });
      setShowTrainerForm(false);
    } else {
      console.error('Failed response:', data);
      alert(data.message || 'Failed to register trainer. Please try again.');
    }
  } catch (err) {
    console.error('Error Adding trainer:', err);
    alert('An error occurred while adding the trainer.');
  }
};

  const handleEditTrainer = (trainer) => {
    setEditTrainer(trainer);
    setShowTrainerForm(true);  // Show form in edit mode
  };

  const handleUpdateTrainer = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://better-hotel-service-1.onrender.com/api/trainers/${editTrainer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...editTrainer, trainingType: type }),
      });
      if (res.ok) {
        setTrainers(trainers.map(t => (t._id === editTrainer._id ? { ...editTrainer, trainingType: type } : t)));
        setEditTrainer(null);
        setShowTrainerForm(false);
      }
    } catch (err) {
      console.error('Edit trainer error:', err);
    }
  };

  const handleDeleteTrainer = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://better-hotel-service-1.onrender.com/api/trainers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTrainers(trainers.filter(t => t._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handlePostSubmit = async () => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  formData.append('title', postTitle);
  formData.append('content', postContent);

  if (postFile) {
    formData.append('file', postFile); // ✅ Append the file properly
  }

  try {
    setIsSubmitting(true);

    const res = await fetch('https://better-hotel-service-1.onrender.com/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setPosts([data.post, ...posts]);
      setPostTitle('');
      setPostContent('');
      setPostFile('');
      alert('🎉 Notice submitted successfully!');
      setShowPostForm(false);
    } else {
      alert(data.message || 'Upload failed!');
    }
  } catch (err) {
    console.error('Post error:', err);
    alert('Something went wrong. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};



  const handleEditPost = (post) => {
    setEditPostId(post._id);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
  };

  const handleUpdatePost = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://better-hotel-service-1.onrender.com/api/posts/${editPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editPostTitle, content: editPostContent }),
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(posts.map(p => (p._id === editPostId ? data.post : p)));
        setEditPostId(null);
        setEditPostTitle('');
        setEditPostContent('');
      }
    } catch (err) {
      console.error('Edit post error:', err);
    }
  };

  const handleDeletePost = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://better-hotel-service-1.onrender.com/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <>
    <div style={headerStyle}>
      <div style={topRowStyle}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
      </div>

      <div style={menuStyle}>
        <button onClick={() => setShowPostForm(true)} style={buttonCommonStyle}>📝 New Notice</button>
        <button onClick={() => setViewMode('posts')} style={buttonCommonStyle}>📄 View Posts</button>
        <button onClick={() => setViewMode('trainers')} style={buttonCommonStyle}>👥 View Trainers</button>
          <Link to="/" style={buttonCommonStyle}>Log Out</Link>
      </div>
    </div>
          <br></br><br></br>
      <p>Total Registered Customers: <strong>{userCount}</strong></p>

      {/* Add Trainer Button */}
      <button onClick={() => {setShowTrainerForm(true);setShowPostForm(false);}} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', marginTop: '20px' }}>
        ➕ Add Trainer
      </button>

      {/* View Trainers Section */}
      {viewMode === 'trainers' && (
        <div style={{ marginTop: '20px' }}>
          <h3>👥 Registered Customers:- <strong>{userCount}</strong></h3>
          {trainers.length === 0 ? <p>No Customers available.</p> : (
            trainers.map(trainer => (
              <div key={trainer._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <p><strong>{trainer.name}</strong> (Email: {trainer.email})</p>
                <p><strong>Phone-No:</strong> {trainer.phone}</p> 
                <p><strong>Services:</strong> {trainer.services.join(', ')}({trainer.type})</p> {/* Display multiple services */}
                <button onClick={() => handleEditTrainer(trainer)} style={{ padding: '5px', backgroundColor: '#FF9800', color: '#fff', borderRadius: '5px', marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDeleteTrainer(trainer._id)} style={{ padding: '5px', backgroundColor: '#f44336', color: '#fff', borderRadius: '5px' }}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Trainer Form */}
      {showTrainerForm && (
  <div style={{
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }}>
    <h3 style={{ textAlign: 'center', color: '#333' }}>
      {editTrainer ? 'Edit Trainer' : 'Add New Trainer'}
    </h3>

    <label>Name</label>
    <input
      type="text"
      placeholder="Trainer Name"
      value={editTrainer ? editTrainer.name : newTrainer.name}
      onChange={(e) =>
        editTrainer
          ? setEditTrainer({ ...editTrainer, name: e.target.value })
          : setNewTrainer({ ...newTrainer, name: e.target.value })
      }
      style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
    />

    <label>Email</label>
    <input
      type="email"
      placeholder="Email"
      value={editTrainer ? editTrainer.email : newTrainer.email}
      onChange={(e) =>
        editTrainer
          ? setEditTrainer({ ...editTrainer, email: e.target.value })
          : setNewTrainer({ ...newTrainer, email: e.target.value })
      }
      style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
    />

    <label>Phone</label>
    <input
      type="text"
      placeholder="Phone Number"
      value={editTrainer ? editTrainer.phone : newTrainer.phone}
      onChange={(e) =>
        editTrainer
          ? setEditTrainer({ ...editTrainer, phone: e.target.value })
          : setNewTrainer({ ...newTrainer, phone: e.target.value })
      }
      style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
    />

    <label style={styles.label}>Select Services You're Interested In:</label>
    <div style={styles.checkboxContainer}>
      {servicesList.map((service) => {
        const currentTrainer = editTrainer || newTrainer;
        return (
          <label key={service} style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={service}
              checked={currentTrainer?.services?.includes(service)}
              onChange={() => {
                const updatedServices = currentTrainer.services.includes(service)
                  ? currentTrainer.services.filter((s) => s !== service)
                  : [...currentTrainer.services, service];

                if (editTrainer) {
                  setEditTrainer({ ...editTrainer, services: updatedServices });
                  if (service === 'Take Training' && !updatedServices.includes('Take Training')) {
                    setTrainingType('');
                  }
                } else {
                  setNewTrainer({ ...newTrainer, services: updatedServices });
                  if (service === 'Take Training' && !updatedServices.includes('Take Training')) {
                    setTrainingType('');
                  }
                }
              }}
            />{' '}
            {service}
          </label>
        );
      })}
    </div>

    {/* Conditional training type selector */}
    {(editTrainer?.services?.includes('Take Training') ||
      newTrainer?.services?.includes('Take Training')) && (
      <div>
        <label style={styles.label}>
  Are you registering as an individual or organization?
</label>
<select
  value={(editTrainer ? editTrainer.trainingType : newTrainer.trainingType) || ''}
  onChange={(e) =>
    editTrainer
      ? setEditTrainer({ ...editTrainer, trainingType: e.target.value })
      : setNewTrainer({ ...newTrainer, trainingType: e.target.value })
  }
  style={styles.input}
  required
>
  <option value="">-- Select Option --</option>
  <option value="Individual">Individual</option>
  <option value="Organization">Organization</option>
</select>


      </div>
    )}




    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        onClick={() => {
          editTrainer ? handleUpdateTrainer() : handleAddTrainer();
        }}
        style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', flex: 1, marginRight: '10px' }}
      >
        {editTrainer ? 'Update' : 'Add'}
      </button>
      <button
        onClick={() => {
          setShowTrainerForm(false);
          setEditTrainer(null);
        }}
        style={{ padding: '10px', backgroundColor: '#ccc', color: '#333', borderRadius: '5px', flex: 1 }}
      >
        Cancel
      </button>
    </div>
  </div>
)}


      {/* View Posts Section */}
      {viewMode === 'posts' && (
        <div style={{ marginTop: '40px' }}>
          <h3>📄 Notices</h3>
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <button onClick={() => handleEditPost(post)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#FF9800', color: '#fff', borderRadius: '5px' }}>Edit</button>
                <button onClick={() => handleDeletePost(post._id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: '#fff', borderRadius: '5px' }}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Post Form */}
     {showPostForm && (
        <div style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '30px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Notice</h3>

          <label>Title</label>
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Enter title"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <label>Content</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={4}
            placeholder="Write content here"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <label>Upload Media (Image, Video, PDF, Doc)</label>
          <input
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={(e) => setPostFile(e.target.files[0])}
          />

          {postFile && (
            <div style={{ fontSize: '14px', color: '#555' }}>
              Selected: {postFile.name}
            </div>
          )}

          <button
            onClick={handlePostSubmit}
            disabled={isSubmitting}
            style={{
              padding: '10px',
              backgroundColor: isSubmitting ? '#ccc' : '#4CAF50',
              color: '#fff',
              borderRadius: '5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Uploading...' : 'Submit Notice'}
          </button>

          <button
            onClick={() => setShowPostForm(false)}
            style={{
              padding: '10px',
              backgroundColor: '#f44336',
              color: '#fff',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Edit Post Form */}
      {editPostId && (
        <div style={{ marginTop: '30px' }}>
          <h3>Edit Notice</h3>
          <input
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
            style={{ margin: '5px 0', padding: '5px', width: '100%' }}
          />
          <textarea
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            rows="5"
            style={{ margin: '5px 0', padding: '5px', width: '100%' }}
          />
          <button onClick={handleUpdatePost} style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px' }}>
            Update
          </button>
          <button onClick={() => setEditPostId(null)} style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#f44336', color: '#fff', borderRadius: '5px' }}>
            Cancel
          </button>
        </div>
      )}
       {/* Bar Chart Section */}
       <div style={{ marginTop: '40px' }}>
        <h3>📊 Hotel Services Overview</h3>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Customer Services Count' } } }} />
      </div>
  
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    background: '#f2f6fc',
    minHeight: '90vh',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#003366',
  },
  description: {
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '20px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#003366',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
  },
  checkboxLabel: {
    color: '#333',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  homeButton: {
    marginTop: '10px',
    padding: '20px 100px',
    borderRadius: '25px',
    backgroundColor: 'orange',
    border: 'none',
    color: 'white',
  },
};

export default Dashboard;
