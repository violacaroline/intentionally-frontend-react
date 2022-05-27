import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Intention from './Intention'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

const PracticeNow = () => {
  const authenticatedUser = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [intention, setIntention] = useState('')
  const [success, setSuccess] = useState(false)

  const notifyReAuthenticate = () => toast('Looks like your session has expired, please login again.', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const notifyError = () => toast('Sorry, there was an error fetching your intention.', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const fetchIntention = async (mood) => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/intentions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: authenticatedUser.accessToken
        }
      })

      await axios.post('http://localhost:8087/api/v1/moods', {
        headers: {
          authorization: authenticatedUser.accessToken
        },
        mood: mood,
        date: format(new Date(), 'eeee, yyyy-MM-dd').toString(),
        userId: authenticatedUser.userId
      })

      const intentions = Array.from(response.data)

      const moodIntentions = intentions.filter(intention => intention.mood === mood)

      const intention = moodIntentions[Math.floor(Math.random() * moodIntentions.length)]
      setIntention(intention)
      setSuccess(true)
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        notifyReAuthenticate()
        navigate('/')
      } else {
        notifyError()
      }
    }
  }

  return (
    <div className="practice-now">
      {success ?
        <Intention intention={intention} />
        :
        <>
          <div className="practice-now-img"></div>
          <div className="practice-now-text">
            <h2>{'Tell me, how are you feeling?'}</h2>
            <button onClick={() => { fetchIntention('joy') }} className="feeling">Joy</button>
            <button onClick={() => { fetchIntention('fear') }} className="feeling">Fear</button>
            <button onClick={() => { fetchIntention('anger') }} className="feeling">Anger</button>
            <button onClick={() => { fetchIntention('sadness') }} className="feeling">Sadness</button>
            <button onClick={() => { fetchIntention('disgust') }} className="feeling">Disgust</button>
          </div>
        </>
      }
    </div>
  )
}

export default PracticeNow