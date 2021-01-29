import { AuthorResolvers } from "../generated/graphql";

const Author: AuthorResolvers = {
  async books(parent, _, { prisma }, __) {
    return await prisma.book.findMany({
      where: {
        authorId: parent.id,
      },
    });
  },
  async reviews(parent, _, { prisma }, __) {
    return await prisma.review.findMany({
      where: {
        authorId: parent.id,
      },
    });
  },
};

export default Author;
