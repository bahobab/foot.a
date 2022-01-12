import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time className='text-green-400 text-xs bg-black bg-opacity-50 p-1' dateTime={dateString}>{format(date, 'LLL	d, yyyy')}</time>
}
