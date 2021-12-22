import { GraphQLClient } from "graphql-request";

const API_TOKEN = 'e1718c33bfd58a09a0c4241740af67'

export async function request(query, {variables, preview} ) {

  console.log('request', { query, variables, preview });

  // if (!preview || !variables) {
  //   return
  // }

  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
    
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`
    }
  });
  return client.request(query, variables);
}