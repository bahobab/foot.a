import { GraphQLClient } from "graphql-request";

export async function request(query, {variables, preview} = {} ) {

  // console.log('request', { query, variables, preview });

  // if (!preview || !variables) {
  //   return
  // }

  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
    
    // console.log('process.env api token', process.env.NEXT_ENV_DATOCMS_API_TOKEN );
  const client = new GraphQLClient(endpoint, {
    headers: {
      // authorization: 'Bearer ed49a2531885ebb2f1...',
      authorization: `Bearer ${process.env.NEXT_ENV_DATOCMS_API_TOKEN}`,
    }
  });
  return client.request(query, variables);
}