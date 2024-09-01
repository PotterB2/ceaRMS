import React from 'react';
import './UserUpdate.css';
import close from '../assets/close.png';

const UserUpdate = ({ CloseUpdate }) => {
    return (
        <div className='update-form'>
            <div className='update-card'>
                <img src={close} alt='closeIcon' className='close-update' onClick={CloseUpdate} />
                <label>Username</label>
                <input type="text" placeholder='Enter new username' />
                <label>Password</label>
                <input type="password" placeholder='Enter new password' />
                <label>Email</label>
                <input type="text" placeholder='Enter new email' />
                <label>-select role-</label>
                <select>
                    <option value={0}>USER</option>
                    <option value={1}>ADMIN</option>
                </select>
                <button>UPDATE</button>
            </div>
        </div>
    );
}

export default UserUpdate;
