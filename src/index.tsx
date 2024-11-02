import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './services/store';

import App from './components/app/App';
import './style/style.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

