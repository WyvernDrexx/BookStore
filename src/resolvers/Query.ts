import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  async books(_, __, { prisma }, ___) {
    return await prisma.book.findMany();
  },
};

export default Query;
