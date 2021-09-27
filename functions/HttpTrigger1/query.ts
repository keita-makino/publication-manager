import { gql } from "@urql/core";

export const getExistingArticleIds = gql`
  query {
    articles {
      id
    }
  }
`;
