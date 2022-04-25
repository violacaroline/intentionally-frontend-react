const Home = () => {

  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }

  const handleRegisterClick =  () => {
    console.log('You want to live more intentionally?')
  }

  return (  
    <div className="home">
      <h2 className="text-home" >Home page</h2>
      <button className="text-home" onClick={ handleRegisterClick }>Register</button>
      <img className="img-home" src={ IMG("home-ocean.jpg") } alt="" />
    </div>
  )
}
 
export default Home;