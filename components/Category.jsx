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

  return (
    <div className="rounded-lg bg-blue-600 mt-8 p-4">
      <h2 className="text-2xl font-bold text-white border-b border-b-gray-300 mb-4">Categories</h2>
      {
        categories.map(category => {
          return (
            <div key={category.name} >
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
