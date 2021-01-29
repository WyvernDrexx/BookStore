import { graphqlClient, gql, bearerToken } from "./graphqlClient";

beforeEach(() => {
  graphqlClient.setHeader("Authorization", bearerToken);
});

describe("books", () => {
  const randomBookName = `_test_book${Math.trunc(Math.random() * 100000)}`;
  test("should not be null when queried", async () => {
    const { books } = await graphqlClient.request(gql`
      query {
        books {
          id
          name
        }
      }
    `);
    expect(books).not.toBeNull();
  });

  test("are created on passing expected data", async () => {
    const { createBook } = await graphqlClient.request(gql`
      mutation {
        createBook(
          data: {
            name: "${randomBookName}"
            price: 490.90
            totalPages: 44
          }
        ) {
          id
          name
          price
          totalPages
        }
      }
    `);
    expect(createBook.name).toBe(randomBookName);
    expect(createBook.price).toBe(490.9);
  });
});
