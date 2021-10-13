import { Card, Grid, Typography, Divider } from '@mui/material';
import React from 'react';
import { Dropdown, DropdownProps } from './Dropdown';
import { Reset } from './Reset';
import { Slider } from './Slider';

export type FilterBoardProps = {};

export const FilterBoard: React.FC<FilterBoardProps> = (
  props: FilterBoardProps
) => {
  return (
    <Grid container item xs={12} md={9} lg={6} spacing={1} direction={'column'}>
      <Card variant={'outlined'} style={{ padding: '2rem' }}>
        <Typography variant={'h6'}>Filter articles:</Typography>
        <Divider style={{ margin: '0.5rem 0' }} />
        {[
          {
            type: 'author',
          },
          {
            type: 'tag',
            name: 'keyword',
          },
          {
            type: 'project',
          },
          {
            type: 'journal',
          },
        ].map((item) => (
          <Dropdown {...(item as DropdownProps)} />
        ))}
        <Grid container item xs={12}>
          <Slider type={'year'} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent={'flex-end'}
          style={{ marginTop: '1rem', height: '2.5rem' }}
        >
          <Reset />
        </Grid>
      </Card>
    </Grid>
  );
};
