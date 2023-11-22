import React, { useState } from 'react';
import Navbar from './Navbar';
import FilesList from './FilesList';
import FileUpload from './FileUpload';
import UsersList from './UsersList';

const Files = ({ isAdmin }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Navbar />
      {<UsersList onUserSelect={handleUserSelect} />}
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
