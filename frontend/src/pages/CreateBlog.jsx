import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please choose a file first.');
      return;
    }
  
    const endpoint = 'https://gc8rfzbpji.execute-api.us-east-2.amazonaws.com/dev1/harsha-blog-bucket/test119.pdf';
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await axios.put(endpoint, formData);
  
      if (response.status === 200) {
        alert('File uploaded successfully!');
        setSelectedFile(null);
      } else {
        alert('Error uploading file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>

  );
};


export default CreateBlog

