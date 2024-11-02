import { FC } from "react";
import HeaderForm from "../headerForm/HeaderForm";
import TodoLists from "../todoLists/TodoLists";
import { useDispatch } from "../../services/store";
import { exit } from "../../services/authentication/slice";
import { useNavigate } from 'react-router-dom';


const MainPage: FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  return (
    <>
      <button 
      style={{padding: '15px', border: 'none', color: '#f0eef3', backgroundColor: '#527cb8'}}
      onClick={() => {dispatch(exit()); navigate('/login');}}
      >Выход</button>
      <HeaderForm/>
      <TodoLists/>
    </>
  );
};

export default MainPage;