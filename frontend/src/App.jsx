import './App.css'
import Login from './components/login'
import Addbooks from './components/Addbooks.jsx'
import {Routes,Route} from 'react-router-dom'
import ViewBooks from './components/Viewbooks.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ViewBooks/>}/>
      </Routes>
      
    </>
  )
}

export default App
