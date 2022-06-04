import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from './Chart'
import { toast } from 'react-toastify'



const MyPractice = () => {
  const navigate = useNavigate()
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [uploadImageMenu, setUploadImageMenu] = useState(false)
  const [file, setFile] = useState(null)
  const [base64, setBase64] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [moods, setMoods] = useState([])

  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  // Error toast messages
  const chooseFile = 'Choose a file first'
  const fileTooBig = 'The file is too big and wont be saved'
  const reAuthenticate = 'Looks like your session has expired, please login again.'
  const errorOccurred = 'An error occurred, please try again'
  const successDeleteAccount = 'Sad to see you go, your account was deleted'
  const errorDeleteAccount = 'There was an error deleting your account'

  const notify = (message) => toast(message, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  /**
   * Fetches a users previously logged moods.
   */
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
        if (error.response.status === 401) {
          localStorage.clear()
          notify(reAuthenticate)
          navigate('/')
        }
      }
    }
    fetchMoods()
  }, [authenticatedUser.accessToken, navigate])

  /**
   * Creates a data object of the moods that will be displayed in the chart.
   */
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

  const toggleDeleteMenu = () => { setDeleteMenu(!deleteMenu) }
  const toggleUploadMenu = () => { setUploadImageMenu(!uploadImageMenu) }

  const deleteData = async (url, token, id) => {
    try {
      await axios.delete(url, {
        headers: {
          authorization: token
        },
        data: {
          userid: id
        }
      })
    } catch (error) {
      notify(errorDeleteAccount)
    }
  }

  /**
   * Deletes a specific user from the database, along with all it's saved data. 
   */
  const deleteUser = async () => {
    deleteData('http://localhost:8087/api/v1/moods/delete', authenticatedUser.accessToken, authenticatedUser.userId)
    deleteData('http://localhost:8088/api/v1/images/delete', authenticatedUser.accessToken, authenticatedUser.userId)

    try {
      await axios.delete('http://localhost:8086/api/v1/delete', {
        headers: {
          authorization: authenticatedUser.accessToken
        }
      })
      localStorage.clear()
      notify(successDeleteAccount)
      navigate('/')
    } catch (error) {
      notify(errorDeleteAccount)
    }
  }

  const handleFile = (event) => {
    setFile(event.target.files[0])
  }

  /**
   * Gets the profile photo of the logged in user, if there is one.
   */
  useEffect(() => {
    // Only fetch profile photo if it's not already saved in localstorage.
    if (localStorage.getItem('image')) {
      setProfilePhoto(localStorage.getItem('image'))
    } else {
      const getImage = async () => {
        try {
          const response = await axios.get('http://localhost:8088/api/v1/images', {
            headers: {
              authorization: authenticatedUser.accessToken
            },
            data: {
              userId: authenticatedUser.userId
            }
          })

          localStorage.setItem('image', response.data.data)
          setProfilePhoto(response.data)
        } catch (error) {
          if (error.response.status === 404) {
            setProfilePhoto('noimage')
          }
        }
      }
      getImage()
    }
  }, [authenticatedUser.accessToken, authenticatedUser.userId])

  /**
   * Reads and converts image files to base64 strings to save in the database.
   */
  useEffect(() => {
    if (file) {
      const getBase64 = () => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          let base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '')
          setBase64(base64String)
          setProfilePhoto(base64String)
        }
      }
      getBase64()
    }
  }, [file, profilePhoto])

  /**
   * Uploads a new profile photo to the database.
   *
   * @param {*} event 
   */
  const handleUpload = (event) => {
    event.preventDefault()
    if (base64) {
      setProfilePhoto(base64)
      localStorage.setItem('image', base64)
      const postImage = async () => {
        try {
          await axios.post('http://localhost:8088/api/v1/images', {
            headers: {
              authorization: authenticatedUser.accessToken
            },
            data: {
              data: base64,
              userId: authenticatedUser.userId
            }
          })
        } catch (error) {
          if (error.response.status === 413) {
            notify(fileTooBig)
          } else {
            notify(errorOccurred)
          }
        }
      }
      postImage()
      setFile(null)
      setBase64('')
      setUploadImageMenu(false)
    } else {
      notify(chooseFile)
    }
  }

  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
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
        {profilePhoto.data ? <img className="img-my-practice" src={`data:image/png;base64,${profilePhoto.data}`} alt="" /> :
          profilePhoto === 'noimage' ? <img className="img-my-practice" src={IMG('avatar.png')} alt="" /> :
            <img className="img-my-practice" src={`data:image/png;base64,${profilePhoto}`} alt="" />
        }
        <button onClick={toggleUploadMenu}>Change Pofile Picture {uploadImageMenu ? <>&#9650;</> : <>&#9660;</>}</button>
        {uploadImageMenu && <form encType='multipart/formdata' className="my-practice-upload">
          <label htmlFor="file">{file ? file.name : 'Choose your photo ' + String.fromCharCode("0x00002661")}
            <input type="file" id="file" name="file" className="input-file" onChange={handleFile} />
          </label>
          <button className="save-photo-button" onClick={handleUpload}>Save photo</button>
        </form>}
        <button onClick={toggleDeleteMenu}>Delete my Account {deleteMenu ? <>&#9650;</> : <>&#9660;</>}</button>
        {deleteMenu && <div className="my-practice-yes-no">
          <p>Are you sure you want to delete your account?</p>
          <p>This also deletes your logged moods.</p>
          <div className="my-practice-yes-no-buttons">
            <button className="yes-no" onClick={deleteUser}>Yes</button><button className="yes-no" onClick={toggleDeleteMenu}>No</button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default MyPractice