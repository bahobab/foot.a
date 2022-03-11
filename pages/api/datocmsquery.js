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
}
