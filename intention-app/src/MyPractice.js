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
  const [moods, setMoods] = useState([])

  const authenticatedUser = JSON.parse(localStorage.getItem("user"))

  const notifyReAuthenticate = () => toast('Looks like your session has expired, please login again.', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const notifyChooseFile = () => toast('Choose a file first', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const notifyFileTooBig = () => toast('The file is too big', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const notifySuccessDeleteAccount = () => toast('Sad to see you go, your account was deleted', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const notifyErrorDeleteAccount = () => toast('There was an error deleting your account', {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true
  })

  const IMG = (imgName) => {
    return require(`../public/images/${imgName}`)
  }


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
          notifyReAuthenticate()
          navigate('/')
        }
      }
    }
    fetchMoods()
  }, [authenticatedUser.accessToken, navigate])

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


  const deleteMoods = async () => {
    try {
      await axios.delete('http://localhost:8087/api/v1/moods/delete', {
        data: {
          userid: authenticatedUser.userId
        }
      })

    } catch (error) {
      notifyErrorDeleteAccount()
    }
  }

  const deleteUser = async () => {
    deleteMoods()
    try {
      await axios.delete('http://localhost:8086/api/v1/delete', {
        headers: {
          authorization: authenticatedUser.accessToken
        }
      })
      localStorage.clear()
      notifySuccessDeleteAccount()
      navigate('/')
    } catch (error) {
      notifyErrorDeleteAccount()
    }
  }

  const handleFile = (event) => {
    setFile(event.target.files[0])
  }

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
        }
      }
      getBase64()
    }
  }, [file])

  const handleUpload = (event) => {
    event.preventDefault()
    if (base64) {
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
            notifyFileTooBig()
          } else {

          }
        }
      }
      postImage()
      setFile(null)
      setBase64('')
    } else {
      notifyChooseFile()
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
        <button onClick={toggleUploadMenu}>Change Pofile Picture</button>
        {uploadImageMenu && <form encType='multipart/formdata' className="my-practice-upload">
          <label htmlFor="file">{file ? file.name : 'Click here to choose your photo ' + String.fromCharCode("0x00002661")}
            <input type="file" id="file" name="file" className="input-file" onChange={handleFile} />
          </label>
          <button className="save-photo-button" onClick={handleUpload}>Save photo</button>
        </form>}
        <button onClick={toggleDeleteMenu}>Delete my Account</button>
        {deleteMenu && <div className="my-practice-yes-no">
          <p>Are you sure you want to delete your account?</p>
          <div className="my-practice-yes-no-buttons">
            <button onClick={deleteUser}>Yes</button><button onClick={toggleDeleteMenu}>No</button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default MyPractice