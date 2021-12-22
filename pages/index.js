import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllPostsForHome } from '@/lib/api'
import Head from 'next/head'
import { BLOG_NAME } from '@/lib/constants'

import Widget from '@/components/Widget'
import Category from '@/components/Category'
import SectionSeparator from '@/components/section-separator'

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>African Football Blog - {BLOG_NAME}</title>
        </Head>
        <Container>
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
                <Widget />
                <Category />
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts },
  }
}
