import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const {user,isAuthenticated}=useAuth();
  return (
    <header>
   <div className="logo">Budget Tracker</div>
   <nav>
    <div>
      <Link className='link' to='/' >dashboard</Link></div>
    <div>
      <Link  className='link' to='/budget'>budget</Link></div>
    <div>
      <Link className='link' to='/createbudget'>create budget</Link>
      </div>
   </nav>
    <div className="auth">
      {isAuthenticated?(
        <>
        welcome back {user?.userName}
        <Link className="link" to="/sign-out">
        Signout
        </Link>
        </>
      ):(
        <>
        {" "}
        <div> <Link className='link' to='/signin'>signin</Link></div>
        <div> <Link className='link' to='/signup'>signup</Link></div>
</>
      )}
    </div>
   </header>
  ) 
}

export default Navbar
