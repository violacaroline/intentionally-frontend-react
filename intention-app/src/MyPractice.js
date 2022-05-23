import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const MyPractice = () => {
  const [moods, setMoods] = useState([])


  const navigate = useNavigate()
  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get('http://localhost:8087/api/v1/moods', {
          headers: {
            authorization: authenticatedUser.accessToken
          }
        })

        const userMoods = Array.from(response.data)
        setMoods(userMoods)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMoods()
  }, [authenticatedUser.accessToken])

  const goBack = () => {
    navigate('/practice')
  }

  return (
    <div className="my-practice">
      <button onClick={goBack}>&#10006; Go Back </button>
      <div className="my-practice-text">
        <h2>Hi {authenticatedUser.username + '! ' + String.fromCharCode("0x00002661")} </h2>
        <h3>This is how you have been feeling lately</h3>
        {moods.map((mood, index) => (
          <div key={index} className="user-mood">
            <h4>{mood.date}</h4>
            <p>{mood.mood}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPractice