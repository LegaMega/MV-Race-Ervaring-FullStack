import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepagina from './components/Homepagina'
import Boekingpagina from './components/Boekingpagina'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepagina />} />
      <Route path="/Boekingpagina" element={<Boekingpagina />} />
    </Routes>
    </>
  )
}

export default App
