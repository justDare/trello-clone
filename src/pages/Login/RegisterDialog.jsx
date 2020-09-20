import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

import "./RegisterDialog.scss";
import Loader from "../../components/Loader";
import * as actions from "./actions";
import * as commonActions from "../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterDialog(props) {
  // Redux
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  // Local State
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loadingRegistration, setLoadingRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  useEffect(() => {
    if (formFields.password === formFields.confirm_password)
      setPasswordMatchError(false);
  }, [formFields]);

  useEffect(() => {
    if (error.id === "REGISTER ERROR") {
      setLoadingRegistration(false);
      setRegistrationError("This email may be in use.");
      dispatch(commonActions.clearErrors());
    }
  }, [error, dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (formFields.password !== formFields.confirm_password) {
      setPasswordMatchError(true);
      return;
    }
    setLoadingRegistration(true);
    dispatch(actions.register(formFields));
  };

  const handleFormChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Loader open={loadingRegistration} />
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        className="register-dialog"
      >
        <AppBar className="app-bar">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className="dialog-content">
          <Paper className="register-card" variant="outlined">
            <Typography variant="h3" gutterBottom>
              Register
            </Typography>
            <form onSubmit={(e) => handleRegister(e)}>
              <TextField
                name="name"
                label="Name"
                type="text"
                variant="outlined"
                required={true}
                margin="normal"
                value={formFields.name}
                onChange={handleFormChange}
              />
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
                error={passwordMatchError}
              />
              <TextField
                name="confirm_password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                required={true}
                margin="normal"
                value={formFields.confirm_password}
                onChange={handleFormChange}
                error={passwordMatchError}
              />
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
              {registrationError ? (
                <Alert severity="error">
                  Registration error — {registrationError}
                </Alert>
              ) : (
                ""
              )}
            </form>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
