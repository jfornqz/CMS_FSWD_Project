import { createContext, useEffect, useState } from "react";

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments";

const CommentsContext = createContext();

export const CommentsContextProvider = (props) => {
  /*const [isLoading, setIsLoading] = useState(true); */
  const [comments, setComments] = useState([]);

  const createComments = (name) => {
    console.log(name);
  };

  const getComments = (commentsId) => {
    return comments.find((comments) => comments.id === commentsId);
  };

  useEffect(() => {
    const fetchComments = async () => {
      /* setIsLoading(true); */
      const response = await fetch(URL, {
        method: "GET",
      });

      const data = await response.json();

      setComments(data);
      /*  setIsLoading(false); */
    };

    fetchComments();
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        /*isLoading,*/
        comments,
        createComments,
        getComments,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;