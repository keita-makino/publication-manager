import {
  Card,
  Box,
  CardContent,
  Grid,
  Typography,
  Divider,
  Link,
  CardActions,
  IconButton,
  Collapse,
  Fade,
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { startCase } from 'lodash';
import React, { useState } from 'react';

export type ArticleListItemProps = {
  id: string;
  name: string;
  authors: {
    name: string;
  }[];
  tags: {
    name: string;
  }[];
  journal?: {
    name: string;
  };
  abstract: string;
  sources: {
    id: string;
    type: string;
  }[];
  date: Date;
};

export const ArticleListItem: React.FC<ArticleListItemProps> = (
  props: ArticleListItemProps
) => {
  const [selected, setSelected] = useState(false);
  return (
    <Grid item xs={12}>
      <Card variant={'outlined'}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <CardContent>
            <Grid item xs={12}>
              <Typography variant={'h6'}>{props.name}</Typography>
            </Grid>
            <Divider style={{ margin: '0.25rem 0' }} />
            <Grid item xs={12}>
              <Typography variant={'body2'}>
                {'Author(s): '}
                {props.authors.map((author: any) => author.name).join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'body2'}>
                {'Date Published: '}
                {new Date(props.date).toISOString().split('T')[0]}
              </Typography>
            </Grid>
            {props.journal ? (
              <Grid item xs={12}>
                <Typography variant={'subtitle2'}>
                  {'Journal: '}
                  {startCase(props.journal.name)}
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Typography variant={'body2'} color={'textSecondary'}>
                {'Tag(s): '}
                {props.tags.map((tag: any) => tag.name).join(', ')}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => {
                setSelected(!selected);
              }}
            >
              {selected ? (
                <KeyboardArrowUp fontSize={'large'} />
              ) : (
                <KeyboardArrowDown fontSize={'large'} />
              )}
            </IconButton>
          </CardActions>
        </Box>
        <Collapse in={selected}>
          <Fade in={selected}>
            <CardContent style={{ backgroundColor: '#fafafa' }}>
              <Grid item xs={12}>
                <Typography variant={'body2'} color={'textSecondary'}>
                  {'Details: '}
                  {props.sources.map(
                    (item: { id: string }, index: number, array) => (
                      <>
                        <Link target={'blank'} href={item.id}>
                          {item.id}
                        </Link>
                        {index === array.length - 1 ? null : ', '}
                      </>
                    )
                  ) || 'test: link should appear here'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'body2'}
                  color={'textSecondary'}
                  alignContent={'justifyContent'}
                >
                  {'Abstract: '}
                  {props.abstract}
                </Typography>
              </Grid>
            </CardContent>
          </Fade>
        </Collapse>
      </Card>
    </Grid>
  );
};
