import React from 'react';
import NavBar from '../Components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ShowBlog from './ShowBlog';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5554/blogs')
      .then((response) => {
        setBlogs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavBar />

      {loading ? (
        <p className="text-center mt-8 text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto mt-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-slate-700 ml-2 mr-2 mb-2 rounded-md overflow-hidden shadow-lg max-h-screen">
              <Link to={`/blogs/${blog._id}`}>
                <img
                  src={`https://harsha-blog-bucket.s3.us-east-2.amazonaws.com/${blog.imgPath}`}
                  alt={blog.title}
                  
                />
             </Link>
              
              <div className='bg-orange-400 h-80'>
              <Link to={`/blogs/${blog._id}`}> <h2 className="text-xl bg-slate-700 text-orange-500 font-bold  text-center">{blog.title}</h2> </Link>
              <Link to={`/blogs/${blog._id}`}>   <p className="text-black bg-orange-400 hover:underline p-3 h-80">{blog.description.substring(0,480)} <span className='text-white hover:underline cursor-pointer '>....Read more</span></p> </Link>
              
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
