import { nexusPrisma } from "nexus-plugin-prisma";
import {
  makeSchema,
  objectType,
  queryField,
  mutationField,
  list,
  arg,
  stringArg,
  nonNull,
  intArg,
  booleanArg,
} from "nexus";
import path from "path";
import { addCrudResolvers } from "@ra-data-prisma/backend";
import { applyMiddleware } from "graphql-middleware";
import { sign } from "jsonwebtoken";

const APP_SECRET = process.env.APP_SECRET;

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  },
});

const Author = objectType({
  name: "Author",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.articles();
    t.model.groups();
  },
});

const Article = objectType({
  name: "Article",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.authors();
    t.model.abstract();
    t.model.date();
    t.model.citation();
    t.model.journal();
    t.model.tags();
    t.model.status();
    t.model.journalId();
    t.model.sources();
  },
});
const Journal = objectType({
  name: "Journal",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.articles();
  },
});

const Group = objectType({
  name: "Group",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.authors();
  },
});

const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.articles();
  },
});

const Project = objectType({
  name: "Project",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.articles();
  },
});

const Source = objectType({
  name: "Source",
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.articles();
  },
});

const Mutation = mutationField((t) => {
  t.field("login", {
    type: "Auth",
    args: {
      email: nonNull(stringArg()),
    },
    resolve: async (_parent, args, context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error("Not authenticated.");
      }
      return {
        token: sign({ id: user.id }, APP_SECRET || "hogehoge"),
      };
    },
  });
});

const Auth = objectType({
  name: "Auth",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

const GetMultipleArticles = queryField("multipleArticles", {
  type: list(Article),
  args: {
    author: stringArg(),
    tag: stringArg(),
    project: stringArg(),
    journal: stringArg(),
    yearStart: intArg(),
    yearEnd: intArg(),
    take: intArg(),
    skip: intArg(),
    by: stringArg(),
    direction: stringArg(),
  },
  async resolve(_, args, ctx) {
    return ctx.prisma.article.findMany({
      take: args.take || undefined,
      skip: args.skip || undefined,
      where: {
        AND: [
          args.author
            ? {
                authors: {
                  some: {
                    id: {
                      equals: args.author,
                    },
                  },
                },
              }
            : {},
          args.tag
            ? {
                tags: {
                  some: {
                    id: {
                      equals: args.tag,
                    },
                  },
                },
              }
            : {},
          args.project
            ? {
                tags: {
                  some: {
                    id: {
                      equals: args.project,
                    },
                  },
                },
              }
            : {},
          args.journal
            ? {
                journal: {
                  id: {
                    equals: args.journal,
                  },
                },
              }
            : {},
          args.yearStart
            ? {
                date: {
                  gte: new Date(args.yearStart, 0),
                },
              }
            : {},
          args.yearEnd
            ? {
                date: {
                  lte: new Date(args.yearEnd, 12, 31),
                },
              }
            : {},
          {
            status: {
              not: "hidden",
            },
          },
        ],
      },
      orderBy: [{ [args.by!]: args.direction }],
    });
  },
});

export const schema = applyMiddleware(
  makeSchema({
    types: [
      Author,
      Article,
      Group,
      Journal,
      Tag,
      Source,
      Project,
      GetMultipleArticles,
      Auth,
      User,
      Mutation,
      addCrudResolvers("Author"),
      addCrudResolvers("Article"),
      addCrudResolvers("Group"),
      addCrudResolvers("Journal"),
      addCrudResolvers("Tag"),
      addCrudResolvers("Project"),
      addCrudResolvers("Source"),
    ],
    plugins: [
      nexusPrisma({
        experimentalCRUD: true,
        paginationStrategy: "prisma",
      }),
    ],
    outputs: {
      schema: __dirname + "/../schema.graphql",
      typegen: __dirname + "/generated/nexus.d.ts",
    },
    contextType: {
      module: path.join(__dirname, "./context.ts"),
      export: "Context",
    },
  })
);
