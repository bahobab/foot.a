import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

import HeaderMenu from './menu/HederMenu'
import HeroHeader from '@/components/hero/HeroHeader'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <HeaderMenu />
        <HeroHeader />
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
