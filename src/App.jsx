
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Moduls from './components/Moduls'

function App() {
  

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Moduls/:semestre' element={<Moduls/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
