import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import Head from 'next/head'
import { BLOG_NAME, CMS_NAME } from '@/lib/constants'
import { getAllPostsForHome, getCategories, getNews, getHeroHeader, getFeaturedPosts, getRecentPosts } from '@/lib/api'

import Widget from '@/components/Widget'
import Alert from '@/components/alert'
import CategoryMenu from '@/components/CategoryMenu'
import HeaderMenu from '@/components/menu/HeaderMenu'
import HeroHeader from '@/components/hero/HeroHeader'
import SectionSeparator from '@/components/section-separator'
import FeaturedPosts from 'sections/FeaturedPosts'

export default function Index({ allPosts, recentPosts, allCategories, news, heroHeader, featuredPosts}) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <div  className="bg-th-background">
      <Layout categories={allCategories} news={news} heroHeader={heroHeader}>
        <Head>
          <title>{CMS_NAME} - {BLOG_NAME}</title>
        </Head>
        <Container>
          {/* <HeaderMenu categories={allCategories}/>
          <HeroHeader news={news} heroHeader={heroHeader}/>*/}
          <FeaturedPosts featuredPosts={featuredPosts} /> 
          <Intro />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-8">
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date}
                  author={heroPost.author}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              )}
              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories title="More Stories" posts={morePosts} />}
            </div>
            <div className="col-span-1 lg:col-span-4 align-middle">
              <div className="lg:sticky top-8">
                <Widget similarPosts={recentPosts}/>
                <CategoryMenu categories={ allCategories}/>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  const allCategories = await getCategories()
  const recentPosts = await getRecentPosts()
  const news = await getNews()
  const heroHeader = await getHeroHeader()
  const featuredPosts = await getFeaturedPosts()
  // const intro = await getIntro()

  return {
    // props: { allPosts, allCategories, featuredPosts, intro },
    props: { allPosts, recentPosts, allCategories, news, heroHeader, featuredPosts },
  }
}
