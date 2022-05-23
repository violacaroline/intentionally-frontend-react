import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
import Chart from './Chart'



const MyPractice = () => {
  // const [moods, setMoods] = useState([])
  // const [joy, setJoy] = useState([])
  // const [fear, setFear] = useState([])
  // const [sadness, setSadness] = useState([])
  // const [anger, setAnger] = useState([])
  // const [disgust, setDisgust] = useState([])

  // const [chartData, setChartdata] = useState({})


  const navigate = useNavigate()
  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  // const fetchMoods = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8087/api/v1/moods', {
  //       headers: {
  //         authorization: authenticatedUser.accessToken
  //       }
  //     })

  //     if (moods.length === 0) {
  //       setMoods(response.data)
  //       console.log('Res data', response.data)
  //     }
  //     return response.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const data = fetchMoods()
  // console.log(data)



  // useEffect(() => {
  //   fetchMoods()
  //   console.log(moods)

  //   if (moods) {
  //     setJoy(moods.filter((mood) => mood.mood === 'joy'))
  //     setFear(moods.filter((mood) => mood.mood === 'fear'))
  //     setSadness(moods.filter((mood) => mood.mood === 'sadness'))
  //     setAnger(moods.filter((mood) => mood.mood === 'anger'))
  //     setDisgust(moods.filter((mood) => mood.mood === 'disgust'))

  //     console.log('Array lenghts', joy.length, fear.length, sadness.length, anger.length, disgust.length)
  //   }


  //   setChartdata({
  //     labels: ['Joy', 'Fear', 'Sadness', 'Anger', 'Disgust'],
  //     datasets: [
  //       {
  //         data: [joy.length, fear.length, sadness.length, anger.length, disgust.length]
  //       }
  //     ]
  //   })

  //   //console.log('Chart data', chartData)
  // }, [joy.length, fear.length, sadness.length, anger.length, disgust.length, moods, authenticatedUser.accessToken, fetchMoods])



  const goBack = () => {
    navigate('/practice')
  }

  return (
    <div className="my-practice">
      <button onClick={goBack}>&#10006; Go Back </button>
      <div className="my-practice-text">
        <h2>Hi {authenticatedUser.username + '! ' + String.fromCharCode("0x00002661")} </h2>
        <h3>This is how you have been feeling lately</h3>
        {/* {moods.map((mood, index) => (
          <div key={index} className="user-mood">
            <h4>{mood.date}</h4>
            <p>{mood.mood}</p>
          </div>
        ))} */}
        {/* {chartData.length > 0 ? <Chart /> : <p>You have not logged any moods yet..</p>} */}
        <Chart />
      </div>
    </div>
  )
}

export default MyPractice