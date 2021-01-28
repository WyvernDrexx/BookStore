import { Resolvers } from "../generated/graphql";
import Query from "./Query";
import Mutation from "./Mutation";
import Author from "./Author";

const resolvers: Resolvers = {
  Query,
  Mutation,
  Author,
};

export default resolvers;
