import  { Link, useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth.js'


const Navbar = () => {  
  const title = 'Intentionally'
  const { auth, setAuth } = useAuth()
  const history = useNavigate()

  const logOut = () => {
    console.log('Auth from Navbar logout before', auth)
    setAuth(null)
    
    console.log('Auth from Navbar logout after', auth)
    history('/')
    console.log('Auth from Navbar logout after redirect', auth)
   }

  return (
    <nav className="navbar">
      <h1 className="heading"> {title} </h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/moods">Our moods</Link>
        {auth && <Link to="/practice">Practice</Link> }
        {auth ? <button onClick={logOut}>Logout</button> : <> <Link to="/register">Register</Link> <Link to="/login">Login</Link> </>}      
      </div>
    </nav>
  )
}

export default Navbar;