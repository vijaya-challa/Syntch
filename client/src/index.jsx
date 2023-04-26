import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameContextProvider from 'gameSection/Context/GameContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './auth/contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </GameContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
