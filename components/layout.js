import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

import HeaderMenu from '@/components/menu/HeaderMenu'
import HeroHeader from '@/components/hero/HeroHeader'

export default function Layout({ preview, children, categories, news, heroHeader}) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/* <HeroHeader /> */}
        {/* <Alert preview={preview} /> */}
        <HeaderMenu categories={categories}/>
        <HeroHeader news={news} heroHeader={heroHeader}/>
        {/* <FeaturedPosts featuredPosts={featuredPosts} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

// export async function getStaticProps({ preview = false }) {
//   const categories = await getCategories()
//   const news = await getNews()
//   const heroHeader = await getHeroHeader()
//   // const featuredPosts = await getFeaturedPosts()
//   // const intro = await getIntro()
//   return {
//     props: {
//       preview,
//       categories,
//       news,
//       heroHeader,
//       // featuredPosts,
//       // intro
//     }
//   }
// }