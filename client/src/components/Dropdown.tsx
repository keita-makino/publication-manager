import { selectHttpOptionsAndBody, useQuery } from '@apollo/client';
import {
  FormControl,
  Grid,
  Typography,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import gql from 'graphql-tag';
import { capitalize, sortBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { filterVar, isResettingVar, loadingVar } from '../localState';

export type DropDownType = 'author' | 'tag' | 'project' | 'journal';

export type DropdownProps = {
  type: DropDownType;
  name?: string;
};

const GET_AUTHOR_NAME_LIST = gql`
  query GET_AUTHOR_NAME_LIST {
    authors(where: { groups: { some: { id: { equals: "core" } } } }) {
      id
      name
    }
  }
`;

const GET_TAG_LIST = gql`
  query GET_TAG_LIST {
    tags(where: { groups: { some: { id: { equals: "core" } } } }) {
      id
      name
    }
  }
`;

const GET_PROJECT_LIST = gql`
  query GET_PROJECT_LIST {
    projects {
      id
      name
    }
  }
`;

const GET_JOURNAL_LIST = gql`
  query GET_JOURNAL_LIST {
    journals {
      id
      name
    }
  }
`;

export const GET_FILTER = gql`
  query GET_FILTER {
    filter @client
  }
`;

const GET_RESETTING = gql`
  query GET_RESETTING {
    isResetting @client
  }
`;

const useURLQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { data } = useQuery(
    props.type === 'author'
      ? GET_AUTHOR_NAME_LIST
      : props.type === 'tag'
      ? GET_TAG_LIST
      : props.type === 'project'
      ? GET_PROJECT_LIST
      : GET_JOURNAL_LIST
  );

  const query = useURLQuery();

  const { data: filter } = useQuery(GET_FILTER);
  const { data: isResetting } = useQuery(GET_RESETTING);
  const defaultValue = {
    id: undefined,
    name: undefined,
  };
  const [value, setValue] = useState<{
    id: string | undefined;
    name: string | undefined;
  }>(defaultValue);

  useEffect(() => {
    if (data) {
      loadingVar({ ...loadingVar(), articleList: false });
    }
  }, [data]);

  useEffect(() => {
    if (data && query.get(props.type) !== null) {
      const newValue = data[`${props.type}s`].find(
        (item: { id: string | null }) => item.id === query.get(props.type)
      );
      setValue(newValue);
      handleChange(undefined, newValue);
    }
  }, [data]);

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

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
    filterVar({
      ...filterVar(),
      [props.type]: newValue?.id,
    });
    loadingVar({ ...loadingVar(), articleList: true });
  };

  console.log(query.get(props.type));

  return data ? (
    <Grid
      container
      item
      xs={12}
      justify={'space-between'}
      style={{ height: '4rem', width: '100%' }}
      alignItems={'center'}
    >
      <Autocomplete
        options={sortBy(data[`${props.type}s`], 'name')}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={capitalize(props.name || props.type)}
            margin={'normal'}
            fullWidth
          />
        )}
        fullWidth
        onChange={handleChange}
        value={value}
      />
    </Grid>
  ) : null;
};
