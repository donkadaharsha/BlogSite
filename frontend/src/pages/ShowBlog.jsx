import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log('Fetching data...');
    
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
    return <div className="text-center mt-8 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-md shadow-lg">
      <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
      <img
        src={`https://harsha-blog-bucket.s3.us-east-2.amazonaws.com/${blog.imgPath}`}
        alt={blog.title}
        className='w-full h-48 object-cover mb-4 rounded-md shadow-md'
      />
      <p className="text-gray-700">{blog.description}</p>
    </div>
  );
};

export default ShowBlog;
