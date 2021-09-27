import { uniqBy, differenceBy } from "lodash";
import { ArticleExternal, ArticleMutation } from "./Article";
import {
  getAuthorDetails,
  getTagDetails,
  getJournalDetails,
  getSourceDetails,
} from "./getDetails";
import { createAbstract } from "./createAbstract";
import { createClient, defaultExchanges } from "@urql/core";
import { getExistingArticleIds } from "./query";
import { createArticle } from "./mutation";

export const seedArticle = async (articles: ArticleExternal[]) => {
  const client = createClient({
    url: "http://localhost:4000/graphql",
    exchanges: defaultExchanges,
  });

  const { data } = await client.query(getExistingArticleIds).toPromise();

  const filtered = differenceBy(
    articles.map((item) => ({ ...item, id: item.Id })),
    data?.articles,
    "id"
  );

  const articleList = filtered.map(
    async (item): Promise<ArticleMutation> => {
      return {
        id: item.Id.toString(),
        name: item.DN,
        citation: item.CC,
        date: new Date(item.D).toISOString(),
        abstract: item.IA ? createAbstract(item.IA) : undefined,
        authors: {
          connectOrCreate: uniqBy(item.AA, "AuId").map((item) => ({
            where: { id: getAuthorDetails(item).id },
            create: getAuthorDetails(item),
          })),
        },
        tags: item.F
          ? {
              connectOrCreate: uniqBy(item.F, "FId").map((item) => ({
                where: { id: getTagDetails(item).id },
                create: getTagDetails(item),
              })),
            }
          : undefined,
        journal: item.J
          ? {
              connectOrCreate: {
                where: { id: (await getJournalDetails(item.J)).id },
                create: await getJournalDetails(item.J),
              },
            }
          : undefined,
        sources: item.S
          ? {
              connectOrCreate: uniqBy(item.S, "U")
                .filter((item) => item.Ty !== undefined)
                .map((item) => ({
                  where: { id: getSourceDetails(item).id },
                  create: getSourceDetails(item),
                })),
            }
          : undefined,
        status: "raw",
      };
    }
  );
  const list = await Promise.all(articleList);

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    await client
      .mutation(createArticle, {
        data: element,
      })
      .toPromise()
      .then((result) =>
        console.log(result.error, `${i} / ${articleList.length}`)
      );
  }

  return;
};
