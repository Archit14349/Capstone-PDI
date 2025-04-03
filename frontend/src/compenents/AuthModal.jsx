import { useState } from 'react';
import axios from 'axios';
import './AuthModal.css'; 

export default function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:8081/auth/login'
      : 'http://localhost:8081/auth/register';

    try {
      const res = await axios.post(url, { username, password });
      if (isLogin && res.data.token) {
        localStorage.setItem('token', res.data.token);
        onSuccess(); 
      } else if (!isLogin) {
        alert('Registered! Now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Auth failed. Check credentials.');
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleAuth}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: '10px', color: 'blue' }}>
          {isLogin ? 'No account? Register' : 'Already registered? Login'}
        </p>
        <button onClick={onClose} className="close-btn">X</button>
      </div>
    </div>
  );
}
