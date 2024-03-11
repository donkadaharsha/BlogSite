import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';

const ShowBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5554/blogs/${id}`)
      .then((response) => {
        setBlog(response.data.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8 text-black-900">Loading...</div>;
  }

  return (
    <>
    <NavBar></NavBar>
    <div className="container mx-auto p-4 bg-orange-200 rounded-md shadow-lg ">
      
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        {blog.title}
      </h1>
      <img
        src={`https://harsha-blog-bucket.s3.us-east-2.amazonaws.com/${blog.imgPath}`}
        alt={blog.title}
        className="w-full h-auto object-cover mb-6 rounded-md shadow-md mx-auto max-w-md"
      />
      <p className="text-gray-800 font-sans leading-7">{blog.description}</p>
    </div>
    </>
  );
};

export default ShowBlog;
