import { graphqlClient, gql, setAuthHeader } from "./graphqlClient";

beforeEach(setAuthHeader);

describe("book/s", () => {
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
            description:"This book was created during testing."
          }
        ) {
          name
          price
        }
      }
    `);
    expect(createBook.name).toBe(randomBookName);
    expect(createBook.price).toBe(490.9);
  });

  test("cannot be created when not logged in/token is invalid", async () => {
    graphqlClient.setHeader("Authorization", "");
    try {
      const data = await graphqlClient.request(gql`
      mutation {
        createBook(
          data: {
            name: "${randomBookName}"
            price: 490.90
            totalPages: 44,
            description: "This book was created during testing."
          }
        ) {
          id
          name
          price
          totalPages
        }
      }
    `);
      expect(data.createBook).toBeFalsy();
    } catch (error) {
      expect(error.response.data).toBeNull();
      expect(error.response.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: "UNAUTHENTICATED" }),
        ])
      );
    }
  });
});
