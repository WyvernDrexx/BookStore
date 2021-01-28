import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  async books(_parent, _args, { prisma }, _info) {
    return await prisma.book.findMany({
      include: {
        author: true,
        reviews: true,
      },
    });
  },
};

export default Query;
