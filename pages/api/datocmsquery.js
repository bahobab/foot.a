// import { GraphQLClient } from "graphql-request";

import { fetchAPI } from "@/lib/fetchDatocmQuery";

import { request } from "@/lib/datocms";

// import dotenv from "dotenv";
// dotenv.config();

export default async function datocmsquery(req, res ) {
  console.log('>>IN DATOCMS QUErY', req.url);
  const { query, variables, preview } = req.body;

  const respJSON = await fetchAPI(query, {variables, preview});
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    return res.status(200).json({});
  }
  return res.status(200).json(respJSON)

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

  // ############################# local #########################
  // const result = await request(query, { variables, preview });
  // return res.send( result);
}
