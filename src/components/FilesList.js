import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles, downloadFile, renameFile, changeComment, deleteFile } from '../redux/actions';
import ContextMenu from './ContextMenu';

import '../css/FilesList.css';

const FilesList = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files);
  const loading = useSelector((state) => state.loading);

  const [selectedFile, setSelectedFile] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleFileClick = (file, event) => {
    setSelectedFile(file);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDownloadClick = () => {
    if (selectedFile) {
      dispatch(downloadFile(selectedFile.id));
    }
  };

  const handleRename = (fileId, newName) => {
    dispatch(renameFile(fileId, newName));
    setSelectedFile(null);
  };
  const handleChange = (fileId, newComment) => {
    dispatch(changeComment(fileId, newComment));
    setSelectedFile(null);
  };

  const handleDelete = () => {
    if (selectedFile) {
      dispatch(deleteFile(selectedFile.id));
      setSelectedFile(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  const shortenFileType = (fileType) => {
    const parts = fileType.split('/');
    return parts.length > 1 ? parts[1].toUpperCase() : fileType;
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
              <th>Тип</th>
              <th>Комментарий</th>
              <th>Дата загрузки</th>
              <th>Последняя дата скачивания</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td
                  onClick={(event) => handleFileClick(file, event)}
                  style={{ cursor: 'pointer'}}
                >
                  {file.name}
                </td>
                <td>{file.size / 1000} КБ</td>
                <td>{shortenFileType(file.mime_type)}</td>
                <td>{file.comment}</td>
                <td>{formatDate(file.upload_date)}</td>
                <td>{formatDate(file.last_download_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedFile && (
        <ContextMenu
          file={selectedFile}
          onRename={handleRename}
          onChange={handleChange}
          onDownload={handleDownloadClick}
          onDelete={handleDelete}
          position={contextMenuPosition}
        />
      )}
    </div>
  );
};

export default FilesList;
