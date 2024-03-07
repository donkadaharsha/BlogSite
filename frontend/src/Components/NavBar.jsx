import React from 'react'
import { Link } from 'react-router-dom'
import CreateBlog from '../pages/CreateBlog'
import Home from '../pages/Home'

const NavBar = () => {
  return (
    <div className='p-4 space-x-4 bg-black text-white '>
        <Link to='/'><span className='font-extrabold font-sans hover:font-serif'>Harsha</span></Link>
        <Link to='/CreateBlog'><span className='ml-7'>About</span></Link>
        <Link to='/CreateBlog'><span className='ml-2'>Contact</span></Link>
    </div>
  )
}

export default NavBar