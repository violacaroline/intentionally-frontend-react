import { useNavigate } from 'react-router-dom'

const MyPractice = () => {
  const navigate = useNavigate()
  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  const goBack = () => {
    navigate('/practice')
  }
  return (  
    <div className="my-practice">
      <button onClick={goBack}>&#10006; Go Back </button>
      <div className="my-practice-text">
      <h2>Hi {authenticatedUser.username +'! ' + String.fromCharCode("0x00002661")} </h2>
      <h3>This is how you have been feeling lately</h3>
      <p>Journaling Prompts</p>
      <p>My Mood</p>
      <p>Delete User</p>
      </div>
    </div>
  )
}
 
export default MyPractice