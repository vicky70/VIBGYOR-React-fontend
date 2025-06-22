import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/Login.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>

        <Route path='/dashboard' element={ isLoggedIn ? <Dashboard/> : <Navigate to="/" replace />}/>
      </Routes>
    </div>

  );
}

export default App;
