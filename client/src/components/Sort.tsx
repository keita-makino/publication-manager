import { Grid, Typography, Select } from '@material-ui/core';
import React from 'react';

export type SortProps = {};

export const Sort: React.FC<SortProps> = (props: SortProps) => {
  return (
    <Grid>
      <Typography variant={'subtitle1'}>Sort By:</Typography>
      <Select></Select>
    </Grid>
  );
};
