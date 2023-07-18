// import
import './signup.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import React from 'react';
// needs to have a role as one criteria
// database should contain:
// username, encrypted password, role

// when using verifyUser, we need to set up the role

function Signup() {
  const navigate = useNavigate();
  const URL = 'localhost:5173/signup';

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const role = roleRef.current.value;

    if (username === '') {
      alert('Please enter a username');
    } else if (password === '') {
      alert('Please enter a password');
    } else if (role === '') {
      alert('Please specify role');
    } else if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'user') {
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role: role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data');
          alert('Successfully created user');
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      alert("Invalid Role");
    }
  };

  return (
    <div className="signup-background">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          className="signup-input"
          name="username"
          type="text"
          placeholder="Enter Username Here"
        />
        <input
          ref={passwordRef}
          className="signup-input"
          name="password"
          type="password"
          placeholder="Enter Password Here"
        />
        <input
          ref={roleRef}
          className="signup-input"
          name="role"
          type="text"
          placeholder="Enter Role Here"
        />
        <input
          id="formButton"
          type="submit"
          value="Submit"
          class="submit-button"
        />
      </form>
    </div>
  );
}

export default Signup;
