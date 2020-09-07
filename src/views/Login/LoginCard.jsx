import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LoginCard.scss';

export default function LoginCard(props) {
  const [formFields, setFormFields] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('hi!');
  };

  const handleFormChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formFields);

  return (
    <Paper className="login-modal">
      <Typography variant="h3" gutterBottom>
        Trello Clone
      </Typography>
      <form onSubmit={(e) => handleLogin(e)}>
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          required={true}
          margin="normal"
          value={formFields.email}
          onChange={handleFormChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          required={true}
          margin="normal"
          value={formFields.password}
          onChange={handleFormChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Paper>
  );
}
