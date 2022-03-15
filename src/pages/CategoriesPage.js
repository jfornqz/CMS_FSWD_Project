import {Fragment, useEffect, useState, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import { sanitize } from 'dompurify';


const URL_POSTS = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
const URL_CATEGORIES = "https://fswd-wp.devnss.com/wp-json/wp/v2/categories";

const CategoriesPage = ({titlePage}) => {

    const [allPosts, setAllPosts] = useState(null)
    const [categories, setCategories] = useState(null)
    const {pathname} = useLocation()

    useEffect(() => {
        const fetchPosts = async () => {
          /* setIsLoading(true); */
          const response = await fetch(URL_POSTS, {
            method: "GET"
          });
    
          const data = await response.json();
    
          setAllPosts(data);
          /*  setIsLoading(false); */
        };

        const fetchCategories = async () => {
            /* setIsLoading(true); */
            const response = await fetch(URL_CATEGORIES, {
              method: "GET",
            });
      
            const data = await response.json();
      
            setCategories(data);
            /*  setIsLoading(false); */
          };


        fetchCategories()
        fetchPosts();
        
    }, [pathname]);


    const categoriesWithPost = useMemo(() => {

        let currentCategories = categories?.filter(item => {

            return item?.slug === pathname.split('/')[2]
        })


        let storage = []


        if (allPosts){
        
            for (let item of allPosts){

                if (item?.categories.indexOf(currentCategories[0]?.id) !== -1){
                    storage.push(item)
                }
            }
        }

        return storage

    }, [categories, allPosts, pathname])

    return (
        <Fragment>
            <div className='w-full h-4/5 p-3'>
                {
                    categoriesWithPost?.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className='text-2xl w-full flex justify-center ' dangerouslySetInnerHTML={{__html: sanitize(item?.title?.rendered)}}></div>
                                <div className='text-base text-center' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                            </Fragment>
                        )
                    })
                }
                
            </div>

        </Fragment>
    )
}


export default CategoriesPage