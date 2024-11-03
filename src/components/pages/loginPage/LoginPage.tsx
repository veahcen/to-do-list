import React, { FC, useState } from 'react';

import "./loginPage.scss";
import { useDispatch } from '../../../services/store';
import { fetchUser } from '../../../services/authentication/slice';
import { useNavigate } from 'react-router-dom';


const LoginPage: FC = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  const login = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (name === 'admin' && password === 'admin') {
      await dispatch(fetchUser({username: name}));
      const isAuth = getCurrentUser();
      if(isAuth) {
        navigate('/');
      }
      setName('');
      setPassword('');
    } else {
      alert('Неправильно введен логин или пароль');
      setName('');
      setPassword('');
    }
    
  }

  return (
    <div className="login">
      <form className="form">
        <h2 className="form__title">Авторизация</h2>
        <input className="form__input"
          type="text"
          placeholder="Напишите ваш логин"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <input className="form__input"
          type="password"
          placeholder="Напишите ваш пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button onClick={(e) => login(e)} className="form__button">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;