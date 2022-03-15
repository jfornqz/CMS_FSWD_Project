import "./App.css";

import Homepage from "./pages/homePages.js";
// import Postpage from './pages/postPages.js';

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import {
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import Posepage from "./pages/postsPages";
import Postpage from "./pages/postsPages";
import CategoriesPages from './pages/CategoriesPage'
import Content from './component/Content'
import Navbar from './component/Navbar'
import TagsPage from './pages/TagsPage'

const navigation = [
  { name: "Vel est iusto numquam molestiae", href: "#", current: false },
  { name: "Dolor distinctio et consectetur nam voluptatibus", href: "#", current: false },
  { name: "Ut autem iste quo", href: "#", current: false },
  { name: "Iure eligendi impedit voluptatum non omnis asperiores quia", href: "#", current: false },
  { name: "Amet et sed qui possimus sit", href: "#", current: false },
  { name: "Iure eligendi impedit voluptatum non omnis asperiores quia", href: "#", current: false },
  { name: "Esse odit ut unde sed nihil", href: "#", current: false },
  { name: "Quidem adipisci dignissimos atque", href: "#", current: false },
  { name: "Id ullam reprehenderit aut", href: "#", current: false },
  { name: "Maiores est quisquam minus placeat", href: "#", current: false },
  { name: "Porro ut ea sequi", href: "#", current: false },
];

const categories = [
  {name: 'category-test'},
  {name: 'classic'},
  {name: 'runner'},
  {name: 'life'},
  {name: 'style'},
  {name: 'uncategorized'}
]

const tags = [
  {name: 'brooklyn'},
  {name: 'fashion'},
  {name: 'women-3'}
]



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const App = () => {

  
  return (
      <div className="w-screen h-screen">
        
          <Navbar />
          <Switch>


            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/post" exact>
              <Postpage />
            </Route>
            <Route path='/something' exact>
              <Content />
            </Route>

            {
              navigation?.map((item, index) => {

                return (
                  <Route path={`/${item?.name?.replace(/ /g, '-').toLowerCase()}`} exact key={index}>
                    <Content titlePage={item?.name} />
                  </Route>
                )
              })
            }

            {
              categories?.map((category, index) => {
                return (
                  <Route path={`/categories/${category?.name}`} exact key={index}>
                    <CategoriesPages titlePage={category?.name} />
                  </Route>
                )
              })
            }
            {
              tags?.map((tag, index) => {

                return (
                  <Route path={`/tags/${tag?.name}`} exact key={index}>
                    <TagsPage titlePage={tag?.name} />
                  </Route>
                )
              })
            }



            {/* <Route path={/ /g}></Route> */}

          </Switch>
      </div>
  );
}

export default App;
