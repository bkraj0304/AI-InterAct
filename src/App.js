import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './Login&Register/LoginPage';
import RegisterPage from './Login&Register/RegisterPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App1 from './Dashboard'



function App() {
  return (
    <Router>
    <div>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/app" element={<App1 />} />


    </Routes>
    </div>
    </Router>
  );
}

export default App;

