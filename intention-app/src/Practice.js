import { Link,  } from 'react-router-dom'

const Practice = () => {
  return (
    <div className="practice">
      <div className="practice-links">
        <p>
          <Link className="link-practice" to="/my-practice">My Practice</Link>
        </p>
        <p>
          <Link className="link-practice" to="/practice-now">Practice Now</Link>
        </p>
      </div>
      <div className="practice-img"></div>
    </div>
  )
}

export default Practice