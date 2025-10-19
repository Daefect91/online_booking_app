import { Route, BrowserRouter as Router, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import CreateBooking from './components/CreateBooking'


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-booking' element={<CreateBooking/>}/>
      </Routes>
    </Router>
  )
}

export default App
