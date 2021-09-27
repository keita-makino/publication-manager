import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { createContext } from "./context";
import cors from "cors";

const context = createContext;

async function main() {
  const server = new ApolloServer({ schema, context });
  await server.start();
  const app = express();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://studio.apollographql.com"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`server is ready`);
  });
}

main();
