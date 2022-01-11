// /api/comments api
const {SiteClient} = require('datocms-client')

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

export default async function comments(req, res) {
  // console.log('/api/comments', req.body)
  // Run the middleware
  await runMiddleware(req, res, cors)
  
  const API_TOKEN = process.env.NEXT_ENV_DATOCMS_API_TOKEN
  
  const datoClient = new SiteClient( API_TOKEN )

  // const post = await datoClient.items.find({itemType:""(slug: req.body.slug))

  const comment = await datoClient.items.create({itemType: "1430555", ...req.body})
  // console.log('&&&& page/api/comments comment', comment)
    
  return res.status(200).json(comment)  
}
