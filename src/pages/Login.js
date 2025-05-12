import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('token', data.token);
        if (data.isCEO) {
          navigate('/dashboard');
        } else {
          alert('Access denied. CEO only.');
        }
      }
       else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>CEO Login</h2>
        <p style={{textAlign: 'center',fontSize: '14px',marginBottom: '20px',color: '#555',}}>
            this only permission to CEO or Training manager
            </p>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
           <div style={{ textAlign: 'right' }}>
                <Link to="/">
                  <button style={{ marginTop: '10px', padding: '20px 40px', borderRadius: '25px', backgroundColor: 'orange', border: 'none', color: 'white' }}>
                    Back to Home
                  </button>
                </Link>
              </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f2f2f2',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '15px',
  },
  title: {
    textAlign: 'center',
    color: '#003366',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    backgroundColor: 'orange',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Login;
