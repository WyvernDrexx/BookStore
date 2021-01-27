import { Resolvers } from "../generated/graphql";
import Query from "./Query";
import Mutation from "./Mutation";

const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
