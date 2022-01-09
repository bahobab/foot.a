import {ThemeProvider} from 'next-themes'
import '@/styles/global.scss'
// import '@/styles/index.css'
import Layout from '@/components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
