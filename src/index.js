import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import ModProfile from './components/ModProfile/ModProfile';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
  <Routes>   
     <Route path ='/' element={<Login/>} />
     <Route path ='/Register' element={<Register/>} />
     <Route path ='/Profile/:id' element={<Profile/>} />
     <Route path ='/Profile/:id/Mod' element={<ModProfile/>} />
     <Route path ='/*' element={<NotFound/>} />
  </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
