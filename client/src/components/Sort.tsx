import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { sortVar } from '../localState';

export type SortProps = {};

export const Sort: React.FC<SortProps> = (props: SortProps) => {
  const [value, setValue] = useState('date-desc');

  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    sortVar({
      by: event.target.value.split('-')[0],
      direction: event.target.value.split('-')[1],
    });
    console.log(sortVar());
  };

  return (
    <Grid item container justifyContent={'flex-end'}>
      <Grid item>
        <FormControl>
          <Select
            value={value}
            defaultValue={'Year: New-Old'}
            onChange={onChange}
          >
            <MenuItem value={'name-asc'}>Title (A-Z)</MenuItem>
            <MenuItem value={'name-desc'}>Title (Z-A)</MenuItem>
            <MenuItem value={'date-desc'}>Year (New-Old)</MenuItem>
            <MenuItem value={'date-asc'}>Year (Old-New)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
