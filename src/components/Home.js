import React from 'react';
import { Link } from 'react-router-dom';

function Home () {
  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Общая информация о приложении.</p>
      <Link to="/registration">Регистрация</Link>
      <br />
      <Link to="/login">Вход</Link>
    </div>
  );
}

export default Home;
