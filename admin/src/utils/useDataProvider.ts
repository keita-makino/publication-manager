import buildGraphQLProvider from "@ra-data-prisma/dataprovider";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

export const useDataProvider = (
  client: ApolloClient<NormalizedCacheObject>
) => {
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    buildGraphQLProvider({ client }).then((result: any) => {
      setDataProvider({ result });
      console.log(result.toString());
    });
  }, []);

  return dataProvider;
};
