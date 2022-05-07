import { Link } from "react-router-dom";

const Practice = () => {
  return (
    <div className="practice">
      <div className="practice-links">
        <p>
          <Link className="link-practice" to="/fix">My Practice</Link>
        </p>
        <p>
          <Link className="link-practice" to="/fix">Practice Now</Link>
        </p>
      </div>
      <div className="practice-img"></div>
    </div>
  )
}

export default Practice;