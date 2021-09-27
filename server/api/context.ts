import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  req: any;
};

export const createContext = (req: any): Context => ({
  ...req,
  prisma,
});
