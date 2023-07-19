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

  const inputUsername = (event) => {
    setUsername(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    const request = {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }
    event.preventDefault();
    const user = await fetch('http://localhost:3000/login', request);
    const res = await user.json();
    if(res === 'login successful') return navigate('/dashboard');
    else if(res === 'Does not exist'){
      return navigate('/signup');
    }
    return setError(true);
  }

  function click(){
    return navigate('/signup');
  }


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
      <button onClick={click}>Sign Up</button>
      { error ? <div>Please create a new account or enter correct information</div> : null}
    </div>
  );
}

export default Login;
