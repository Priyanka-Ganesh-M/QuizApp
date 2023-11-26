import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Quiz from './Quiz.jsx';
import Result from './Result.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import './App.css'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/home/:id" element={<Home/>} />
        <Route exact path="/quiz/:quizId/:id" element={<Quiz/>} />
        <Route exact path="/result/:totQ/:result/:id" element={<Result/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;