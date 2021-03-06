const API_URL = 'https://graphql.datocms.com'

export async function fetchAPI(query, { variables, preview } = {}) {
  const API_TOKEN = process.env.NEXT_ENV_DATOCMS_API_TOKEN
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,

    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.log('********* json error', json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}