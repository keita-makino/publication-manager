import React, { useContext, useEffect } from "react";
import { usePermissions } from "react-admin";
import { TokenContext } from "../App";
import { createClient, gql } from "@urql/core";
import { Card, CardContent } from "@material-ui/core";

export type IndexProps = {};

const login = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`;
export const Index: React.FC<IndexProps> = (props: IndexProps) => {
  const { loaded, permissions } = usePermissions();
  const setToken = useContext(TokenContext);
  const client = createClient({
    url: "http://localhost:4000/graphql",
  });

  useEffect(() => {
    if (loaded && permissions && setToken) {
      console.log(permissions);
      client
        .mutation(login, { email: permissions.email })
        .toPromise()
        .then((result) => {
          setToken({
            type: "set",
            token: result.data.login.token,
          });
        });
    }
  }, [client, loaded, permissions, setToken]);

  return (
    <Card>
      <CardContent>
        This is the start page. Select a list from the sidebar to proceed.
      </CardContent>
    </Card>
  );
};
