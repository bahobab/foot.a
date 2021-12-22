import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

import Widget from '@/components/Widget'
import Category from '@/components/Category'
import CommentForm from '@/components/comments/CommentForm'
import Comments from '@/components/comments/Comments'

import Avatar from '@/components/avatar'
import Date from '@/components/date'
// import PostTitle from '@/components/post-title'

export default function Post({ post, morePosts, preview }) {
  // console.log('??????', post)
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {/* <Header /> */}
        <PostTitle>{post.title}</PostTitle>
        {router.isFallback 
        ? <PostTitle>Loading…</PostTitle>
        : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-8">
              <article>
                <Head>
                  <title>
                    {post.title} | {CMS_NAME}
                  </title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author[0]}
                />
                <div className="p-8 bg-white mb-4 rounded-b-lg">
                  <Avatar name={post.author[0].name} picture={post.author[0].picture} />
                  <Date dateString={post.date} />
                  <PostBody content={post.content} />
                </div>
              </article>
              {/* <SectionSeparator /> */}
              <CommentForm post={post}/>
              <Comments post={post}/>
              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories title="More Stories" posts={morePosts} />}
            </div>
            <div className="col-span-1 lg:col-span-4 align-middle mb-8">
              <div className=" top-8 lg:sticky">
                <Widget slug={post.slug} categories={post.categories.map(category => category.slug)}/>
                <Category />
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  const content = await markdownToHtml(data?.post?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data?.post,
        content,
      },
      morePosts: data?.morePosts ?? [],
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  // console.log('>>> get static paths', allPosts)
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
