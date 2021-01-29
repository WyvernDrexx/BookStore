import { graphqlClient, gql, setAuthHeader } from "./graphqlClient";

async function createRandomBook(): Promise<string> {
  setAuthHeader();
  const randomBookName = `_testbook_${Math.trunc(Math.random() * 100000)}`;
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
        }
      }
  `);

  return createBook.id;
}

export { createRandomBook };
