import {Fragment, useEffect, useMemo, useState} from 'react'
import { sanitize } from 'dompurify';

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/tags";

const URL_POSTS = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";

const TagsPage = (props) => {

    const [tag, setTag] = useState(null)
    const [post, setPost] = useState(null)

    useEffect(() => {

        const fetchTags = async () => {
            /* setIsLoading(true); */
            const response = await fetch(URL, {
              method: "GET"
            });
      
            const data = await response.json();
      
            setTag(data);
            /*  setIsLoading(false); */
          };

          const fetchPosts = async () => {
            /* setIsLoading(true); */
            const response = await fetch(URL_POSTS, {
              method: "GET"
            });
      
            const data = await response.json();
      
            setPost(data);
            /*  setIsLoading(false); */
          };

          fetchPosts();
          fetchTags()

    }, [])


    const postsWithTag = useMemo(() => {

        let getOneTag = tag?.filter(item => {

            console.log(item?.slug, props?.titlePage)

            return item?.slug === props?.titlePage
        })

        let currentPost = post?.filter(item => {

            if (getOneTag && item?.tags?.indexOf(getOneTag[0].id) !== -1){
                return item
            }
        })

        return currentPost

    }, [post, tag])


      return (
          <Fragment>
              {
                  postsWithTag?.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <div className='text-2xl w-full flex justify-center ' dangerouslySetInnerHTML={{__html: sanitize(item?.title?.rendered)}}></div>
                            <div className='text-base text-center' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                        </Fragment>
                    )
                  })
              }
          </Fragment>
      )

}

export default TagsPage