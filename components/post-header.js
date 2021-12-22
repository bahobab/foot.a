import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      {/* <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div> */}
      <div className="sm:mx-0 rounded-t-lg">
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
          className="rounded-t-lg"
        />
      </div>
      {/* <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div> */}
    </>
  )
}
