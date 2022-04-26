const Navbar = () => {
  const title = 'Intentionally'
  return (
    <nav className="navbar">
      <h1 className="heading"> {title} </h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/moods">Our moods</a>
        <a href="/practise">Practise</a>
        <a href="/login">Log In</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  )
}

export default Navbar;