// import
import './dashboard.css';
// import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const click = () => {
    return navigate('/archive');
  };

  return (
    <div>
      <button onClick={click}>CLICK ME!</button>
    </div>
  )
}

export default Dashboard;
