import { AuthorResolvers } from "../generated/graphql";

const Author: AuthorResolvers = {
  async books(parent, _, { prisma }, __) {
    const books = await prisma.book.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return books;
  },
  async reviews(parent, _, { prisma }, __) {
    const reviews = await prisma.review.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return reviews;
  },
};

export default Author;
