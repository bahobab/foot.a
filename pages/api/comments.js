// /api/comments api
const {SiteClient} = require('datocms-client')

export default async function comments(req, res) {
  // console.log('/api/comments', req.body)
  
  const API_TOKEN = process.env.NEXT_DATOCMS_API_TOKEN
  
  const datoClient = new SiteClient( API_TOKEN )

  // const post = await datoClient.items.find({itemType:""(slug: req.body.slug))

  const comment = await datoClient.items.create({itemType: "1430555", ...req.body})
  // console.log('&&&& page/api/comments comment', comment)
    
  return res.status(200).json(comment)  
}
