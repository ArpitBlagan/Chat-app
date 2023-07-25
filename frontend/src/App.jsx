import './App.css';
import SocketContext from './SocketContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tail from './pages/Tail';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
function App() {
  return(
    <Router><SocketContext>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/tail" element={<Tail/>}/>
      </Routes></SocketContext>
    </Router>
    
  )
}
export default App
