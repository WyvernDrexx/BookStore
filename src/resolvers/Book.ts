import { BookResolvers } from "../generated/graphql";

const Book: BookResolvers = {
  async author(parent, _, { prisma }, __) {
    const author = await prisma.author.findFirst({
      where: {
        id: parent.authorId,
      },
    });
    return author;
  },
  async reviews(parent, _, { prisma }, __) {
    const reviews = await prisma.review.findMany({
      where: {
        bookId: parent.id,
      },
    });
    return reviews;
  },
};

export default Book;
