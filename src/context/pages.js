import { createContext, useEffect, useState } from "react";

const URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/pages";

const PagesContext = createContext();

export const PagesContextProvider = (props) => {
  /*const [isLoading, setIsLoading] = useState(true); */
  const [pages, setPages] = useState([]);

  const createPages = (name) => {
    console.log(name);
  };

  const getPagesTitle = (pageTitle) => {
    return pages.find((page) => page.title.rendered === pageTitle);
  };

  const getPagesContent = (pageContent) => {
    // console.log(Pages.find((page) => page.content.rendered === pageContent));
    return pages.find((page) => page.content.rendered === pageContent);
    // return "hello";
  };

  useEffect(() => {
    const fetchPages = async () => {
      /* setIsLoading(true); */
      const response = await fetch(URL, {
        method: "GET"
      });

      const data = await response.json();

      setPages(data);
      /*  setIsLoading(false); */
    };

    fetchPages();
  }, []);

  return (
    <PagesContext.Provider
      value={{
        /*isLoading,*/
        pages,
        createPages,
        getPagesTitle,
        getPagesContent
      }}
    >
      {props.children}
    </PagesContext.Provider>
  );
};

export default PagesContext;
