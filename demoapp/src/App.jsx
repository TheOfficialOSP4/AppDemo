import './App.css';
// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Archive from './Archive';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </>
  );
}

export default App;
