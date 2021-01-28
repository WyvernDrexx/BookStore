import { ReviewResolvers } from "../generated/graphql";

const Review: ReviewResolvers = {
  async author(parent, _args, { prisma }, _info) {
    const { author } = await prisma.review.findFirst({
      where: {
        id: parent.id,
      },
      include: {
        author: true,
      },
    });
    return author;
  },
};

export default Review;
