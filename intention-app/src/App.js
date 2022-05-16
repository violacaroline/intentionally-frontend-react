import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useRef } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Mood from './Mood'
import Practice from './Practice'
import PracticeNow from './PracticeNow'
import MyPractice from './MyPractice'
import ProtectedRoutes from './ProtectedRoutes'
import Intention from './Intention'
import NotFound from './NotFound'
import useAuth from './hooks/useAuth'


function App () {
  const { setAuth } = useAuth()

  useRef(() => {
    const loggedInUser = localStorage.getItem("user")
    console.log('Logged in user from app', loggedInUser)
    if (loggedInUser) {
      setAuth(JSON.parse(loggedInUser))
    }
  }, [])
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/moods' element={<Mood />} />

            <Route element={<ProtectedRoutes />}>            
            <Route path='/practice' element={ <Practice /> } />
            <Route path='/practice-now' element={ <PracticeNow /> } />
            <Route path='/intention' element={ <Intention /> } />
            <Route path='/my-practice' element={<MyPractice />} />
            </Route>

            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
