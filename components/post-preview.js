import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  const { name, picture, summary } = author[0]
  // console.log('PostPreview', name, picture.url)
  
  return (
    // <div className="bg-white rounded-lg shadow-lg p-0 pb-12 mb-8 md:p-4 lg:p-8">
    <div className="bg-white rounded-lg shadow-lg p-0 pb-12 mb-8">
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div className="p-4 mt-4">
      <h3 className="text-3xl mb-3 leading-snug transition duration-200 hover:text-pink-600">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="flex justify-between mb-3">
        <div className="text-sm mb-4">
          <Date dateString={date} />
        </div>
        <Link href={`/posts/${slug}`}>
          <a className="transition duration-200 hover:-translate-y-1 text-sm mb-4 cursor-pointer bg-pink-600 text-white px-2 py-0 rounded-full">Full story...</a>
        </Link>
      </div>

      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={name} picture={picture} />
      </div>
    </div>
  )
}
