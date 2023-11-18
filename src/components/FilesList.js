import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles, downloadFile } from '../redux/actions';

const FilesList = () => {
    const dispatch = useDispatch();
    const files = useSelector((state) => state.files);
    const loading = useSelector((state) => state.loading);

    const [selectedFile, setSelectedFile] = useState(null);
  
    useEffect(() => {
      dispatch(fetchFiles());
    }, [dispatch]);

    const handleFileClick = (file) => {
        setSelectedFile(file);
      };
    
    const handleDownloadClick = () => {
        if (selectedFile) {
          dispatch(downloadFile(selectedFile.id));
        }
    };
  
    return (
        <div>
          <h2>Список файлов</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Имя файла</th>
                  <th>Размер (КБ)</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td onClick={() => handleFileClick(file)} style={{ cursor: 'pointer', color: 'blue' }}>{file.name}</td>
                    <td>{file.size} КБ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      
          {selectedFile && (
            <div>
              <p>Выбранный файл: {selectedFile.name}</p>
              <button onClick={handleDownloadClick}>Скачать</button>
            </div>
          )}
        </div>
      );
      
    };
    
  

export default FilesList;
