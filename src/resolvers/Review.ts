import { ReviewResolvers } from "../generated/graphql";

const Review: ReviewResolvers = {
  async author(parent, _args, { prisma }, _info) {
    const author = await prisma.author.findFirst({
      where: {
        reviews: {
          some: {
            id: parent.id,
          },
        },
      },
    });
    return author;
  },
};

export default Review;
