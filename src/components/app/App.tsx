import { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import "./app.scss";
import LoginPage from "../pages/loginPage/LoginPage";
import MainPage from "../pages/MainPage";
import { useDispatch, useSelector } from "../../services/store";
import { setAuth } from "../../services/authentication/slice";
import Page404 from "../pages/Page404";

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null && user !== undefined) {
      dispatch(setAuth(JSON.parse(user)));
    }
  }, [dispatch]);

  const isAuth = useSelector(state => state.auth.isAuthChecked);


  return (
    <Router>
      <div className="app">
        <Routes>
          {!isAuth ? (
            <Route path="/login" element={<LoginPage />} />
          ) : (
            <Route path="/" element={<MainPage />} />
          )}
          <Route path="*" element={<Page404/>}/>
          { !isAuth ? (
            <Route path="/" element={<Navigate to="/login" replace />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
