import { ArticleExternal } from "./Article";

export const createAbstract = (invertedAbstract: ArticleExternal["IA"]) => {
  const strArray = new Array<string>(invertedAbstract.IndexLength - 1);
  Object.entries(invertedAbstract.InvertedIndex).map((item) => {
    item[1].map((position) => {
      strArray[position] = item[0];
    });
  });
  return strArray
    .slice(strArray[0] === "Abstract" ? 1 : 0)
    .join(" ")
    .replace(/\s+/, " ");
};
