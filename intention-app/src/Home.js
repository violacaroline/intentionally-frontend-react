import { Link } from 'react-router-dom'

const Home = () => {
  const authenticatedUser = localStorage.getItem("user")
  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }

  return (
    <div className="home">
      <div className="home-text">
        <h3 className="space-around">There you are!</h3> 
        <p className="space-around">Have you meditated yet?</p>
        <p className="space-around">Intentionally is here to help you get started!</p>
        <p className="space-around">Check out "Our moods" for the 5 basic human emotions {String.fromCharCode("0x00002661")}</p>
        {authenticatedUser ? <p></p> :
          <p>
            <Link className="link-home" to="/register">Register</Link>
          </p>
        }
      </div>
      <div className="home-img">
        <img className="img-home" src={IMG("home-ocean.jpg")} alt="" />
      </div>
    </div>
  )
}

export default Home