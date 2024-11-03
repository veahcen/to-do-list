import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


import "./headerForm.scss";
import MyButton from '../ui/myButton/MyButton';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from '../../services/store';
import { addTodo, allTodosToTrash, deleteTodos } from '../../services/todos/slice';
import { ITodoState } from '../../types/types';

const HeaderForm: FC = () => {
  const [nameTodo, setNameTodo] = useState<string>('');
  const [disabl, setBiasabl] = useState<boolean>(true);
  const filter = useSelector(state => state.todos.todoFilter);
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const {request} = useHttp();

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (nameTodo.length > 0) {
      const newTodo: ITodoState = {
        id: uuidv4(),
        title: nameTodo,
        completed: false,
        inTrash: false
      }

      request("http://localhost:3001/todos", "POST", JSON.stringify(newTodo))
        .then((res) => {
          console.log(res, 'Отправка успешна');
          dispatch(addTodo(newTodo));
        })
        .catch(err => console.log(err));

      setNameTodo('')
    } else {
      setBiasabl(true);
    }
  }

  const onDeleteTodosFromTrash = (e: React.MouseEvent) => {
    e.preventDefault();
    let dialog:boolean = window.confirm('Вы действительно хотите переместить(удалить) все заданиея в(из) урну(ы)?');
    if(dialog) {
      if (filter === 'trash') {
        dispatch(deleteTodos())
        todos.forEach(item => {
          if(item.inTrash) {
            request(`http://localhost:3001/todos/${item.id}`, "DELETE")
          }
        });
      } else {
        dispatch(allTodosToTrash())
        todos.forEach(item => {
          const updateTodo = {
            inTrash: true
          }
          request(`http://localhost:3001/todos/${item.id}`, "PATCH", JSON.stringify(updateTodo))
        });
        }
    }
  }

  return (
    <div className="header">
      <form className="header__form">
        <MyButton disable={disabl} text={'ДОБАВИТЬ'} isRed={false} onClick={(e) => onSubmitHandler(e)}/>
        <input
          className="header__form__input"
          type="text"
          placeholder="Пополните список..."
          value={nameTodo}
          onChange={(e) => {setNameTodo(e.target.value); nameTodo.length > 0 ? setBiasabl(false) : setBiasabl(true)}}
           />
      </form>
      <MyButton text={'ОЧИСТИТЬ'} isRed={true} onClick={(e) => onDeleteTodosFromTrash(e)}/>
    </div>
  );
};

export default HeaderForm;