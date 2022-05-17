import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'


const Navbar = () => {
  const title = 'Intentionally'
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const authenticatedUser = localStorage.getItem("user")

  const logOut = () => {
    setAuth()
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <h1 className="heading"> {title} </h1>
      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/moods" className={({ isActive }) => (isActive ? "active" : "")}>Our moods</NavLink>
        {authenticatedUser && <NavLink to="/practice" className={({ isActive }) => (isActive ? "active" : "")}>Practice</NavLink>}
        {authenticatedUser ?
          <button onClick={logOut}>Logout</button>
          : <> <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink> </>}
      </div>
    </nav>
  )
}

export default Navbar;