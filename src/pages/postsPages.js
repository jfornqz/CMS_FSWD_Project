import {useState, useEffect, Fragment, useMemo } from 'react'
import { sanitize } from "dompurify";
import {NavLink} from 'react-router-dom'

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
const URL_COMMENTS = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments";

const PostPage = (props) => {

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)

    useEffect(() => {

        const fetchPosts = async () => {
            /* setIsLoading(true); */
            const response = await fetch(URL, {
              method: "GET"
            });
      
            const data = await response.json();
      
            setPost(data);
            /*  setIsLoading(false); */
          };

          fetchPosts();

    }, [])

    // const header = post?.filter(item => {

    //     return item?.content?.rendered.search('<h')
    // })



    return (
        <Fragment>
            <div className='w-full h-4/5'>
                {
                post?.map((item, index) => {

                    return(
                        <div key={index} className='flex justify-center flex-wrap w-full flex-wrap' >
                            <div className='text-2xl w-full flex justify-center ' dangerouslySetInnerHTML={{__html: sanitize(item?.title?.rendered)}}></div>
                            <div className='text-base text-center' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                            <hr className='bg-black h-10' />

                            <NavLink to={{
                                pathname: item?.slug
                            }} className='text-blue-400 hover:text-blue-700 duration-150 transition text-lg'>Read more</NavLink>
                        </div>
                    )

                    // console.log(getHeader)
                    
                    // if (item?.content?.rendered?.search('<h1>') !== -1){
                    //     console.log(item?.content?.rendered?.search('<h1>'))
                    //     return (
                    //         <div className='text-2xl text-2xl w-full ' key={index} dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                    //     )
                    // }
                    
                })}
            </div>

            {console.log(comments)}
        </Fragment>
    )

}


export default PostPage