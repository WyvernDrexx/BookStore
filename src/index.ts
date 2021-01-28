import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { getUserData } from "./utils/author";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const context = async ({ req }) => {
  let token = req.headers.authorization?.split(" ")[1];
  const user = await getUserData(String(token));
  return { prisma, user };
};

const apolloServer = new ApolloServer({
  schema,
  context,
  formatError(err) {
    console.log(err);
    if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
      return {
        message: "Unable to process your request",
        code: "SERVER_ERROR",
      };
    }
    return { message: err.message, code: err.extensions.code };
  },
});

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  )
);
