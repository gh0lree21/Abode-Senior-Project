import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { default as Register } from './pages/Register';
import { default as Login } from './pages/Login';
import { default as Chat } from './pages/Chat';
import { default as SetAvatar } from './pages/SetAvatar';
import { default as EditContacts } from './pages/EditContacts';

export default function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/setAvatar" element={<SetAvatar />}/>
        <Route path="/editContacts" element={<EditContacts />} />
        <Route path="/" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  );
}