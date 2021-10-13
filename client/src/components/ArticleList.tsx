import { useQuery, useReactiveVar } from '@apollo/client';
import { Card, Grid, CircularProgress } from '@mui/material';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { currentPageVar, filterVar, loadingVar, sortVar } from '../localState';
import { ArticleListItem } from './ArticleListItem';
import { PageSelect } from './PageSelect';
import { Sort } from './Sort';

export type ArticleListProps = {};

const GET_ARTICLE_LIST = gql`
  query GET_ARTICLE_LIST(
    $author: String
    $tag: String
    $project: String
    $journal: String
    $take: Int
    $skip: Int
    $yearStart: Int
    $yearEnd: Int
    $by: String
    $direction: String
  ) {
    multipleArticles(
      author: $author
      tag: $tag
      project: $project
      journal: $journal
      yearStart: $yearStart
      yearEnd: $yearEnd
      take: $take
      skip: $skip
      by: $by
      direction: $direction
    ) {
      id
      name
      authors {
        name
      }
      tags {
        name
      }
      journal {
        name
      }
      abstract
      sources {
        id
        type
      }
      date
    }
  }
`;

export const ArticleList: React.FC<ArticleListProps> = (
  props: ArticleListProps
) => {
  const filter = useReactiveVar(filterVar);
  const sort = useReactiveVar(sortVar);
  const currentPage = useReactiveVar(currentPageVar);
  const pagination = {
    take: 21,
    skip: 20 * (currentPage - 1),
  };
  const { data, loading } = useQuery(GET_ARTICLE_LIST, {
    variables: { ...filter, ...sort, ...pagination },
  });
  const isLoading = useReactiveVar(loadingVar);

  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (data?.multipleArticles?.length) {
      setLength(data.multipleArticles.length);
    }
  }, [data]);

  return (
    <Grid container spacing={2} direction={'column'}>
      <Grid
        item
        container
        xs={12}
        justifyContent={'flex-end'}
        alignContent={'center'}
        alignItems={'center'}
        spacing={2}
      >
        <Grid item>
          <Sort />
        </Grid>
        <Grid item>
          <PageSelect max={length} />
        </Grid>
      </Grid>
      {data?.multipleArticles ? (
        length === 0 ? (
          'no articles'
        ) : (
          data.multipleArticles
            .slice(0, 20)
            .map((item: any) => <ArticleListItem {...item} />)
        )
      ) : (
        <Card
          variant={'outlined'}
          style={{
            height: '4rem',
            margin: '0.5rem 0',
            padding: '0.5rem',
          }}
        >
          <Grid
            container
            item
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <CircularProgress />
          </Grid>
        </Card>
      )}
    </Grid>
  );
};
