import {useState, useEffect, Fragment, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import { sanitize } from 'dompurify';

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";
const URL_COMMENTS = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments";


const Content = (props) => {


    const location = useLocation()
    const [currentPost, setCurrentPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [text, setText] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(URL, {
              method: "GET"
            });
      
            const data = await response.json();

            setCurrentPost(() => {

                let storage = []

                for (let item of data){

                    console.log(item?.slug, location.pathname.slice(1))

                    if (item?.slug === location.pathname.slice(1)){
                        storage.push(item)
                    }
                    
                }

                return storage
            })
      
          };

          const fetchComments = async () => {
            /* setIsLoading(true); */
            const response = await fetch(URL_COMMENTS, {
              method: "GET",
            });
      
            const data = await response.json();
      
            setComments(data);
          };
      
          fetchComments();
          fetchPosts()

    }, [location])

    const commentForCurrentPost = useMemo(() => {

        let getCommentForPost = comments?.filter(item => {

            if (currentPost){
                return item?.post === currentPost[0]?.id
            }
        })

        
        return getCommentForPost

    }, [location, currentPost, comments])


    const submitData = async(e) => {

        e.preventDefault();

        let [day, month, year, hour, min, sec] = [
          new Date().getDate(),
          new Date().getMonth() + 1,
          new Date().getFullYear(),
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds(),
        ];
    
    
        let reDay = String(day).length === 1 ? `0${day}` : day;
        let reMonth = String(month).length === 1 ? `0${month}` : month;
        let reHour = String(hour).length === 1 ? `0${hour}` : hour;
        let reMin = String(min).length === 1 ? `0${min}` : min;
        let reSec = String(sec).length === 1 ? `0${sec}` : sec;
    
        let datetime = `${year}-${reMonth}-${reDay}T${reHour}:${reMin}:${reSec}`;
    
        let data = {
          post: currentPost && currentPost[0]?.id,
          author_url: "",
          date: `${datetime}`,
          author_name: `${name}`,
          content: `${text}`,
          type: "comment",
        };

        console.log(data)
    
        await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
          },
          body: JSON.stringify(data),
        });


    }


    return (
        <Fragment>
            <div className='w-full h-4/5'>
                {
                    currentPost?.map((item, index) => {
                        return (
                            <Fragment>
                                <div className='text-2xl w-full flex justify-center ' dangerouslySetInnerHTML={{__html: sanitize(item?.title?.rendered)}}></div>
                                <div className='text-base text-center' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                            </Fragment>
                        )
                    })
                }
                <div className='mt-10'>
                    <h1 className='text-2xl text-center mb-5'>Comments</h1>
                    {
                        commentForCurrentPost?.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className='w-full'>
                                        <div className='w=full flex justify-start'>
                                            <div className='text-base text-center text-xl pl-5 font-semibold' dangerouslySetInnerHTML={{__html: sanitize(item?.author_name)}}></div>
                                        </div>
                                        <div className='w-full flex justify-start'>
                                            <div className='text-base text-center text-lg pl-16 font-light' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div>
                                        </div>
                                        {/* <div className='text-base text-center text-lg' dangerouslySetInnerHTML={{__html: sanitize(item?.content?.rendered)}}></div> */}
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>

                <form className='w-full mt-5 p-6 flex flex-wrap' onSubmit={submitData}>

                    <div className='w-full mb-3'>
                        <input className='w-1/2 focus:outline-none border border-black p-2 duration-150 transition focus:border-2 focus:border-blue-400' onChange={(e) => setName(e.target.value)} placeholder='Input name' />
                    </div>

                    <input placeholder='Input comment' onChange={(e) => setText(e.target.value)} className='w-1/2 mr-5 p-2 border border-black p-2 duration-150 transition focus:outline-none focus:border-2 focus:border-blue-400' />

                    <button className='w-20 h-12 bg-blue-400 text-white rounded-md hover:duration-150 hover:transition hover:bg-blue-600' type='submit'>
                        Send
                    </button>

                </form>
            </div>
        </Fragment>
    )

}

export default Content