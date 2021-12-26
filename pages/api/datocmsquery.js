// import { GraphQLClient } from "graphql-request";

// import { fetchAPI } from "@/lib/fetchDatocmQuery";

import { request } from "@/lib/datocms";

// import dotenv from "dotenv";
// dotenv.config();

export default async function datocmsquery(re, res ) {
  const { query, variables, preview } = re.body;
  // console.log('request', { query, variables, preview });

  // if (!preview || !variables) {
  //   return
  // }

  // const endpoint = preview
  //   ? `https://graphql.datocms.com/preview`
  //   : `https://graphql.datocms.com/`;
    
  // const client = new GraphQLClient(endpoint, {
  //   headers: {
  //     // authorization: 'Bearer ed49a2531885ebb2f1...',
  //     authorization: `Bearer ${process.env.NEXT_ENV_DATOCMS_API_TOKEN}`,
  //   }
  // });

  // const result = await client.request(query, variables);
  const result = await request(query, { variables, preview });
  // console.log('>>>>>result', result);
  return res.send( result);
}