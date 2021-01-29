import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";
dotenv.config();

const endpoint = "http://localhost:4000/graphql";
const graphqlClient = new GraphQLClient(endpoint);

//email:test@gmail.com PW:123456
const bearerToken = `Bearer ${process.env.TEST_JWT_TOKEN}`;

export { graphqlClient, gql, bearerToken };
