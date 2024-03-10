import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import ShowBlog from './pages/ShowBlog'
import EditBlog from './pages/EditBlog'
import DeleteBlog from './pages/DeleteBlog'
import AccessCodeDialog from './pages/AccessCodeDialog'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/CreateBlog' element={<CreateBlog/>}></Route>
      <Route path='/blogs/:id' element={<ShowBlog/>}></Route>
      <Route path='/blogs/edit/:id' element={<EditBlog/>}></Route>
      <Route path='/blogs/delete/:id' element={<DeleteBlog/>}></Route>
    </Routes>
  );
};

export default App