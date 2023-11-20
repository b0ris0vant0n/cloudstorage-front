import React from 'react';
import RegistrationForm from './RegistrationForm';
import '../css/Registration.css'

const Registration = () => {
  return (
    <div className='registrarion-container'>
      <h2>Регистрация</h2>
      <RegistrationForm />
    </div>
  );
}

export default Registration;
