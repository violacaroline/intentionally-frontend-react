import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'


const Navbar = () => {
  const title = 'Intentionally'
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

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
        {auth && <NavLink to="/practice" className={({ isActive }) => (isActive ? "active" : "")}>Practice</NavLink>}
        {auth ?
          <button onClick={logOut}>Logout</button>
          : <> <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink> </>}
      </div>
    </nav>
  )
}

export default Navbar;