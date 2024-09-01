import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './AdminDashboard.css'
import Navbar from '../Navbar/Navbar'
import book from '../assets/icons8-book-30.png'
import user from '../assets/icons8-user-30.png'
import home from '../assets/icons8-home-30.png'


const AdminDashboard = () => {

    const [data, setData] = useState([]);
    const [users,setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3005/api/projects')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(`Error fetching data ${error}`);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3005/api/users')
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(`Error fetching data ${error}`);
            });
    }, []);

    const usersTotal = users.length
    const projects = data.length


return (
    <div className='Admin-dashboard'>
        <Navbar showLogout={true}/>
        <div className='dash-container'>
            <div className='dash-sidebar'>
                <div className='header'>
                    <img src={home} alt='homeIcon' width={"30px"} height={"30px"}/>
                    <h2>ADMIN DASHBOARD</h2>
                </div>
                <hr/>
                <div className='side-nav'>
                    <h2>CAPSTONE MANAGEMENT</h2>
                    <div className='action'>
                        <img src={book} alt='bookIcon'/><span><Link to='/manage-capstone' style={{ textDecoration: 'none', color: 'white' }}>Create/Read/Update/Delete Project</Link></span>
                    </div>
                    <h2>USER MANAGEMENT</h2>
                    <div className='action'>
                        <img src={user} alt='userIcon'/><span><Link to='/manage-user' style={{ textDecoration: 'none', color: 'white' }}>Create/Read/Update/Delete Users</Link></span>
                    </div>
                </div>
                <button>LOGOUT</button>
            </div>
            <div className='data-container'>
                <div className='card-container'>
                    <div className='data-card'>
                        <h3>TOTAL USERS</h3>
                        <p>{usersTotal}</p>
                    </div>
                    <div className='data-card'>
                        <h3>TOTAL CAPSTONE</h3>
                        <p>{projects}</p>
                    </div>
                    <div className='data-card'>
                        <h3>TOTAL ADMIN</h3>
                        <p>3</p>
                    </div>
                </div>
                <div className='footer'>
                    <p>Powered by BSCPE-II CEA 2024</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard