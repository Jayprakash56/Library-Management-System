import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/ReduxStore';
import './index.css';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
)
