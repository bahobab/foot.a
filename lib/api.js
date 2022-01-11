import {request} from '@/lib/datocms'

// import { request as fetchAPI } from '@/lib/datocms'

const BASE_API_URL = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
  : process.env.NEXT_PUBLIC_VERCEL_URL

console.log('>>BASE', `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
// ========================================================
async function fetchAPIQuery(query, { variables, preview } = {}) {
  
  const res = await fetch(`${BASE_API_URL}/api/datocmsquery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
      preview,
    }),
  })
  
  const json = await res.json()

  console.log('>>fetchAPIQuery - client', json)
  
  if (json.errors) {
    console.log('********* json error', json.errors)
    // console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json
}

// ========================================================

// import dotenv from 'dotenv'
// dotenv.config()

const API_URL = 'https://graphql.datocms.com'

// const API_TOKEN = process.env.DATOCMS_API_TOKEN
// const AUTH_TOKEN = `Bearer ${process.env.DATOCMS_API_TOKEN}`
// console.log('>>>API_TOKEN in api', AUTH_TOKEN)

// fetch(API_URL + (true ? '/preview' : ''), {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${API_TOKEN}`,
//     },
//     body: JSON.stringify({
//       query:'{allPosts{slug, title}}',
//     }),
//   }).then(res => res.json()).then(json => console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$',json))

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const API_TOKEN = process.env.NEXT_ENV_DATOCMS_API_TOKEN
  // console.log('>>API_TOKEN', API_TOKEN)
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.log('********* json error', json.errors)
    // console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPostBySlug(slug) {
  // const query = `
  //   query PostBySlug($slug: String) {
  //     post(filter: {slug: {eq: $slug}}) {
  //       slug
  //     }
  //   }`
  //   const variables = { slug }
  //   const preview = true

  // const data = await fetch('/api/datocmsquery', {headers:{}, method: 'POST', body: JSON.stringify({query, variables, preview})})
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

export async function getAllPostsWithSlug() {
  // const query = `
  //   {
  //     allPosts {
  //       slug
  //     }
  //   }`
  //   const variables = { }
  //   const preview = false

  // const data = await fetch('/api/datocmsquery', {headers:{}, method: 'POST', body: JSON.stringify({query, variables, preview})})
  const data = await fetchAPI(`
    {
      allPosts {
        slug
      }
    }
  `)

  return data?.allPosts
}

