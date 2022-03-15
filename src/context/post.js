import { createContext, useEffect, useState } from "react";

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/posts";

const PostsContext = createContext();

export const PostsContextProvider = (props) => {
  /*const [isLoading, setIsLoading] = useState(true); */
  const [posts, setPosts] = useState([]);

  const createPost = (name) => {
    console.log(name);
  };

  const getPostTitle = (postTitle) => {
    return posts.find((post) => post.title.rendered === postTitle);
  };

  const getPostContent = (postContent) => {
    // console.log(posts.find((post) => post.content.rendered === postContent));
    return posts.find((post) => post.content.rendered === postContent);
    // return "hello";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      /* setIsLoading(true); */
      const response = await fetch(URL, {
        method: "GET"
      });

      const data = await response.json();

      setPosts(data);
      /*  setIsLoading(false); */
    };

    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        /*isLoading,*/
        posts,
        createPost,
        getPostTitle,
        getPostContent
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;