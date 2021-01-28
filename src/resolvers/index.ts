import { Resolvers } from "../generated/graphql";
import Query from "./Query";
import Mutation from "./Mutation";
import Author from "./Author";
import Review from "./Review";

const resolvers: Resolvers = {
  Query,
  Mutation,
  Author,
  Review
};

export default resolvers;
