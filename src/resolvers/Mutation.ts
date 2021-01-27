import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserInputError } from "apollo-server-express";
import { MutationResolvers } from "../generated/graphql";
import { generatePasswordHash } from "../utils/author";

const Mutation: MutationResolvers = {
  async createAuthor(_parent, { data }, { prisma }, _info) {
    const { name, email, password } = data;
    try {
      const hashedPassword = await generatePasswordHash(password);
      const author = await prisma.author.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return author;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new UserInputError("Email is already taken.");
        }
      }
      throw err;
    }
  },
};

export default Mutation;
