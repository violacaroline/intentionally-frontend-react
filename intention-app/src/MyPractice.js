import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from './Chart'



const MyPractice = () => {
  const navigate = useNavigate()
  const [deleteUser, setDeleteUser] = useState(false)

  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }

  const [moods, setMoods] = useState([])

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const { data } = await axios.get('http://localhost:8087/api/v1/moods', {
          headers: {
            authorization: authenticatedUser.accessToken
          }
        })

        setMoods(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMoods()
  }, [authenticatedUser.accessToken])

  const data = {
    labels: ['Joy', 'Fear', 'Sadness', 'Anger', 'Disgust'],
    datasets: [
      {
        data: [
          moods.filter((mood) => mood.mood === 'joy').length,
          moods.filter((mood) => mood.mood === 'fear').length,
          moods.filter((mood) => mood.mood === 'sadness').length,
          moods.filter((mood) => mood.mood === 'anger').length,
          moods.filter((mood) => mood.mood === 'disgust').length
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1,
      },
    ],
  }

  const toggleDeleteUser = () => { setDeleteUser(!deleteUser) }

  const yesDeleteUser = async () => {
    try {
      await axios.delete('http://localhost:8086/api/v1/delete', {
        headers: {
          authorization: authenticatedUser.accessToken
        }
      })

      console.log('User was deleted, check compass')

    } catch (error) {
      console.log('There was an error deleteing the user')
    }
  }

  const goBack = () => {
    navigate('/practice')
  }
  return (
    <div className="my-practice">
      <div className="my-practice-go-back">
        <button onClick={goBack}>&#10006; Go Back </button>
      </div>
      <div className="my-practice-text">
        <h2>Hi {authenticatedUser.username + '! ' + String.fromCharCode("0x00002661")} </h2>
        {moods.length > 0 ? <>
          <h3>This is how you have been feeling lately</h3>
          <Chart chartData={data} /> </> :
          <p>You have not logged any moods yet..</p>}
      </div>
      <div className="my-practice-image">
        <img className="img-my-practice" src={IMG("home-ocean.jpg")} alt="" />
        <button>Change Pofile Picture</button>
        <button onClick={toggleDeleteUser}>Delete my Account</button>
        {deleteUser && <div className="my-practice-yes-no">
          <p>Are you sure you want to delete your account?</p>
          <div className="my-practice-yes-no-buttons">
            <button onClick={yesDeleteUser}>Yes</button><button onClick={toggleDeleteUser}>No</button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default MyPractice