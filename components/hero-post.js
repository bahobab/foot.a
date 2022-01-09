import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  const { name, picture} = author[0]
  return (
    <section>
      <div className="bg-opacity-10 bg-th-background-secondary rounded-lg shadow-lg p-0 mb-8">
        <div className="mb-8 md:mb-16">
          <CoverImage
            title={title}
            responsiveImage={coverImage.responsiveImage}
            slug={slug}
          />
        </div>
        <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 p-4">
          <div>
            <h3 className="mb-4 text-white text-4xl lg:text-6xl leading-tight">
              <Link href={`/posts/${slug}`}>
                <a className="hover:underline text-white">{title}</a>
              </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg text-white">
              <Date dateString={date} />
            </div>
          </div>
          <div>
            <p className="text-lg text-white leading-relaxed mb-4">{excerpt}</p>
            <Avatar name={name} picture={picture} />
          </div>
        </div>
      </div>
    </section>
  )
}
