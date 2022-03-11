import React from 'react'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import Widget from '@/components/Widget'
import PostTitle from '@/components/post-title'

import { getAllCategoryPaths, getPostsByCategory, getCategoryId, getCategories, getNews, getHeroHeader, getSimilarPosts } from '@/lib/api'

function PostsByCategory({categoryPosts, similarPosts, category, preview, news, heroHeader, categories}) {
  if (!category) return null
  const router = useRouter()
  return (
    <div  className="bg-th-background">
      <Layout preview={preview} news={news} heroHeader={heroHeader} categories={categories}>
        <Container>
          <div className="text-white bg-green-400 rounded-lg p-8 mt-16 md:mb-8" dangerouslySetInnerHTML={{__html: `<p>${category?.summary}<p>`}} />
          {
            router.isFallback 
            ? <PostTitle>Loading...</PostTitle>
            : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-8">
              {
                categoryPosts.length > 0
                ? (
                  <div className="mt-8 md:mt-0">
                  <MoreStories title={`${category.name} Posts`} posts={categoryPosts} />
                  </div>
                )
                : <h2 className="p-4 text-white mt-4 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                    No posts yet for {category.name}
                  </h2>
              }
            </div>
            <div className="col-span-1 lg:col-span-4 align-middle mb-8">
              <div className="lg:sticky lg:mt-22 top-8">
                <Widget slug={category.slug} similarPosts={similarPosts}/>
              </div>
            </div>
          </div>
            )
          }
        </Container>
      </Layout>
    </div>
  )
}

export default PostsByCategory

export async function getStaticPaths() {
  const paths = await getAllCategoryPaths()
  // console.log('PATHS', paths)

  return {
    paths: paths?.map(path => `/category/${path.slug}`) || [],
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const category = await getCategoryId(params.slug)
  const categoryPosts = await getPostsByCategory(category.id)

  const categories = await getCategories()
  const similarPosts = await getSimilarPosts(params.slug, categories)

  const news = await getNews()
  const heroHeader = await getHeroHeader()
  

  return { props: { categoryPosts, category, categories, news, heroHeader, similarPosts } }
}
