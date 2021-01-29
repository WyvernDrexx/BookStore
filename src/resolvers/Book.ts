import { BookResolvers } from "../generated/graphql";

const Book: BookResolvers = {
  async author(parent, _, { prisma }, __) {
    return await prisma.author.findFirst({
      where: {
        id: parent.authorId,
      },
    });
  },
  async reviews(parent, _, { prisma }, __) {
    return await prisma.review.findMany({
      where: {
        bookId: parent.id,
      },
    });
  },
};

export default Book;
