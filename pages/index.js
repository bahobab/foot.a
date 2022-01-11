import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import Head from 'next/head'
import { BLOG_NAME } from '@/lib/constants'
import { getAllPostsForHome, getCategories, getNews, getHeroHeader, getFeaturedPosts, getIntro } from '@/lib/api'

import Widget from '@/components/Widget'
import Alert from '@/components/alert'
import CategoryMenu from '@/components/CategoryMenu'
import HeaderMenu from '@/components/menu/HeaderMenu'
import HeroHeader from '@/components/hero/HeroHeader'
import SectionSeparator from '@/components/section-separator'
import FeaturedPosts from 'sections/FeaturedPosts'

export default function Index({ allPosts, allCategories, news, heroHeader, featuredPosts, intro }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <div  className="bg-th-background">
      <Layout>
        <Head>
          <title>African Football Blog - {BLOG_NAME}</title>
        </Head>
        <Container>
          <HeaderMenu categories={allCategories}/>
          <HeroHeader news={news} heroHeader={heroHeader}/>
          <FeaturedPosts featuredPosts={featuredPosts} />
          <Intro intro={intro}/>
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
                <Widget />
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
  const news = await getNews()
  const heroHeader = await getHeroHeader()
  const featuredPosts = await getFeaturedPosts()
  const intro = await getIntro()

  console.log('>>> allCategories', featuredPosts)
  return {
    props: { allPosts, allCategories, news, heroHeader, featuredPosts, intro },
  }
}
