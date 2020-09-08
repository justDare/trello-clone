import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commonActions from '../../actions';

// Material
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import './LoginCard.scss';
import * as actions from './actions';
import Loader from '../../components/Loader';

export default function LoginCard(props) {
  // Redux
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  // Local State
  const [formFields, setFormFields] = useState({ email: '', password: '' });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (error.id === 'LOGIN ERROR') {
      setLoadingLogin(false);
      setLoginError('Invalid credentials.');
      dispatch(commonActions.clearErrors());
    }
  }, [error, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    dispatch(actions.login(formFields));
  };

  const handleFormChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Loader open={loadingLogin} />
      <Paper className="login-modal" variant="outlined">
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
          {loginError ? (
            <Alert severity="error">Login error — {loginError}</Alert>
          ) : (
            ''
          )}
        </form>
      </Paper>
    </>
  );
}
