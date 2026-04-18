import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login';
import Attendance from './Components/Attendance';
import Homework from './Components/Homework';
import Exams from './Components/Exams';
import Marks from './Components/Marks';
import Announcements from './Components/Announcements';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/marks" element={<Marks />} />
        <Route path="/announcement" element={<Announcements />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
