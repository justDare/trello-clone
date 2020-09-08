import React from 'react';
import PropTypes from 'prop-types';

// Material
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

Loader.propTypes = {
  open: PropTypes.bool,
};

Loader.defaultProps = {
  open: false,
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
