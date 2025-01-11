import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
// import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { AppRouter } from './router/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
