import React, { FC } from 'react';

import { useDispatch } from '../../services/store';
import { ITodoState } from '../../types/types';
import { toggleTodoComplited, toggleTodoInTrash } from '../../services/todos/slice';
import { useHttp } from '../../hooks/http.hook';

import "./todoItem.scss";

const TodoItem: FC<ITodoState> = (props) => {
  const {id, title, completed, inTrash} = props;
  const dispatch = useDispatch();
  const {request} = useHttp();

  const onClickCheckedHandler = (id: string) => {
    dispatch(toggleTodoComplited(id));
    const updateTodo = {
      completed: !completed,
    }
    request(`http://localhost:3001/todos/${id}`, "PATCH", JSON.stringify(updateTodo))
      .then((res) => {
        console.log(res, 'Отправка успешна');
      })
      .catch(err => console.log(err));
  }

  const onClickInTrashHandler = (id: string) => {
    dispatch(toggleTodoInTrash(id));
    const updateTodo = {
      inTrash: !inTrash
    }
    request(`http://localhost:3001/todos/${id}`, "PATCH", JSON.stringify(updateTodo))
      .then((res) => {
        console.log(res, 'Отправка успешна');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="item">
      <span className="item__text">{title}</span>
      <div className="item__buttons">

        <svg className={completed ? 'active__check' : 'check'} style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          onClick={() => onClickCheckedHandler(id)}>
          <path d="M20.293 5.293 9 16.586l-4.293-4.293-1.414 1.414L9 19.414 21.707 6.707l-1.414-1.414z"/>
        </svg>

        <svg className={inTrash ? 'active__trash' : 'trash'} style={{cursor: 'pointer'}} width="24px" height="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
          onClick={() => onClickInTrashHandler(id)}
        >
          <path fill='none' d="M0 0h20v20H0z"/><path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z"/>
        </svg>
      </div>
    </div>
  );
};

export default TodoItem;