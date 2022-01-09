import PostPreview from './post-preview'

export default function MoreStories({ posts, title }) {
  return (
    <section>
      <h2 className="mb-8 p-4 rounded-lg bg-opacity-10 text-gray-200 bg-gradient-to-b from-th-background-tertiary text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 row-gap-20 md:row-gap-8">
        {
          posts.map((post) => {
            return <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
            }
          )
        }
      </div>
    </section>
  )
}
