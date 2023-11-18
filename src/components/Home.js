import React from 'react';
import { Link } from 'react-router-dom';

function Home () {
  return (
    <div>
      <h1>My Cloud Storage</h1>
      <p>сервис хранения файлов</p>
      <Link to="/registration">Регистрация</Link>
      <br />
      <Link to="/login">Вход</Link>
    </div>
  );
}

export default Home;
