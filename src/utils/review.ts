import { UserInputError } from "apollo-server-express";
import { ReviewCreateInput } from "../generated/graphql";

function validateReviewCreateInput(data: ReviewCreateInput) {
  const { text, bookId, rating } = data;

  if (bookId.trim().length < 10) throw new UserInputError("Invalid book ID.");
  if (text.trim().length < 5)
    throw new UserInputError("Review must have at least 5 characters.");
  if (rating < 1 || rating > 5)
    throw new UserInputError("Ratings must be between 1 and 5.");
}

export { validateReviewCreateInput };
