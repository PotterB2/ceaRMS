import React, { useState } from 'react';
import Axios from 'axios';
import './Signup.css';
import signup from '../assets/icons8-user-30.png';
import { FaTimes } from 'react-icons/fa';

const Signup = ({ closeSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [showSignup, setShowSignup] = useState(true)

  const createUser = () => {
    if (username === '' || email === '' || password === '' || passwordConfirm === '') {
      setMessage('Please fill out all fields.');
      setTimeout(() => {
        setMessage('');
      }, 1000)
      return;
    }
    if (password !== passwordConfirm) {
      setMessage('Passwords do not match!');
      setTimeout(() => {
        setMessage('');
      }, 1000)
      return;
    }

    Axios.post('http://localhost:3005/api/register', {
      Username: username,
      Email: email,
      Password: password,
    })
      .then(() => {
        setMessage('Registered Successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        
        setTimeout((closeSignup) => {
          setMessage('');
        }, 1000)
        closeSignup

      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setMessage('Error registering user.');

        setTimeout(() => {
          setMessage('');
        }, 1000)
      });
  };

  return (
    <div className='outside-container'>
      <div className='form-container'>
        <form className='form'>
          <FaTimes className='close-icon' onClick={closeSignup} />
          <div className='signup-top'>
            <h2>SIGN UP</h2>
            <img src={signup} alt='signup' />
          </div>
          <label className='username'>Username</label>
          <input type='textbox' placeholder='Create Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
          <label className='email'>Email</label>
          <input type='textbox' placeholder='Enter your Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <label className='password'>Password</label>
          <input type='password' placeholder='Create password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <label className='confirmpass'>Confirm Password</label>
          <input type='password' placeholder='Confirm password' value={passwordConfirm} onChange={(e) => { setPasswordConfirm(e.target.value) }} />
          <button type='button' onClick={createUser}>SUBMIT</button>
          <div className='message' style={{ display: message ? 'flex' : 'none' }}>
            {message}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
