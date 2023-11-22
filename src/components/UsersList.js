import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, } from '../redux/usersActions'

import '../css/UsersList.css'

const UsersList = ({ onUserSelect, isAdmin }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.users);
//   const loading = useSelector((state) => state.users.loading);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log('Effect started');
    dispatch(fetchUsers());
    console.log('isAdmin:', isAdmin); 
  }, [dispatch]);
  
  console.log('Users:', users);

  const deleteUser = (userId) => {
    // Здесь делайте запрос на сервер для удаления пользователя
    // Обновите состояние users после успешного удаления
  };

  const toggleAdminStatus = (userId) => {
    // Здесь делайте запрос на сервер для изменения признака «администратор»
    // Обновите состояние users после успешного изменения
  };

  return (
    <div>
      <h2>Список пользователей</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>Полное имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
            <th>Выбрать</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.is_admin ? 'Администратор' : 'Обычный пользователь'}</td>
              {(
                <td>
                  <button onClick={() => deleteUser(user.id)}>Удалить</button>
                  <button onClick={() => toggleAdminStatus(user.id)}>
                    {user.is_admin ? 'Сделать обычным' : 'Сделать администратором'}
                  </button>
                </td>
              )}
              <td><button onClick={() => onUserSelect(user)}>Выбрать</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
