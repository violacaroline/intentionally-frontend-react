import  { Link } from 'react-router-dom'

const Navbar = () => {
  const title = 'Intentionally'
  return (
    <nav className="navbar">
      <h1 className="heading"> {title} </h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/moods">Our moods</Link>
        <Link to="/practice">Practise</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>       
      </div>
    </nav>
  )
}

export default Navbar;