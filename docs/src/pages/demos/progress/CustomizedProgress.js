import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing(2),
    color: '#00695c',
  },
  linearColorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  linearBarColorPrimary: {
    backgroundColor: '#00695c',
  },
  linearProgressDeterminate: {
    margin: `${theme.spacing(1)}px auto 0`,
    height: 10,
  },
  linearProgressDeterminateBar: {
    height: 10,
    borderRadius: 20,
  },
  linearColorSeconday: {
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  linearBarColorSecondary: {
    backgroundColor: '#ff6c5c',
  },
  // Reproduce the Facebook spinners.
  facebook: {
    margin: theme.spacing(2),
    position: 'relative',
  },
  facebook1: {
    color: '#eef3fd',
  },
  facebook2: {
    color: '#6798e5',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
});

function CustomizedProgress(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <CircularProgress className={classes.progress} size={30} thickness={5} />
      <LinearProgress
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary,
        }}
      />
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={50}
        classes={{
          bar: classes.linearProgressDeterminateBar,
          root: classes.linearProgressDeterminate,
          colorSecondary: classes.linearColorSeconday,
          barColorSecondary: classes.linearBarColorSecondary,
        }}
      />
      <div className={classes.facebook}>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.facebook1}
          size={24}
          thickness={4}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.facebook2}
          size={24}
          thickness={4}
        />
      </div>
    </Paper>
  );
}

CustomizedProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedProgress);
