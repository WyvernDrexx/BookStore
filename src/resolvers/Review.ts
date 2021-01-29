import { ReviewResolvers } from "../generated/graphql";

const Review: ReviewResolvers = {
  async author(parent, _, { prisma }, __) {
    return await prisma.author.findFirst({
      where: {
        id: parent.authorId,
      },
    });
  },
  async book(parent, _, { prisma }, __) {
    return await prisma.book.findFirst({
      where: {
        id: parent.bookId,
      },
    });
  },
};

export default Review;
