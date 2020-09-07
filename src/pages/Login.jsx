import React from 'react';

import './Login.scss';
import LoginCard from '../views/Login/LoginCard';
import Register from '../views/Login/Register';

export default function Login(props) {
  return (
    <div className="login">
      <LoginCard />
      <Register />
    </div>
  );
}
