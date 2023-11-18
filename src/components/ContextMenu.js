import React from 'react';
import '../css/ContextMenu.css';

const ContextMenu = ({ file, onRename, onDownload, onChange, position }) => {
  const [newFileName, setNewFileName] = React.useState('');
  const [newFileComment, setNewFileComment] = React.useState('')

  const handleRenameClick = () => {
    const newName = prompt('Введите новое имя файла:', file.name);
    if (newName) {
      onRename(file.id, newName);
    }
  };

  const handleChangeCommentClick = () => {
    const newComment = prompt('Введите комментарий:', file.comment);
    if (newComment) {
      onChange(file.id, newComment)
    }
  }
  return (
    <div className="context-menu" style={{ top: position.y, left: position.x }}>
      <div onClick={handleRenameClick}>Переименовать</div>
      <div onClick={handleChangeCommentClick}>Изменить комментарий</div>
      <div onClick={() => onDownload(file.id)}>Скачать</div>
    </div>
  );
};

export default ContextMenu;

