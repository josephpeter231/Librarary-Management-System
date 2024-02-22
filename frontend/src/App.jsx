import './App.css'

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
