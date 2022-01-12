import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'

import Container from '../container'
import { getCategories } from '@/lib/api'

import ThemeChanger from '../ThemeChanger'

// const categories = [
//   {name: 'Joueur', slug: 'joueur'},
//   {name: 'Equipe', slug: 'equipe'},
//   {name: 'Match', slug: 'match'},
//   {name: 'Statistique', slug: 'statistique'},
//   {name: 'Calendrier', slug: 'calendrier'},
//   {name: 'Contact', slug: 'contact'},
// ]


function HeaderMenu({categories}) {
  // const [categories, setCategories] = useState([])
  
  useEffect(() => {
    // getCategories().then(data => {
    //   setCategories(data)
    // }) 
    
    const menu = window.document.querySelector(".mobile-menu");
    const btn = window.document.querySelector(".mobile-menu-button");
    const closeBtn = window.document.querySelector(".mobile-menu-close");
    
    
    menu.style.transition = "transition: all 0.5s ease";
    
    // menu.addEventListener('click', (e) => {
    //   console.log('event', e.target)
    //   if (e.target !== this) {
    //     this.classList.toggle("hidden")
    //   }
    // })
    
    closeBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      // alert(menu.classList)
      const menuIWrapper = document.querySelector('.mobile-menu-wrapper').addEventListener('click', () => {
        menu.classList.add('hidden')
        
        // alert(menu.classList)
      }
      )
      // if (!menu.classList.contains('hidden')) {
      // }
    });

  }, [])

    
  const renderCategories = categories?.map(category => (
    <Link key={category.slug} href={`/category/${category.slug}`}>
      <a className="cursor-pointer menu-item md:bg-none tracking-wide text-white hover:bg-white md:hover:bg-transparent hover:text-green-400 transition-all duration-300">
        <span className="md:float-right mt-2 md:mt-0 align-middle font-bold p-1  ml-4 xs:ml-0 md:hover:bg-white">{category.name?.toUpperCase()}</span>
      </a>
    </Link>)
  )

  return (
    <Container>
      <div className="flex justify-between items-center border-b w-full border-th-secondary py-4">
        <div className="md:float-left">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white hover:text-green-400">
              F00t.A
            </span>
          </Link>
        </div>
        <ThemeChanger />
        <div className="hidden md:flex md:justify-end md:float-left">
          {
            // categories.map((category) => {
            //   return <Link key={category.slug} href={`/category/${category.slug}`}>
            //     <a className="md: float-right align-middle mt-2 ml-4 text-red-400">{category.name}</a>
            //   </Link>
            // })
            renderCategories
          }
        </div>
        {/* Mobile button */}
        <div className="md:hidden float-right h-full">
          <button className="outline-none mobile-menu-button mt-2">
            <svg className=" w-10 h-10 text-white hover:text-green-500 transition-all"
              x-show="!showMenu"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
			  </div>
      </div>
      <div className="fixed top-0 left-0 h-full w-full px-8 z-50 bg-black bg-opacity-70 mobile-menu transition-opacity duration-3000 hidden">
				<div className="mt-20 p-8 bg-green-300 bg-opacity-90 w-full max-w-sm m-auto flex-col flex md:hidden relative mobile-menu-wrapper">
          <span className="absolute -top-5 -right-5 pin-r p-4 mobile-menu-close">
            <svg className="h-12 w-12 fill-current text-grey hover:text-grey-darkest" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
					{ renderCategories }
				</div>
			</div>
    </Container>
  )
}

export default HeaderMenu
