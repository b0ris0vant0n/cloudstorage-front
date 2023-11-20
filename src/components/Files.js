import React from 'react';
import Navbar from './Navbar';
import FilesList from './FilesList';
import FileUpload from './FileUpload';

const Files = () => {
  return (
    <div>
      <Navbar />
      <FilesList />
      <FileUpload />
    </div>
  );
};

export default Files;
