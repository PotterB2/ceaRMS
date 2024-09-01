import React from 'react'
import Navbar from '../Navbar/Navbar'
import book from '../assets/icons8-book-30.png'
import user from '../assets/icons8-user-30.png'
import home from '../assets/icons8-book-30.png'
import lock from '../assets/icons8-lock-30.png'
import { Link } from 'react-router-dom'

export const SidebarNav = () => {
return (
    <>
        <div className="user-setting">
                <div className="right-nav">
                    <div className="right-navHeader">
                        <img src={home} alt="homeIcone" width={"30px"} height={"30px"}/>
                        <h2>ADMIN DASHBOARD</h2>
                    </div>
                    <hr/>
                    <div className="mid-nav">
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
            </div>
    </>
)
}
export default SidebarNav
