import { PrismaClient } from "@prisma/client";
import { AuthPayload } from "../../utils/author";

export type MyContextType = {
  prisma: PrismaClient;
  authPayload: AuthPayload;
};
