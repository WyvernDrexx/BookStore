import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const context = async ({ req }) => {
  // let token = req.headers.authorization?.split(" ")[1];
  return { prisma };
};

const apolloServer = new ApolloServer({
  schema,
  context,
});

apolloServer.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  )
);
