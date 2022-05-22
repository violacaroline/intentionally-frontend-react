import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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



function App () {
  return (
      <div className="App">
        <ToastContainer bodyClassName="toast-body"  autoClose={2000} />
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
  )
}

export default App
