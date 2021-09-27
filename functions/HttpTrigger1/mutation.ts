import { gql } from "@urql/core";

export const createArticle = gql`
  mutation($data: ArticleCreateInput!) {
    createOneArticle(data: $data) {
      id
    }
  }
`;
