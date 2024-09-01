import React, { useState } from 'react';
import '../Hero/Hero.css';
import login from '../assets/icons8-user-30.png';
import arrow from '../assets/arrow.png';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Hero = ({ openSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3005/api/login', {
            Username: username,
            Password: password,
        })
        .then((response) => {
            const isAdmin = response.data.user.isAdmin;
            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        })
        .catch((err) => {
            alert(`Login error ${err}`);
        });
    };



return (
    <div className='hero'>
        <div className='hero-left'>
            <h1>EMPOWERING RESEARCH EXCELLENCE</h1>
            <p>Your Gateway to Efficient Capstone Management</p>
            <div className='hero-left-buttons'>
                <button className='signup' onClick={openSignup}>SIGN UP</button>
                <button className='learn'>LEARN MORE<span><img src={arrow}/></span></button>
            </div>
        </div>
        <div className='hero-right'>
            <form >
                <div className='top'>
                    <h2>LOGIN</h2>
                    <img src={login}/>
                </div>
                <label>Username</label>
                <input type='textbox' placeholder='Enter your Username' onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password</label>
                <input type='password' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}/>          
                <button onClick={handleLogin}>LOGIN</button>
                <p>No account yet?<a href='#' onClick={openSignup}>Register</a></p>
            </form>
        </div>
    </div>
  );
}

export default Hero;
