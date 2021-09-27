import { rule, allow, deny, shield } from "graphql-shield";
import { sign, verify } from "jsonwebtoken";
import { Context } from "./context";

const secret = process.env.APP_SECRET || "hoge";

const isAdmin = rule()((_parent, _args, context: Context) => {
  const header = context.req.get("Authorization") as string;
  if (header) {
    const verified = verify(header.split(" ")[1], secret);
    console.log(verified);
    return verified !== null;
  }

  return true;
});

export const permissions = shield({
  Query: {
    "*": allow,
  },
  Mutation: {
    login: allow,
    "*": allow,
  },
});
