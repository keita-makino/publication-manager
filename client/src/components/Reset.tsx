import { Button, Grid } from '@mui/material';
import React from 'react';
import { filterInitial, filterVar, isResettingVar } from '../localState';

export type ResetProps = {};

const onClick = () => {
  filterVar(filterInitial);
  isResettingVar(true);
  setTimeout(() => {
    isResettingVar(false);
  }, 1000);
};

export const Reset: React.FC<ResetProps> = (props: ResetProps) => {
  return (
    <Button
      variant={'contained'}
      color={'primary'}
      size={'large'}
      onClickCapture={onClick}
    >
      Reset
    </Button>
  );
};
