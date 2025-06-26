import './App.css';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';

import Login from './components/login/Login.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx';
import Navbar from './components/navigation/Navbar.jsx';
import Role from './components/roles/Role.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

   const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false)
  }, []);

  if (checkingAuth) return null;

  const hideNavbarOnRoutes = ['/'];
  const shouldShowNavbar = isLoggedIn && !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div className='App'>
      {shouldShowNavbar && <Navbar/>}
      <Routes>
        <Route path='/dashboard' element={ isLoggedIn ? <Dashboard/> : <Navigate to = "/" replace />}/>
        <Route path='/roles' element={isLoggedIn ? <Role/> : <Navigate to="/" replace />}/>
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
    </div>

  );
}

export default App;
