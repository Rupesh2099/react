import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function BasicPagination() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </div>
  );
}
