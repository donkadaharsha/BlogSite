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
            <div key={blog._id} className="bg-black text-white ml-2 mr-2 rounded-md overflow-hidden shadow-lg border-red-500">
              <Link to={`/blogs/${blog._id}`}>
                <img
                  src={`https://harsha-blog-bucket.s3.us-east-2.amazonaws.com/${blog.imgPath}`}
                  alt={blog.title}
                  className='h-68 w-full object-cover'
                />
              </Link>
              <div className="p-4 bg-white">
                <h2 className="text-xl text-red-300 font-semibold mb-2">{blog.title}</h2>
                <p className="text-red-500">{blog.description.substring(0,470)} <span className='text-black hover:underline cursor-pointer'>....Read more</span></p>
              
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
