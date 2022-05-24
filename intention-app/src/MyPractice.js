import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from './Chart'



const MyPractice = () => {
  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }
  const [moods, setMoods] = useState([])
  const [joy, setJoy] = useState([])
  const [fear, setFear] = useState([])
  const [sadness, setSadness] = useState([])
  const [anger, setAnger] = useState([])
  const [disgust, setDisgust] = useState([])

  const [chartData, setChartdata] = useState({})


  const navigate = useNavigate()
  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  const fetchMoods = async () => {
    try {
      const response = await axios.get('http://localhost:8087/api/v1/moods', {
        headers: {
          authorization: authenticatedUser.accessToken
        }
      })

      if (moods.length === 0) {
        setMoods(response.data)
        console.log('Res data', response.data)
      }
      // return response.data
    } catch (error) {
      console.log(error)
    }
  }

  fetchMoods()
  console.log(moods)

  useEffect(() => {
    if (moods.length > 0) {
      setJoy(moods.filter((mood) => mood.mood === 'joy'))
      setFear(moods.filter((mood) => mood.mood === 'fear'))
      setSadness(moods.filter((mood) => mood.mood === 'sadness'))
      setAnger(moods.filter((mood) => mood.mood === 'anger'))
      setDisgust(moods.filter((mood) => mood.mood === 'disgust'))
    }
  }, [moods])

  console.log('lengths', joy.length, fear.length, sadness.length, anger.length, disgust.length)

  useEffect(() => {
    if (moods.length > 0) {
      setChartdata({
        labels: ['Joy', 'Fear', 'Sadness', 'Anger', 'Disgust'],
        datasets: [
          {
            data: [joy.length, fear.length, sadness.length, anger.length, disgust.length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })
    }
  }, [anger.length, disgust.length, fear.length, joy.length, moods, sadness.length])

  console.log('The chart data', chartData)


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
        <h3>This is how you have been feeling lately</h3>
        <h3>Fake data from Chart component...</h3>
        {/* {moods.map((mood, index) => (
          <div key={index} className="user-mood">
            <h4>{mood.date}</h4>
            <p>{mood.mood}</p>
          </div>
        ))} */}
        {/* {chartData.length > 0 ? <Chart data={chartData} /> : <p>You have not logged any moods yet..</p>} */}
        <Chart />
      </div>
      <div className="my-practice-image">
        <img className="img-my-practice" src={IMG("home-ocean.jpg")} alt="" />
        <button>Delete my Account</button><button>Change Pofile Picture</button>
      </div>
    </div>
  )
}

export default MyPractice