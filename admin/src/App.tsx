import { createContext, useReducer, useState } from "react";
import "./App.css";
import { Admin, Loading, Resource } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import buildGraphQLProvider from "@ra-data-prisma/dataprovider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ArticleEdit, ArticleList } from "./components/Article";
import { TagEdit, TagList, TagCreate } from "./components/Tag";
import { Login } from "./Login";
import { Index } from "./components/Index";
import { useDataProvider } from "./utils/useDataProvider";

export const TokenContext = createContext<React.Dispatch<any> | null>(null);

const tokenReducer = (_: any, action: any) => {
  switch (action.type) {
    case "set":
      return action.token;
  }
};

function App() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DATABASE_URL_DEV
        : process.env.REACT_APP_DATABASE_URL,
    cache,
  });

  const dataProvider = useDataProvider(client);

  const authProvider = FirebaseAuthProvider(
    {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
      measurementId: process.env.REACT_APP_MEASUREMENTID,
    },
    {}
  );

  const [token, dispatch] = useReducer(tokenReducer, null);

  return dataProvider ? (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={dispatch}>
        <Admin
          loginPage={Login}
          dataProvider={dataProvider}
          authProvider={authProvider}
          ready={Index}
          dashboard={Index}
        >
          {token
            ? [
                <Resource
                  name={"Article"}
                  list={ArticleList}
                  edit={ArticleEdit}
                />,
                <Resource name={"Author"} />,
                <Resource
                  name={"Tag"}
                  list={TagList}
                  edit={TagEdit}
                  create={TagCreate}
                />,
                <Resource name={"Journal"} />,
              ]
            : null}
        </Admin>
      </TokenContext.Provider>
    </ApolloProvider>
  ) : (
    <Loading />
  );
}

export default App;
