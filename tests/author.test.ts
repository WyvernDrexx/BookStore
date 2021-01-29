import { graphqlClient, gql, setAuthHeader } from "./graphqlClient";

beforeEach(setAuthHeader);

describe("author", () => {
  const randomTestEmail = `_test_email${Math.trunc(
    Math.random() * 100000
  )}@email.com`;
  test("can be created with valid credentials", async () => {
    const { createAuthor } = await graphqlClient.request(gql`
      mutation {
        createAuthor(
          data: {
            name: "Test User"
            password: "123456"
            email: "${randomTestEmail}"
          }
        ) {
          name
          id
        }
      }
    `);
    expect(createAuthor).toBeDefined();
    expect(createAuthor.name).toBe("Test User");
  });

  test("cannot be created when trying with same email", async () => {
    try {
      const { createAuthor } = await graphqlClient.request(gql`
      mutation {
        createAuthor(
          data: {
            name: "Test User"
            password: "123456"
            email: "${randomTestEmail}"
          }
        ) {
          name
          id
        }
      }
    `);
      expect(createAuthor).toBeFalsy();
    } catch (error) {
      expect(error.response.data).toBeNull();
      expect(error.response.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: "BAD_USER_INPUT",
            message: "Email is already taken.",
          }),
        ])
      );
    }
  });
});
