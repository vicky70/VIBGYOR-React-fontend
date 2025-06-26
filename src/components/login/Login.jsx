
import { useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
// ()   !   &&
const Login = ({setIsLoggedIn}) => {

    const navigate = useNavigate()

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const adminLogin = async () => {
        
        try{
            if (!username || !password){
                alert('Please Enter Both the Username and Password.') 
                return
            }

            const response = await fetch('https://vicky70.pythonanywhere.com/adminlogin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            alert('Processing...')

            const data = await response.json()

            if(response.ok){
                localStorage.setItem('adminToken', data.token)
                setIsLoggedIn(true)
                navigate('/dashboard')
            }
            else{
                alert(data.error || 'Registration Failed')
            }
        }catch(error){
            alert('No Network connection. please check your connection', error)
        }
    };

    return(
        <div className={styles.loginContainer}>
            <h2>Only Admin</h2>
            <input type='text' value={username} placeholder='Enter Username' onChange={(e) => setUserName(e.target.value)}></input>
            <input type='password' value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={adminLogin}>Login</button>
        </div>
    );
}

export default Login;