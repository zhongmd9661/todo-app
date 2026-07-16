import React, { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (data: { email: string; username: string; password: string }) => void;
  onCancel: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !username || !password) {
      setError('All fields are required');
      return;
    }

    onSubmit({ email, username, password });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Register</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.buttons}>
        <button type="submit" style={styles.primaryBtn}>
          Register
        </button>
        <button type="button" onClick={onCancel} style={styles.secondaryBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: { maxWidth: 400, margin: '0 auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 },
  title: { marginBottom: 16 },
  error: { color: 'red', marginBottom: 12 },
  field: { marginBottom: 12 },
  input: { width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' },
  buttons: { display: 'flex', gap: 8, marginTop: 16 },
  primaryBtn: { flex: 1, padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  secondaryBtn: { flex: 1, padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
};
