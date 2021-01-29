import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthenticationError, UserInputError } from "apollo-server-express";
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
    const { name, price, totalPages } = data;
    if (!user.isAuthenticated)
      throw new AuthenticationError("Please login to continue.");
    const book = await prisma.book.create({
      data: {
        name,
        price,
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
    return book;
  },
  async createReview(_, { data }, { prisma, user }, __) {
    const { text, bookId } = data;
    if (!user.isAuthenticated)
      throw new AuthenticationError("Please login to continue.");
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
    if (!book) throw new UserInputError("Sorry, book doesn't exist.");
    const review = await prisma.review.create({
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
      include: {
        author: true,
        book: true,
      },
    });
    return review;
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
    const updatedBook = await prisma.book.update({
      data: {
        name,
        price,
        totalPages,
      },
      where: {
        id: bookId,
      },
    });
    return updatedBook;
  },
};

export default Mutation;
