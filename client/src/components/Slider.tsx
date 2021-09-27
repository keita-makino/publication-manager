import { selectHttpOptionsAndBody, useQuery } from '@apollo/client';
import {
  FormControl,
  Grid,
  Typography,
  MenuItem,
  Slider as SliderMui,
} from '@material-ui/core';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { filterVar, isResettingVar, loadingVar } from '../localState';
import { GET_FILTER } from './Dropdown';

export type SliderType = 'year';

export type SliderProps = {
  type: SliderType;
};

const GET_RESETTING = gql`
  query GET_RESETTING {
    isResetting @client
  }
`;

export const Slider: React.FC<SliderProps> = (props: SliderProps) => {
  const { data: filter } = useQuery(GET_FILTER);
  const { data: isResetting } = useQuery(GET_RESETTING);
  const defaultValue = [2000, 2021];
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isResetting?.isResetting === true) {
      setValue(defaultValue);
    }
  }, [isResetting]);

  useEffect(() => {
    if (loadingVar().articleList === true) {
      loadingVar({ ...loadingVar(), articleList: false });
    }
  }, [filter]);

  const handleChange = (_: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommit = (_: any, newValue: number | number[]) => {
    filterVar({
      ...filterVar(),
      yearStart: value[0],
      yearEnd: value[1],
    });
    loadingVar({ ...loadingVar(), articleList: true });
  };

  return (
    <Grid
      container
      item
      xs={12}
      justify={'space-between'}
      style={{ height: '5rem' }}
      alignItems={'flex-end'}
    >
      <Grid item xs={3}>
        <Typography variant={'subtitle1'}>
          {props.type.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <SliderMui
          value={value}
          min={2000}
          max={2021}
          step={1}
          marks
          onChange={handleChange}
          onChangeCommitted={handleChangeCommit}
          valueLabelDisplay={'on'}
        />
      </Grid>
    </Grid>
  );
};
