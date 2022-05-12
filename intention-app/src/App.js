import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Mood from './Mood'
import Practice from './Practice'
import PracticeNow from './PracticeNow'
import ProtectedRoutes from './ProtectedRoutes'

function App () {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/moods' element={ <Mood /> } />
            <Route path='/login' element={ <Login /> } />
            <Route element={< ProtectedRoutes />}>
            <Route path='/practice' element={ <Practice /> } />
            </Route>
            <Route path='/practice-now' element={ <PracticeNow /> } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
