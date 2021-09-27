import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { Dropdown } from './Dropdown';
import { ArticleList } from './ArticleList';
import { FilterBoard } from './FilterBoard';
import { PageSelect } from './PageSelect';

export type IndexProps = {};

export const Index: React.FC<IndexProps> = (props: IndexProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FilterBoard />
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ margin: '1rem 0 0 0' }} />
        <Divider style={{ margin: '0.2rem 0 1rem 0' }} />
      </Grid>
      <Grid item xs={12}>
        <ArticleList />
      </Grid>
    </Grid>
  );
};
