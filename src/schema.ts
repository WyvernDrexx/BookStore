import fs from "fs";
import resolvers from "./resolvers";
import { makeExecutableSchema } from "apollo-server-express";

const typeDefs = fs.readFileSync("src/schema.graphql", "utf-8");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
