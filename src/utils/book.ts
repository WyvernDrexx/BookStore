import { UserInputError } from "apollo-server-express";
import { BookCreateInput } from "../generated/graphql";

function validateBookCreateInput(data: BookCreateInput) {
  const { description, name, totalPages, price } = data;

  if (description.trim().length < 10)
    throw new UserInputError(
      "Description of the book cannot be less than 10 characters."
    );

  if (name.trim().length < 1 || name.trim().length > 90)
    throw new UserInputError(
      "Name of the book must be greater than 1 character and less than 90 characters."
    );

  if (totalPages < 1)
    throw new UserInputError(
      "Total number of pages on the book cannot be zero."
    );
  if (price < 1)
    throw new UserInputError("Price of the book cannot be less than 0.");
}
export { validateBookCreateInput };
