import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { AppRouter } from './router/router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
