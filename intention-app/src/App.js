import Navbar from './Navbar'
import Home from './Home'
import Register from './Register';
import Login from './Login';
import Mood from './Mood';
import Intention from './Intention';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        {/* <Home /> */}
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <Mood /> */}
        <Intention />
      </div>
    </div>
  );
}

export default App;
