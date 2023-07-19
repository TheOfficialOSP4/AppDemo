import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  // username starts off with empty string
  const [username, setUsername] = useState('');
  // password also starts off with empty string
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const URL = 'http://localhost:3000/login';

  const inputUsername = (event) => {
    setUsername(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = fetch(URL)
      .then((data) => data.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error.message));
    if (user.request.status === 200) navigate('/dashboard');
    else navigate('/signup');
  };

  return (
    <div className="login">
      <form id="login" onSubmit={handleSubmit}>
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={inputUsername}
          placeholder="Enter username here"
        />
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={inputPassword}
          placeholder="Enter password here"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
