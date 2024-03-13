import React from 'react'
import { Link } from 'react-router-dom'
import CreateBlog from '../pages/CreateBlog'
import Home from '../pages/Home'

const NavBar = () => {
  return (
    <div className='p-4 space-x-4 bg-indigo-600 text-white flex items-center'>
  <Link to='/'>
    <span className='font-extrabold font-sans hover:font-serif'>Harsha</span>
  </Link>
  <Link to='/'><span className='ml-7'>About</span></Link>
  <Link to='/'><span className='ml-2'>Contact</span></Link>
  <div className='flex-grow'></div>
  <Link to='/CreateBlog'><span>Admin login</span></Link>
</div>

  

  

  )
}

export default NavBar