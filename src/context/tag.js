import { createContext, useEffect, useState } from "react";

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/tags";

const TagsContext = createContext();

export const TagsContextProvider = (props) => {
  /*const [isLoading, setIsLoading] = useState(true); */
  const [tags, setTags] = useState([]);

  const createTags = (name) => {
    console.log(name);
  };

  const getTags = (tagsId) => {
    return tags.find((tags) => tags.id === tagsId);
  };

  useEffect(() => {
    const fetchTags = async () => {
      /* setIsLoading(true); */
      const response = await fetch(URL, {
        method: "GET",
      });

      const data = await response.json();

      setTags(data);
      /*  setIsLoading(false); */
    };

    fetchTags();
  }, []);

  return (
    <TagsContext.Provider
      value={{
        /*isLoading,*/
        tags,
        createTags,
        getTags,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};

export default TagsContext;