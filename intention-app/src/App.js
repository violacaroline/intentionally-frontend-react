import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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


function App () {
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

<<<<<<< HEAD
            <Route element={<ProtectedRoutes />}>
              <Route path='/practice' element={<Practice />} />
              <Route path='/practice-now' element={<PracticeNow />} />
              <Route path='/my-practice' element={<MyPractice />} />
=======
            <Route element={<ProtectedRoutes />}>            
            <Route path='/practice' element={ <Practice /> } />
            <Route path='/practice-now' element={ <PracticeNow /> } />
            <Route path='/intention' element={ <Intention /> } />
            <Route path='/my-practice' element={<MyPractice />} />
>>>>>>> c81961d129729b8f3e64c750b0c46d45aa85bbe5
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
