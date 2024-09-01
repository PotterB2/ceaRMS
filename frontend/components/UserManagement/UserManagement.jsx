import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar';
import book from '../assets/icons8-book-30.png';
import user from '../assets/icons8-user-30.png';
import home from '../assets/icons8-book-30.png';
import lock from '../assets/icons8-lock-30.png';
import search from '../assets/SEARCH.png';
import SidebarNav from "../SidebarNav/SidebarNav";
import UserUpdate from "../UserUpdate/UserUpdate";
import './UserManagement.css';
import axios from "axios";

const UserManagement = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passconfirm, setPassconfirm] = useState("");
    const [admin, setAdmin] = useState('');
    const [data, setData] = useState([]);
    const [searchdata, setSearchdata] = useState("");
    const [showUpdate, setShowUpdate] = useState(false); // State to manage UserUpdate component visibility

    const handleCreate = () => {
        if (username === '' || password === '' || admin === '' || passconfirm === '') {
            alert('Please fill out all fields');
            return;
        }
        if (password !== passconfirm) {
            alert('Passwords do not match');
            return;
        }
        axios.post('http://localhost:3005/api/create', {
                Username: username,
                Password: password,
                isAdmin: admin
            })
            .then(() => {
                alert('User registered successfully');
                setUsername('');
                setAdmin('');
                setPassconfirm('');
                setPassword('');
            })
            .catch((error) => {
                alert('Error creating user', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3005/api/users')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            alert(`Error fetching data ${error}`);
        });
    }, []);

    const handleSearch = () => {
        if (searchdata === '') {
            alert('Please fill up first');
            return;
        }
        const filteredSearchdata = searchdata.toLowerCase();
        const filteredFromData = data.filter((userData) => {
            return userData.Username.toLowerCase().includes(filteredSearchdata);
        });

        if (filteredFromData.length === 0) {
            alert('No records found');
        } else {
            const firstUser = filteredFromData[0]; // Assuming you want to take the first user in the filtered result
            setUsername(firstUser.Username);
            setPassword(firstUser.Password);
            setPassconfirm(firstUser.Password);
            setAdmin(firstUser.isAdmin);
        }
    };

    const handleDelete = () => {
        if (username === '') {
            alert('Please search for a user to delete');
            return;
        }
        axios.delete('http://localhost:3005/api/delete', {
            data: { Username: username } // Send Username in the request body
        })
        .then(() => {
            alert('User deleted successfully');
            setUsername('');
            setPassword('');
            setPassconfirm('');
            setAdmin('');
            setSearchdata('');
            // Optionally refresh the user data list
            setData(data.filter(user => user.Username !== username));
        })
        .catch((error) => {
            alert(`Error deleting user: ${error}`);
        });
    };

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

    return (
        <>
            <Navbar showLogout={true}/>
            <div className="user-mngt">
                <SidebarNav/>
                <div className="crud-section">
                    <h2>USER MANAGEMENT</h2>
                    <img src={user} alt="userIcon" className="icon"/> 
                    <input type="text" value={searchdata} onChange={(e) => setSearchdata(e.target.value)} placeholder="Search by username" className="searchbar" />    
                    <div className="iconbg">
                        <img src={search} alt="searchicon" onClick={handleSearch}/>
                    </div>
                    <div className="cruid-flex">
                        <div className="input-fields">
                            <label>Username</label>
                            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} /><span><img src={user} alt="user"/></span>
                            <label>Password</label>
                            <input type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} /><span><img src={lock} alt="lock"/></span>
                            <label>Confirm Password</label>
                            <input type="text" placeholder="Confirm password" value={passconfirm} onChange={(e) => setPassconfirm(e.target.value)}/><span><img src={lock} alt="lock"/></span>
                            <select value={admin} onChange={(e) => setAdmin(e.target.value)} className="select-role">
                                <option value="" disabled>Select user role</option>
                                <option value={1}>ADMIN</option>
                                <option value={0}>USER</option>
                            </select>                      
                        </div>
                        <div className="action-fields">
                            <button onClick={handleCreate}>ADD USER</button>
                            <button onClick={handleSearch}>RETRIEVE USER</button>
                            <button onClick={() => setShowUpdate(true)}>UPDATE USER</button> {/* Update button click handler */}
                            <button onClick={handleDelete}>DELETE USER</button>
                        </div>
                    </div>              
                </div>
            </div>
            {showUpdate && <UserUpdate CloseUpdate={handleCloseUpdate} />} {/* Conditional rendering */}
        </>
    );
}

export default UserManagement;
