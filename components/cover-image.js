import { Image } from 'react-datocms'
import cn from 'classnames'
import Link from 'next/link'

export default function CoverImage({ title, responsiveImage, slug }) {
  // console.log('>>>responsive image', typeof responsiveImage)
  const { src, alt, width, height, srcSet, webpSrcSet } = responsiveImage
  const image = (
    <Image
      data={responsiveImage}
      className={cn('shadow-small rounded-t-lg', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
