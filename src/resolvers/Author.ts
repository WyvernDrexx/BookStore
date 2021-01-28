import { AuthorResolvers } from "../generated/graphql";

const Author: AuthorResolvers = {
  async books(parent, _args, { prisma }, _info) {
    const books = await prisma.book.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return books;
  },
  async reviews(parent, _args, { prisma }, _info) {
    const reviews = await prisma.review.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return reviews;
  },
};

export default Author;
