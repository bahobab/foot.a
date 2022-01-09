import Image from 'next/image'

export default function Avatar({ name, picture }) {
  // console.log('PostHeader picture', name, picture)

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={picture.url}
          layout="fill"
          className="rounded-full absolute w-full h-full object-cover"
          alt={name}
        />
      </div>
      <div className="text-xl text-th-tertiary font-bold">{name}</div>
    </div>
  )
}
