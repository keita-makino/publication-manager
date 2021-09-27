import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";
import { ArticleExternal } from "./Article";
import "isomorphic-unfetch";
import { seedArticle } from "./seedArticle";
import { authorList } from "./authorList";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const lastTime: number = req.query["time_unset"]
    ? undefined
    : context.bindings.dateIn;
  const articles = (
    await Promise.all(
      authorList.map(
        async (author): Promise<ArticleExternal[]> =>
          (
            await axios.get(
              "https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate",
              {
                params: {
                  expr: `And(Composite(AA.AuId=${author}), D>='${
                    lastTime
                      ? new Date(lastTime - 86400).toISOString().split("T")[0]
                      : "1970-01-01"
                  }')`,
                  count: 50,
                  attributes:
                    "D,CC,AA.DAuN,AA.AuId,DN,Id,S,F.DFN,F.FId,FP,J.JId,J.JN,IA,FamId",
                  "subscription-key": process.env.API_KEY,
                },
              }
            )
          ).data.entities.filter(
            (item) => item.IA && (item.FamId === item.Id || !item.FamId)
          )
      )
    )
  ).flat();

  const seeded = await seedArticle(articles);
};

export default httpTrigger;
