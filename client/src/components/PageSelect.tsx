import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { currentPageVar, filterVar } from '../localState';

export type PageSelectProps = {
  max: number;
};

export const PageSelect: React.FC<PageSelectProps> = (
  props: PageSelectProps
) => {
  const currentPage = useReactiveVar(currentPageVar);
  const filter = useReactiveVar(filterVar);

  useEffect(() => {
    currentPageVar(1);
  }, [filter]);

  return (
    <Grid
      item
      container
      justifyContent={'flex-end'}
      alignItems={'center'}
      spacing={2}
    >
      <Grid item>
        <Button
          variant={'outlined'}
          onClick={() => {
            currentPageVar(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          {'<'}
        </Button>
      </Grid>
      <Grid item>
        <Typography variant={'subtitle1'}>
          {(currentPage - 1) * 20 + 1}
          {' - '}
          {Math.min(currentPage * 20, (currentPage - 1) * 20 + props.max)}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant={'outlined'}
          onClick={() => {
            currentPageVar(currentPage + 1);
          }}
          disabled={props.max < 21}
        >
          {'>'}
        </Button>
      </Grid>
    </Grid>
  );
};
