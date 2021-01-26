import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    books: () => {
      return [{ name: "Test", author: "LP Sharma" }];
    },
  },
};

export default resolvers;
