import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  books: (_parent, _args, { prisma }, _info) => {
    return null;
  },
};

export default Query;
