import React, { useState } from 'react';
import axios from 'axios';
import AccessCodeDialog from './AccessCodeDialog';

const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const getFileContentType = (fileName) => {
    const fileExtension = fileName.split('.').pop();
    switch (fileExtension.toLowerCase()) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream'; // default content type
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please choose a file first.');
      return;
    }

    const imgPath = selectedFile.name;
    const endpoint = `https://gc8rfzbpji.execute-api.us-east-2.amazonaws.com/dev1/harsha-blog-bucket/${imgPath}`;
    const data = {
      title,
      imgPath,
      description,
    };

    const headers = {
      'Content-Type': getFileContentType(selectedFile.name),
    };

    try {
      const response = await axios.put(endpoint, selectedFile, { headers });
      console.log(response);
      console.log(data);

      if (response.status === 200) {
        setShowAccessCodeDialog(false);
        setSelectedFile(null);

        alert('File uploaded successfully!');

        try {
          const response_db = await axios.post('http://localhost:5554/blogs', data);
          console.log(response_db);
        } catch (error) {
          alert('DB update failed');
          console.error('Error:', error.message);
        }
      } else {
        alert('Error uploading file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    // Open the access code dialog
    setShowAccessCodeDialog(true);
  };

  const closeAccessCodeDialog = () => {
    // Close the access code dialog
    setShowAccessCodeDialog(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-md shadow-lg">
      {/* Access Code Dialog */}
      {showAccessCodeDialog && <AccessCodeDialog onClose={closeAccessCodeDialog} />}

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-gray-400 px-4 py-2 w-full mb-4"
        placeholder="Title"
      />
   <textarea
  onChange={(e) => setDescription(e.target.value)}
  className="border-2 border-gray-400 px-4 py-2 w-full mt-10 h-80 overflow-y-auto resize-none mb-4"
  placeholder="Description"
/>

      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      
    </div>
  );
};

export default CreateBlog;
