// import React, { useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const {user,isAuthenticated}=useAuth();
//   return (
//     <header>


// <button
//   className="menu-toggle"
//   aria-label="Toggle menu"
//   aria-expanded={open}
//   onClick={() => setOpen(!open)}
// >
//   {open ? '✕' : '☰'}
// </button>

// <nav className={`nav-links ${open ? 'open' : ''}`}>
//   ...
// </nav>


//    <div className="logo">Budget Tracker</div>
//    <nav className="nav-links">
//     <div>
//       <Link className='link' to='/' >dashboard</Link></div>
//     <div>
//       <Link  className='link' to='/budget'>budget</Link></div>
//     <div>
//       <Link className='link' to='/createbudget'>create budget</Link>
//       </div>
//    </nav>
//     <div className="auth">
//       {isAuthenticated?(
//         <>
//         welcome back {user?.userName}
//         <Link className="link" to="/sign-out">
//         Signout
//         </Link>
//         </>
//       ):(
//         <>
//         {" "}
//         <div> <Link className='link' to='/signin'>signin</Link></div>
//         <div> <Link className='link' to='/signup'>signup</Link></div>
// </>
//       )}
//     </div>
//    </header>
//   ) 
// }

// export default Navbar

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const closeMenu = () => setOpen(false);

  return (
    <header>
      <div className="logo">Budget Tracker</div>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <Link className="link" to="/" onClick={closeMenu}>dashboard</Link>
        <Link className="link" to="/budget" onClick={closeMenu}>budget</Link>
        <Link className="link" to="/createbudget" onClick={closeMenu}>create budget</Link>

        <div className="auth">
          {isAuthenticated ? (
            <>
              <span>welcome back {user?.userName}</span>
              <Link className="link" to="/sign-out" onClick={closeMenu}>signout</Link>
            </>
          ) : (
            <>
              <Link className="link" to="/signin" onClick={closeMenu}>signin</Link>
              <Link className="link" to="/signup" onClick={closeMenu}>signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar