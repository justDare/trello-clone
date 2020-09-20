import React from "react";

import "./index.scss";
import LoginCard from "./LoginCard";
import Register from "./Register";

export default function Login(props) {
  return (
    <div className="login">
      <LoginCard />
      <Register />
    </div>
  );
}
