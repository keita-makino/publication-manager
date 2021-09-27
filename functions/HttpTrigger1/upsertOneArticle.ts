import { gql } from "@urql/core";

export const upsertOneArticle = gql`
  mutation UPSERT_ONE_ARTICLE(
    $where: ArticleWhereUniqueInput!
    $create: ArticleCreateInput!
  ) {
    upsertOneArticle(where: $where, create: $create, update: {}) {
      id
    }
  }
`;
