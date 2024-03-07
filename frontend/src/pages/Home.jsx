import React from 'react'
import NavBar from '../Components/NavBar'
import axios from 'axios';
import { useState, useEffect } from 'react'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    axios
    .get('http://localhost:5554/blogs')
    .then((response) => {
      setBlogs(response.data.data);
      // console.log(response.data.data);
      setLoading(false);
      
    })
    .catch((error) => {
    
      console.log(error);
      setLoading(false);
    })
    
  })
  
  return (
    <div>
      <NavBar />

      {loading ? (
        <p>Loading...</p>
      ) : (
        blogs.map((blog,index) => (
          <div  className='auto-cols-max'>
            <div key={blog._id} className='h-8'>
            
              <h3>{blog.imgPath}</h3>
              
            </div>
            <div className='heading-container'>
              <h3>{blog.title}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Home