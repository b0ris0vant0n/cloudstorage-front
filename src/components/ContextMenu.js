import React from 'react';
import '../css/ContextMenu.css';

const ContextMenu = ({ file, onRename, onDownload, onChange, onDelete, onShare, position }) => {

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

  const handleDeleteClick = () => {
    onDelete(file.id);
  };

  const handleShareClick = () => {
    onShare(file.id);
  };

  return (
    <div className="context-menu" style={{ top: position.y, left: position.x }}>
      <div onClick={handleRenameClick}>Переименовать</div>
      <div onClick={handleChangeCommentClick}>Изменить комментарий</div>
      <div onClick={() => onDownload(file.id)}>Скачать</div>
      <div onClick={handleShareClick}>Поделиться</div>
      <div onClick={handleDeleteClick}>Удалить</div>
    </div>
  );
};

export default ContextMenu;

