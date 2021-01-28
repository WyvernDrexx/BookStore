import { Resolvers } from "../generated/graphql";
import Query from "./Query";
import Mutation from "./Mutation";
import Author from "./Author";
import Review from "./Review";
import Book from "./Book";

const resolvers: Resolvers = {
  Query,
  Mutation,
  Author,
  Review,
  Book,
};

export default resolvers;
