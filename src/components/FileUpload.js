import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../redux/actions';
import '../css/FileUpload.css'

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {try {
        const formData = new FormData();
        formData.append('file', file);
        dispatch(uploadFile(formData));
      } catch (error) {
        console.error('Error preparing formData:', error.message);
      }
    }
  };

  return (
    <div className='file-upload-container'>
      <h2>Загрузить файл в облако</h2>
      <input className='file-input' type="file" onChange={handleFileChange} />
      <button className='upload-button' onClick={handleUpload}>Загрузить</button>
    </div>
  );
};

export default FileUpload;
