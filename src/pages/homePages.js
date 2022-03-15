import PagesContext from '../context/pages';
import { sanitize } from 'dompurify';
import React from 'react';
import { useContext, Fragment } from 'react'

const Homepage = () => {
  const { pages, createPages } = useContext(PagesContext);

  createPages("PagesComplete");

  return (
    <>
      <div className='flex h-4/5'>
        <div className='flex w-1/2 h-full items-center justify-center'>
          <h1 className='font-sans text-cyan-500 text-8xl pt-20' >HOMEPAGE</h1>
        </div>
        <div className='flex w-1/2 h-full items-center justify-center'>
          {pages.map((page, index) => (
            <Fragment key={index}>
              {/* <div dangerouslySetInnerHTML={{__html:sanitize(page.title.rendered)}} key={page.id}></div>  */}
              <h1 className='font-sans text-2xl pr-10 pt-20 text-justify'>
              {page.id === 339 && 
              
                <div dangerouslySetInnerHTML={{__html:sanitize(page.content.rendered)}}></div> 

              }
              </h1>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default Homepage