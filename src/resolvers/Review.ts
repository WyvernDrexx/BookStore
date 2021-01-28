import { ReviewResolvers } from "../generated/graphql";

const Review: ReviewResolvers = {
  async author(parent, _, { prisma }, __) {
    const author = await prisma.author.findFirst({
      where: {
        id: parent.authorId,
      },
    });
    return author;
  },
  async book(parent, _, { prisma }, __) {
    const book = await prisma.book.findFirst({
      where: {
        id: parent.bookId,
      },
    });
    return book;
  },
};

export default Review;
