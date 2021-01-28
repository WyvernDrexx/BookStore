import { BookResolvers } from "../generated/graphql";

const Book: BookResolvers = {
  async author(parent, _args, { prisma }, _info) {
    const author = await prisma.author.findFirst({
      where: {
        id: parent.authorId,
      },
    });
    return author;
  },
  async reviews(parent, _args, { prisma }, _info) {
    const reviews = await prisma.review.findMany({
      where: {
        bookId: parent.id,
      },
    });
    return reviews;
  },
};

export default Book;
