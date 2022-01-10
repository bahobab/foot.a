import React, {useEffect, useState} from 'react'
import Link from 'next/link';

import {getCategories} from '@/lib/api'

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(categories => {
        setCategories(categories);
    });
  }, []);

  // console.log('Categories', categories);

  if (!categories) return null;

  return (
    <div className="bg-opacity-20 bg-gradient-to-b from-th-background-tertiary shadow-lg rounded-lg mt-8 p-4">
      <h2 className="text-2xl font-bold text-th-tertiary border-b border-b-gray-300 mb-4">Categories</h2>
      {
        categories.map(category => {
          return (
            <div key={category.name} className='text-th-secondary font-semibold'>
              <Link href={`/category/${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Category

// export async function getStaticProps() {
//   const categories = await getCategories();
//   console.log('Categories', categories);
//   return {
//     props: {
//       categories
//     },
//   }
// }