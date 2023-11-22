import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import FilesList from './FilesList';
import FileUpload from './FileUpload';
import UsersList from './UsersList';

const Files = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  console.log('isadmin', isAdmin)

  return (
    <div>
      <Navbar />
      {isAdmin && <UsersList onUserSelect={handleUserSelect} />}
      {selectedUser ? (
        <div>
          <h2>{`Файлы пользователя ${selectedUser.username}`}</h2>
          <FilesList userId={selectedUser.id} />
        </div>
      ) : (
        <div>
          <FilesList />
        </div>
      )}
      <FileUpload />
    </div>
  );
};

export default Files;
