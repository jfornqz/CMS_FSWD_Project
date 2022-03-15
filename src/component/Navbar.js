import {Fragment, useState} from 'react'
import {NavLink} from 'react-router-dom'


const Navbar = () => {


    return(
        <Fragment>
            <div className="w-full h-20 flex bg-black text-neutral-50 items-center pl-3">
            <NavLink to='/' className='mr-8'>
                <h1 className="text-4xl mr-8 "> Home</h1>
            </NavLink>
            <NavLink to='/post' className='mr-8'>

                <h1 className="text-xl">Post</h1>
            </NavLink>
            <NavLink to='/categories' className='mr-8'>
                {/* <h1 className='text-xl'>Category</h1> */}
                <div className="dropdown dropdown-hover">
                    <label tabIndex="0" className="m-1 text-xl">Category</label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                        <li><NavLink to='/categories/category-test'>Category-test</NavLink></li>
                        <li><NavLink to='/categories/classic' >Classic</NavLink></li>
                        <li><NavLink to='/categories/life' >Life</NavLink></li>
                        <li><NavLink to='/categories/runner' >Runner</NavLink></li>
                        <li><NavLink to='/categories/style' >Style</NavLink></li>
                        <li><NavLink to='/categories/uncategorized'>Uncategorized</NavLink></li>
                    </ul>
                </div>
            </NavLink>
            <NavLink to='/tag' className='mr-8'>
            <div className="dropdown dropdown-hover">
                <label tabIndex="0" className="m-1 text-xl">Tags</label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-1.5">
                        <li><NavLink to='/tags/brooklyn'>Brooklyn</NavLink></li>
                        <li><NavLink to='/tags/fashion' >Fashion</NavLink></li>
                        <li><NavLink to='/tags/women-3' >Women-3</NavLink></li>
                    </ul>
            </div>
            </NavLink>

            </div>
        </Fragment>
    )
}

export default Navbar