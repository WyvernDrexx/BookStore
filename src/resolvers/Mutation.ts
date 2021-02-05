import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-express";
import { MutationResolvers } from "../generated/graphql";
import {
  comparePassword,
  generatePasswordHash,
  generateJWT,
} from "../utils/author";

const Mutation: MutationResolvers = {
  async createAuthor(_, { data }, { prisma }, __) {
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
  async login(_, { data }, { prisma }, __) {
    const { email, password } = data;
    const author = await prisma.author.findFirst({ where: { email } });
    if (!author) throw new AuthenticationError("Invalid username/password");
    const passwordMatch = await comparePassword(password, author.password);
    if (passwordMatch) {
      return await generateJWT({ email, name: author.name, id: author.id });
    }
    throw new AuthenticationError("Invalid username/password");
  },
  async createBook(_, { data }, { prisma, user }, __) {
    const { name, price, totalPages, description } = data;
    if (!user.isAuthenticated)
      throw new AuthenticationError("Please login to continue.");
    return await prisma.book.create({
      data: {
        name,
        price,
        description,
        totalPages,
        author: {
          connect: {
            email: user.email,
          },
        },
      },
      include: {
        author: true,
        reviews: true,
      },
    });
  },
  async createReview(_, { data }, { prisma, user }, __) {
    const { text, bookId } = data;
    if (!user.isAuthenticated)
      throw new AuthenticationError("Please login to continue.");
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
      include: {
        reviews: true,
      },
    });
    if (!book) throw new UserInputError("Sorry, book doesn't exist.");
    const reviewExists = book.reviews.find(
      (review) => review.authorId === user.id
    );

    if (reviewExists)
      throw new ForbiddenError("You have already reviewed the book.");

    return await prisma.review.create({
      data: {
        text,
        author: {
          connect: {
            email: user.email,
          },
        },
        book: {
          connect: {
            id: bookId,
          },
        },
      },
    });
  },

  async updateBook(_, { data }, { prisma, user }, __) {
    const { bookId, name, price, totalPages } = data;
    if (!user.isAuthenticated)
      throw new AuthenticationError("Please login to continue.");
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
    if (!book) throw new UserInputError("Sorry, the book doesn't exist.");
    if (book.authorId !== user.id)
      throw new AuthenticationError(
        "Sorry, you can't perform the following action."
      );
    return await prisma.book.update({
      data: {
        name,
        price,
        totalPages,
      },
      where: {
        id: bookId,
      },
    });
  },
};

export default Mutation;
