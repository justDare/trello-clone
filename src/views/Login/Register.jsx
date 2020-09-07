import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './Register.scss';
import RegisterDialog from '../../views/Login/RegisterDialog';

export default function Register(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeRegisterDialog = () => {
    setDialogOpen(false);
  };

  const openRegisterDialog = () => {
    setDialogOpen(true);
  };

  return (
    <div className="register">
      <Typography variant="overline" gutterBottom className="need-account">
        Need an account?
      </Typography>
      <Button variant="contained" color="default" onClick={openRegisterDialog}>
        Register
      </Button>
      <RegisterDialog open={dialogOpen} handleClose={closeRegisterDialog} />
    </div>
  );
}
