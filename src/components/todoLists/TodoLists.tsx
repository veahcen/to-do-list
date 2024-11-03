import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { changeFilter, fetchTodos } from '../../services/todos/slice';

import TodoItem from '../todoItem/TodoItem';
import "./todoLists.scss";
import { ITodoState } from '../../types/types';

const TodoLists: FC = () => {
  const buttons = [
    {type: 'inProgress', name: 'ТЕКУЩИЕ ДЕЛА', quantity: 0},
    {type: 'all', name: 'ВСЕ ДЕЛА', quantity: 0},
    {type: 'checked', name: 'ВЫПОЛНЕННЫЕ ДЕЛА', quantity: 0},
    {type: 'trash', name: 'КОРЗИНА', quantity: 0}];
  const todos = useSelector(state => state.todos.todos);
  const activeFiltr = useSelector(state => state.todos.todoFilter);
  const status = useSelector(state => state.todos.isLoadindStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line
  }, []);

  todos.forEach((todo) => {
    if (!todo.completed && !todo.inTrash) {
      buttons[0].quantity += 1;
      buttons[1].quantity += 1;
    } else if (todo.completed && !todo.inTrash) {
      buttons[2].quantity += 1;
      buttons[1].quantity += 1;
    } else if (todo.inTrash) {
      buttons[3].quantity += 1;
      buttons[1].quantity += 1;
    }
  })

  const filteredTodos = todos.filter((todo) => {
    if (activeFiltr === "inProgress") return !todo.completed && !todo.inTrash;
    if (activeFiltr === "checked") return todo.completed && !todo.inTrash;
    if (activeFiltr === "trash") return todo.inTrash;
    return true;
  });

  const todoRender = (filteredTodos: ITodoState[]) => {
    if(filteredTodos.length === 0) {
      return (
        <h2 style={{color : '#9d989f', textAlign: 'center'}}>Дел не найдено</h2>
      )
    }

    return filteredTodos.map((item) => {
      return (<TodoItem key={item.id} {...item}/>)
    })
  }

  const elements: ReactNode = todoRender(filteredTodos);

  return (
    <div className="lists">
      <div className="list">
        {buttons.map((item, index) => {
          const classButton = "list__button";
          let isActive = activeFiltr === item.type ? ' list__button-active' : '';
          return (
            <button
              key={index}
              className={classButton+isActive}
              onClick={() => dispatch(changeFilter(item.type))}
             >
              {item.name + ` (${item.quantity})`}
             </button>
          )
        })}
      </div>

      <div className="items">
        {status === "loading" && <h5 style={{color : '#9d989f', textAlign: 'center'}}>Загрузка...</h5>}
        {status === "error" && <h5 style={{color : '#9d989f', textAlign: 'center'}}>Ошибка загрузки</h5>}
        {status === "idle" && elements}
      </div>
    </div>
  );
};

export default TodoLists;