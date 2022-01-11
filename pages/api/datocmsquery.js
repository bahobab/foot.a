// import { GraphQLClient } from "graphql-request";
import { request } from "@/lib/datocms";

import Cors from 'cors'
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

import { fetchAPI } from "@/lib/fetchDatocmQuery";

// import dotenv from "dotenv";
// dotenv.config();

export default async function datocmsquery(req, res ) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  const { query, variables, preview } = req.body;

  const respJSON = await fetchAPI(query, {variables, preview});

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    return res.status(200).end({});
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
