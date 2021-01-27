import { PrismaClient } from "@prisma/client";

export type MyContextType = {
  prisma: PrismaClient;
};
