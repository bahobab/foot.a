export default function PostTitle({ children }) {
  return (
    <h1 className="text-th-foreground text-6xl md:text-7xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-8 mt-12 text-center md:text-left">
      {children}
    </h1>
  )
}
