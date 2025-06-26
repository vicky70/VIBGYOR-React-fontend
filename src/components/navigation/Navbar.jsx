import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className={styles.navbarContainer}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => isActive ? styles.activeLink : styles.link}
            >
              Departments
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/roles" 
              className={({isActive}) => isActive ? styles.activeLink : styles.link}
            >
              Roles
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;