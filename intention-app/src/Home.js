const Home = () => {

  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }

  const handleRegisterClick = () => {
    console.log('You want to live more intentionally?')
  }

  return (
    <div className="home">
      <div className="home-text">
        <h3 className="space-around">There you are!</h3>
        <p className="space-around">Have you meditated yet?</p>
        <p className="space-around">Intentionally is here to help you get started right now!</p>
        <button className="space-around" onClick={handleRegisterClick}>Register</button>
      </div>
      <div className="home-img">
        <img className="img-home" src={IMG("home-ocean.jpg")} alt="" />
      </div>
    </div>
  )
}

export default Home;