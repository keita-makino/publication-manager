import axios from "axios";

export const getAuthorDetails = (item: { AuId: any; DAuN: any }) => ({
  id: item.AuId.toString(),
  name: item.DAuN,
});
export const getTagDetails = (item: { FId: any; DFN: any }) => ({
  id: item.FId.toString(),
  name: item.DFN,
});
export const getJournalDetails = async (item: { JId: any; JN: any }) => {
  const journal = (
    await axios.get(
      "https://api.labs.cognitive.microsoft.com/academic/v1.0/evaluate",
      {
        params: {
          expr: `Id=${item.JId}`,
          attributes: "DJN,JN",
          "subscription-key": process.env.API_KEY,
        },
      }
    )
  ).data.entities;
  return {
    id: item.JId.toString(),
    name: journal[0].DJN || journal[0].JN,
  };
};
export const getSourceDetails = (item: { Ty: any; U: any }) => ({
  id: item.U,
  type: item.Ty.toString(),
});
