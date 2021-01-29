import { graphqlClient, gql, setAuthHeader } from "./graphqlClient";

beforeEach(setAuthHeader);

describe("review/s", () => {
  const BOOK_ID = "85712a74-ce05-479b-849e-85123666f91a";
  test("can be added for a book", async () => {
    const { createReview } = await graphqlClient.request(gql`
      mutation {
        createReview(
          data: {
            text: "This is a test review."
            bookId: "${BOOK_ID}"
          }
        ) {
          id
          text
          book {
            id
          }
          author {
            name
          }
        }
      }
    `);
    expect(createReview.text).toBe("This is a test review.");
    expect(createReview.book.id).toBe(BOOK_ID);
    expect(createReview.author.name).toBe("Test Man");
  });

  test("cannot be added for invalid bookId", async () => {
    try {
      const { createReview } = await graphqlClient.request(gql`
        mutation {
          createReview(
            data: { text: "This is a test review.", bookId: "INVALID_ID" }
          ) {
            id
            text
            book {
              id
            }
            author {
              name
            }
          }
        }
      `);
      expect(createReview).toBeFalsy();
    } catch (error) {
      expect(error.response.data).toBeNull();
      expect(error.response.errors).toBeDefined();
      expect(error.response.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: "BAD_USER_INPUT" }),
        ])
      );
    }
  });

  test("cannot be added by UNAUTHENTICATED users", async () => {
    graphqlClient.setHeader("Authorization", "");
    try {
      const { createReview } = await graphqlClient.request(gql`
        mutation {
          createReview(
            data: { text: "This is a test review.", bookId: "${BOOK_ID}" }
          ) {
            id
            text
            book {
              id
            }
            author {
              name
            }
          }
        }
      `);
      expect(createReview).toBeFalsy();
    } catch (error) {
      expect(error.response.data).toBeNull();
      expect(error.response.errors).toBeDefined();
      expect(error.response.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: "UNAUTHENTICATED" }),
        ])
      );
    }
  });
});