export async function getAllPostsForHome(preview) {
// const query = `
//   {
//       allPosts(orderBy: date_DESC, first: 20) {
//         id
//         title
//         slug
//         excerpt
//         date
//         category {
//           name
//         }
//         categories{
//           slug
//           name
//         }
//         coverImage {
//           responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
//             ...responsiveImageFragment
//           }
//         }
//         author {
//           name
//           picture {
//             url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
//           }
//         }
//       }
//     }
//     ${responsiveImageFragment}
// `
//     const variables = { }


//   const data = await fetch('/api/datocmsquery', {headers:{}, method: 'POST', body: JSON.stringify({query, variables, preview})})

  const data = await fetchAPI(
    `
    {
      allPosts(orderBy: date_DESC, first: 20) {
        id
        title
        slug
        excerpt
        date
        category {
          name
        }
        categories{
          slug
          name
        }
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  // console.log('>>>>> getAllPostsForHome', data)

  return data?.allPosts || []
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      id
      title
      slug
      content
      date
      categories{
        name
        slug
      }
      ogImage: coverImage{
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
        }
      }
    }
    morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      id
      title
      slug
      excerpt
      date
      categories{
        slug
        name
      }
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
        }
      }
    }
  }
  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  // console.log('morePosts', data?.morePosts);
  return data
}

export async function getRecentPosts() {
  const data = await fetchAPIQuery(`
  {
    allPosts{
      slug
      title
      date
      coverImage{
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100 }) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
  `)
  // console.log('getRecentPosts',data)
  return data?.allPosts || []
}

export const getSimilarPosts = async (slug, categories) => {
  // console.log('>>> getSimilarPosts', slug, categories)
  const data = await fetchAPIQuery(`
  {
    allPosts{
        title
        slug
        date
        coverImage{
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100 }) {
            ...responsiveImageFragment
        }
      }
    }
  }
    ${responsiveImageFragment}
  `)
  return data?.allPosts || []
}

export async function getCategories() {
  const data = await fetchAPI(`{
    allCategories {
      name
      slug
    }
  }`)
  // console.log('>> all categories', data.allCategories)
  return data?.allCategories || []
}

export async function submitComment(commentObj) {
  const resp = await fetch ('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
  const data = await resp.json()
  return data
}

export async function getPostComments(postId) {
  const data = await fetchAPIQuery(
    `
      query MyQuery($postId: ItemId) {
        allComments(filter: {post: {eq: $postId}}) {
          id
          comment
          name
          email
          createdAt
        }
      }
    `,
    {
      variables: {
        postId
      },
    }
  )
  return data?.allComments || []
}

export async function getAllPaths() {
  const data = await fetchAPI(`
    {
      allCategories {
        postId: postId
      }
    }
  `)
  // console.log('>>>> getAllPaths', data)
  return data?.allCatgories || []
}

export async function getAllCategoryPaths() {
  const data = await fetchAPI(`
  {
    allCategories {
      slug
    }
  }
  `)
  return data?.allCatgories || []
}


// post(
//         filter: {
//           categories: {
//             matches: {pattern: $slug, caseSensitive: false}}}) {

export async function getPostsByCategory(categoryId) {
  const dataP = await fetchAPI(`
    query CategoryPosts($categoryId: ItemId) {
      allPosts(filter: {category: {eq:$categoryId}}) {
        title
        slug
        date
        excerpt
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
    }
    ${responsiveImageFragment}
    `
    , {
      variables: {
        categoryId: categoryId,
        },
    }
  )
  
  return dataP?.allPosts || []
}

export async function getCategoryId(slug) {
  const data = await fetchAPI (`
    query CategoryName($slug: String) {
      category(filter: {slug: {eq: $slug}}) {
        id
        name
        summary
      }
    }`
    , {
      variables: {
        slug,
        },
    }
  )
  // console.log('>>> getCategory', data)
  return data?.category || []
}

export async function getFeaturedPosts() {
  const data = await fetchAPI(`
    {
      allPosts(filter: {featuredPost: {eq: true}}) {
        title
        slug
        date
        coverImage {
          responsiveImage {
            src
          }
        }
        author {
          name          
        }
      }
    }
  `)
  return data?.allPosts || []
}

export async function getNews() {
  const data = await fetchAPI(`
    {
      allNews {
        text
        title
      }
    }
  `)
  return data?.allNews || []
}

export async function getHeroHeader() {
  const data = await fetchAPI(`
  {
    heroSection {
      heroText
      ctaText
      heroImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
    } 
  }
  ${responsiveImageFragment}
  `)
  // console.log('getHeroHeader', data)
  return data?.heroSection || {}
}

export async function getIntro() {
  const data = await fetchAPI(`
    {
      intro{
        content
        heading
        subheading
        quote
      }
    }
  `)
  return data?.intro || {}
}

// export async function submitComment(commentObj) {
//   const data = await request(`
//   mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
//     createComment(name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}) {
//       name
//       email
//       comment
//       date
//     }
//   }
//   `, 
//   {
//     variables: {...commentObj} 
//   })

//   console.log('>>>********************** comment', data)
//   return data?.createComment
// }

// export async function submitComment(commentObj) {
//   const data = await fetchAPI(`
//   mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
//     createComment(name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}) {
//       name
//       email
//       comment
//       date
//     }
//   }
//   `, 
//   {
//     variables: {...commentObj} 
//   })
//   console.log('>>>********************** comment', data)
//   return data?.createComment
// }