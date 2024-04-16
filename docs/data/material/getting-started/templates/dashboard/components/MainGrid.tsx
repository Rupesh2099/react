import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ChartUserByCountry from './ChartUserByCountry';
import StatCard, { StatCardProps } from './StatCard';
import HighlightedCard from './HighlightedCard';

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14K',
    interval: 'last 30 days',
    trend: 'up',
    data: [2, 4, 3, 5, 7, 6, 8, 10],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'last 30 days',
    trend: 'down',
    data: [10, 7, 6, 8, 5, 4, 4, 2],
  },
  {
    title: 'Event count',
    value: '200K',
    interval: 'last 30 days',
    trend: 'neutral',
    data: [5, 4, 6, 3, 4, 3, 7, 6],
  },
];

export default function MainGrid() {
  return (
    <React.Fragment>
      {/* cards */}

      <Grid container spacing={2} columns={12}>
        {data.map((card, index) => (
          <Grid xs={12} md={6} lg={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid xs={12} md={6} lg={3}>
          <HighlightedCard />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        direction={{ xs: 'row-reverse', lg: 'row' }}
        columns={12}
      >
        <Grid xs={12} lg={9}>
          chart
        </Grid>
        <Grid xs={12} lg={3}>
          <ChartUserByCountry />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
