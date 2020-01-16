import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationLink() {
  return (
    <Router>
      <Pagination
        count={10}
        renderItem={item => (
          <PaginationItem
            to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
            component={Link}
            {...item}
          />
        )}
      />
    </Router>
  );
}
