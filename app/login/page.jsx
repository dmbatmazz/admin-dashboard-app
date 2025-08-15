'use client';
import './login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); //bunsuz render neden bak

    if (username === 'admin' && password === '123456') {
      setError(false);
      router.push('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />

          {error && (
            <p className="error-text" style={{ display: 'block' }}>
              Invalid credentials
            </p>
          )}

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
