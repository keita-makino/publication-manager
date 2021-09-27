import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import {
  currentPageVar,
  filterVar,
  isResettingVar,
  loadingVar,
} from '../localState';
import { Index } from './Index';

export type AppProps = {};

export const App: React.FC<AppProps> = (props: AppProps) => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          filter: {
            read() {
              return filterVar();
            },
          },
          loading: {
            read() {
              return loadingVar();
            },
          },
          isResetting: {
            read() {
              return isResettingVar();
            },
          },
        },
      },
    },
  });
  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? process.env.DATABASE_URL_DEV
        : process.env.DATABASE_URL,
    cache,
  });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Container maxWidth={'lg'}>
          <Index />
        </Container>
      </ApolloProvider>
    </BrowserRouter>
  );
};
