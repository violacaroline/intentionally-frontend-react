import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { CgClose } from 'react-icons/cg'


const NavbarMobile = () => {
  const title = 'Intentionally'

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const authenticatedUser = localStorage.getItem("user")

  const toggleMenu = () => {
    setOpen(!open)
  }

  const hamburgerIcon = <HiMenu className="hamburger-icon" onClick={toggleMenu} />
  const closeIcon = <CgClose className="close-icon" onClick={toggleMenu} />

  const closeMenu = () => {setOpen(false)}


  const logOut = () => {
    localStorage.clear()
    closeMenu()
    navigate('/')
  }

  return (
    <nav className="navbar-mobile">
      <h1 className="heading"> {title} </h1>
      {open ? closeIcon : hamburgerIcon}
      {open &&
        <div className="links">
          <NavLink to="/" onClick={closeMenu} >Home</NavLink>
          <NavLink to="/moods" onClick={closeMenu} >Our moods</NavLink>
          {authenticatedUser && <NavLink to="/practice" onClick={closeMenu} >Practice</NavLink>}
          <NavLink to="/info" onClick={closeMenu} >Info</NavLink>
          {authenticatedUser ?
            <button onClick={logOut}>Logout</button>
            : <> <NavLink to="/register" onClick={closeMenu} >Register</NavLink>
              <NavLink to="/login" onClick={closeMenu} >Login</NavLink> </>}
        </div>
      }

    </nav>
  )
}

export default NavbarMobile